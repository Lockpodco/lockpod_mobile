import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Image,
  Alert,
  Button,
} from "react-native";
import { CheckoutScreen } from "../Payment/PaymentScreen";
import { Constants } from "../../components/constants";
import images from "../../components/images";

// Services
import { updateLockPodStatus } from "../../services/LockpodService";
import {
  createReservation,
  getReservation,
} from "../../services/ReservationService";

// Context & Models
import { UserProfile } from "../../Models/UserProfileModel";
import { LockPod } from "../../Models/LockPodModel";
import { LockpodReservation } from "../../Models/ReservationModel";
import { useUserProfileContext } from "../../stores/UserProfileContext";
import {
  UpdateLockPodsActionType,
  useLockPodsContext,
} from "../../stores/LockPodsContext";
import { createSession, getSession } from "../../services/SessionServices";
import { LockpodSession } from "../../Models/SessionModel";

// MARK: Modal
const ReserveModal = ({
  lockpods,
  lockpod,
  visible,
  onModalClose,
  navigation,
}: {
  lockpods: LockPod[];
  lockpod: LockPod;
  visible: boolean;
  onModalClose: any;
  navigation: any;
}) => {
  // MARK: Vars
  const { userProfile, profileDispatch } = useUserProfileContext();
  const { lockPods, lockPodsDispatch } = useLockPodsContext();

  const [isReserving, setIsReserving] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const [clickable, setClickable] = useState(true);
  const [reservedByUser, setReservedByUser] = useState(false);
  const [reserveButtonText, setReserveButtonText] = useState("Reserve");
  const userId = userProfile["user_id"];

  // const [pictureSelected, setPictureSelected] = useState(false);

  const [activeReservations, setActiveReservations] = useState<
    LockpodReservation[]
  >([]);
  const [activeSessions, setActiveSessions] = useState<LockpodSession[]>([]);
  const [selectedLockpod, setSelectedLockpod] = useState<LockPod | null>(
    lockpod
  );
  const [selectedLockpodIndex, setSelectedLockpodIndex] = useState<
    number | null
  >(null);

  // MARK: Init
  useEffect(() => {
    // Gets all the active reservations associated with the current user and stores them
    // in activeReservations
    const fetchUserReservations = async () => {
      setActiveReservations([]);

      for (let i = 0; i < userProfile.activeReservations.length; i++) {
        const reservationId = userProfile.activeReservations[i];
        const reservation: LockpodReservation | null =
          await getReservation(reservationId);

        if (reservation) {
          setActiveReservations((oldArray) => [...oldArray, reservation]);
        }
      }
    };

    const fetchUserSessions = async () => {
      setActiveSessions([]);
      for (let i = 0; i < userProfile.activeSessions.length; i++) {
        const sessionId = userProfile.activeSessions[i];
        const session: LockpodSession | undefined = await getSession(sessionId);

        if (session) {
          setActiveSessions((oldArray) => [...oldArray, session]);
        }
      }
    };

    fetchUserSessions();
    fetchUserReservations();
  }, []);

  useEffect(() => {
    if (!visible) {
      setSelectedLockpod(null);
      setSelectedLockpodIndex(null);
      setIsReserving(false);
      setIsUnlocking(false);
    }
  }, [visible]);

  // MARK: Convenience Functions
  function getModalHeight(): number {
    if (isReserving) {
      return 0.85;
    }
    if (selectedLockpod) {
      return 0.45;
    }
    return 0.3;
  }

  function showLockpodUnavailableAlert() {
    Alert.alert(
      "Lockpod unavailable",
      "Select another lockpod to reserve or unlock"
    );
  }

  function checkLockPodHasAvailability(): boolean {
    if (selectedLockpod) {
      return !selectedLockpod.inSession && !selectedLockpod.isReserved;
    }
    return false;
  }

  // MARK: handleUnlock
  function checkUserHasSession(lockpodId: number): boolean {
    const filtered = activeSessions.filter((session) => {
      return session.lockpod_id == lockpodId;
    });
    return filtered.length != 0;
  }

  const handleUnlock = async () => {
    const inSessionByUser = checkUserHasSession(selectedLockpod!.id);
    const availability = checkLockPodHasAvailability();

    if (!inSessionByUser && !availability) {
      showLockpodUnavailableAlert;
      return;
    }

    const sessionId: number | undefined = await createSession(
      userProfile.user_id,
      selectedLockpod!.id
    );

    if (sessionId) {
      // update the userProfile object
      userProfile.activeSessions.push(sessionId);
      await userProfile.saveChangesToDataBase();

      // update the status of the lockpod
      selectedLockpod!.isReserved = false;
      selectedLockpod!.inSession = true;
      updateLockPodStatus(selectedLockpod!.id, false, true);
      // trigger a UI update
      lockPodsDispatch!({
        type: UpdateLockPodsActionType.updateLockPod,
        updatedLockPods: undefined,
        updatedLockPod: selectedLockpod!,
      });
    }

    onModalClose();
  };

  // MARK: handleReserve
  function checkUserHasReservation(lockpodId: number): boolean {
    const filtered = activeReservations.filter((reservation) => {
      return reservation.lockpod_id == lockpodId;
    });
    return filtered.length != 0;
  }

  const handleReserve = async (duration: number) => {
    const reservedByUser = checkUserHasReservation(selectedLockpod!.id);
    if (reservedByUser) {
      Alert.alert(
        "Already Reserved",
        "you already have an active reservation for this pod!"
      );
      return;
    }
    const available = checkLockPodHasAvailability();
    if (!available) {
      showLockpodUnavailableAlert();
      return;
    }
    // create the reservation (15 minutes by default)
    const reservationId: number | undefined = await createReservation(
      userProfile.user_id,
      selectedLockpod!.id,
      duration
    );

    if (reservationId) {
      // update the userProfile object
      userProfile.activeReservations.push(reservationId);
      await userProfile.saveChangesToDataBase();

      // update the status of the lockpod
      selectedLockpod!.isReserved = true;
      selectedLockpod!.inSession = false;
      updateLockPodStatus(selectedLockpod!.id, true, false);
      // trigger a UI update
      lockPodsDispatch!({
        type: UpdateLockPodsActionType.updateLockPod,
        updatedLockPods: undefined,
        updatedLockPod: selectedLockpod!,
      });
    }

    onModalClose();
  };

  const handleDirections = () => {
    if (selectedLockpod) {
      const destination = `${selectedLockpod.latitude},${selectedLockpod.longitude}`;
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${destination}`
      );
    }
  };

  // MARK: LockPodPreviews
  const LockPodPreview = ({
    lockpod,
    index,
  }: {
    lockpod: LockPod;
    index: number;
  }) => {
    function selectLockpod() {
      setSelectedLockpod(lockpod);
      setSelectedLockpodIndex(index);
    }

    const localStyles = StyleSheet.create({
      container: {
        flex: 1,
        alignContent: "space-evenly",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor:
          index == selectedLockpodIndex ? Constants.secondaryLight : "clear",
        borderRadius: Constants.defaultCornerRadius,
        padding: 7,
        margin: 5,
      },
    });

    const icon =
      lockpod.isReserved || lockpod.inSession
        ? images.lockpodPreviews.unavailable
        : images.lockpodPreviews.available;

    return (
      <Pressable style={localStyles.container} onPress={() => selectLockpod()}>
        <Image source={icon} style={styles.picture} />
        <Text>{lockpod.name}</Text>
      </Pressable>
    );
  };

  const LockPodPreviews = () => {
    return lockpods.map((lockpod, index) => (
      <LockPodPreview key={index} lockpod={lockpod} index={index} />
    ));
  };

  // MARK: ReservationPreview
  const SelectionPreview = ({ lockpod }: { lockpod: LockPod }) => {
    function getMessage(): string {
      if (checkUserHasReservation(lockpod.id)) {
        return "You already have an active reservation for this pod";
      } else if (checkUserHasSession(lockpod.id)) {
        return "You are in an active session with this pod";
      } else if (lockpod.inSession || lockpod.isReserved) {
        return "this lockPod is in use";
      }
      return "";
    }

    function showReservationButton() {
      return !lockpod.inSession && !lockpod.isReserved;
    }

    function showUnlockButton() {
      const hasReservation = checkUserHasReservation(lockpod.id);
      return !lockpod.inSession && (!lockpod.isReserved || hasReservation);
    }

    const localStyles = StyleSheet.create({
      directionContainer: {
        width: "100%",
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 20,
        paddingEnd: 7,
      },
      warningText: {
        color: "red",
        fontSize: 15,
        marginBottom: 10,
      },
      horizontalContainer: {
        flexDirection: "row",
      },
      primaryButton: {
        flex: 1,
        backgroundColor: Constants.secondaryLight,
        borderRadius: Constants.defaultCornerRadius,
        color: Constants.baseDark,
        margin: 5,
      },
    });

    return (
      <View style={localStyles.directionContainer}>
        {getMessage() !== "" && (
          <Text style={localStyles.warningText}>{getMessage()}</Text>
        )}
        <View style={localStyles.horizontalContainer}>
          {showReservationButton() && (
            <View style={localStyles.primaryButton}>
              <Button
                title={"reserve"}
                onPress={() => {
                  setIsReserving(true);
                }}
              />
            </View>
          )}
          {showUnlockButton() && (
            <View style={localStyles.primaryButton}>
              <Button
                title={"unlock"}
                onPress={() => {
                  handleUnlock();
                }}
              />
            </View>
          )}
        </View>
        {/* <CheckoutScreen /> */}
        {isReserving && <ReservationOptions></ReservationOptions>}
      </View>
    );
  };

  // MARK: ReservationOptions
  const ReservationOptions = () => {
    const localStyles = StyleSheet.create({
      container: {
        flex: 1,
        marginVertical: 7,
        alignSelf: "stretch",
      },

      title: {
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 10,
      },

      mainText: {
        marginHorizontal: 10,
        marginTop: 10,
      },

      durationButton: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: Constants.secondaryDark,
        borderRadius: Constants.defaultCornerRadius,
        marginVertical: 2,
      },
      durationButtonText: {
        color: Constants.baseLight,
        fontSize: 15,
      },
    });

    const [duration, setDuration] = useState(30);

    function getReservationConfirmationMessage(): string {
      return `You'll arrive at ${selectedLockpod!.name} in ${duration} minutes. \n\nIf you need more time you can extend your reservation.
      `;
    }

    const DurationButton = ({ duration }: { duration: number }) => {
      function getTitle(): string {
        return `${duration} minutes`;
      }

      return (
        <Pressable
          onPress={() => {
            setDuration(duration);
          }}
          style={localStyles.durationButton}
        >
          <Text style={localStyles.durationButtonText}>{getTitle()}</Text>
        </Pressable>
      );
    };

    return (
      <View style={localStyles.container}>
        <Text
          style={localStyles.title}
        >{`Reserve ${selectedLockpod!.name}`}</Text>

        <DurationButton duration={15} />
        <DurationButton duration={30} />
        <DurationButton duration={45} />

        <Text style={localStyles.mainText}>
          {getReservationConfirmationMessage()}
        </Text>

        <Pressable
          onPress={() => handleReserve(duration)}
          style={localStyles.durationButton}
        >
          <Text style={(localStyles.title, { color: Constants.baseLight })}>
            Reserve Lockpod
          </Text>
        </Pressable>
      </View>
    );
  };

  // MARK: Styles
  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalContainer: {
      flex: getModalHeight(),
      width: "100%",
      flexDirection: "column",
      paddingLeft: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: Constants.defaultCornerRadius,
      backgroundColor: Constants.baseLight,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      paddingLeft: 10,
    },
    scrollContainer: {
      height: 175,
    },
    reservationPreviewContainer: {
      flex: 0.55,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    button: {
      textAlign: "center",
      backgroundColor: "grey",
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginBottom: 10,
    },
    nonClickableButton: {
      backgroundColor: "#ccc",
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
    },

    picture: {
      width: 100,
      height: 100,
      marginHorizontal: 10,
      borderRadius: 10,
    },
  });

  // MARK: Body
  // TODO: rework conditional button styling based on the current lockPod Status
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onModalClose}
    >
      <Pressable onPress={onModalClose} style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Reserve & Unlock Lockpod</Text>

          <View style={styles.scrollContainer}>
            <ScrollView horizontal={true}>{LockPodPreviews()}</ScrollView>
          </View>

          <View style={styles.reservationPreviewContainer}>
            {selectedLockpod && <SelectionPreview lockpod={selectedLockpod} />}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ReserveModal;
