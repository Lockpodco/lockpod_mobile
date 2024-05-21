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

  const [clickable, setClickable] = useState(true);
  const [reservedByUser, setReservedByUser] = useState(false);
  const [reserveButtonText, setReserveButtonText] = useState("Reserve");
  const userId = userProfile["user_id"];

  // const [pictureSelected, setPictureSelected] = useState(false);

  const [activeReservations, setActiveReservations] = useState<
    LockpodReservation[]
  >([]);
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

    fetchUserReservations();
  }, []);

  useEffect(() => {
    if (!visible) {
      setSelectedLockpod(null);
      setSelectedLockpodIndex(null);
    }
  }, [visible]);

  // MARK: Convenience Functions
  function checkUserHasReservation(lockpodId: number): boolean {
    const filtered = activeReservations.filter((reservation) => {
      return reservation.lockpod_id == lockpodId;
    });
    return filtered.length != 0;
  }

  function checkUserHasSession(lockpodId: number): Boolean {
    return false;
  }

  // MARK: handleReserve
  const handleReserve = async () => {
    const reservedByUser = checkUserHasReservation(selectedLockpod!.id);
    if (reservedByUser) {
      Alert.alert(
        "Already Reserved",
        "you already have an active reservation for this pod!"
      );
      return;
    }
    // create the reservation (15 minutes by default)
    const reservationId: number | undefined = await createReservation(
      userProfile.user_id,
      selectedLockpod!.id,
      15
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

  const handlePictureUnSelect = () => {
    // setPictureSelected(false);
    // setSelectedPictureIndex(null);
    setSelectedLockpod(null);
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
  const ReservationPreview = ({ lockpod }: { lockpod: LockPod }) => {
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

    const localStyles = StyleSheet.create({
      directionContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 20,
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
        <View>
          <Text style={localStyles.warningText}>{getMessage()}</Text>
        </View>
        {/* <Pressable style={[styles.button]} onPress={handleDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </Pressable> */}
        <View style={localStyles.horizontalContainer}>
          <View style={localStyles.primaryButton}>
            <Button
              title={"reserve"}
              onPress={() => {
                handleReserve();
              }}
            />
          </View>
          <View style={localStyles.primaryButton}>
            <Button
              title={"unlock"}
              onPress={() => {
                handleReserve();
              }}
            />
          </View>
        </View>
        <CheckoutScreen />
      </View>
    );
  };

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
            {selectedLockpod && (
              <ReservationPreview lockpod={selectedLockpod} />
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
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
    flex: 0.55,
    width: "100%",
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: Constants.defaultCornerRadius,
    backgroundColor: Constants.baseLight,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft: 10,
  },
  scrollContainer: {
    flex: 0.45,
  },
  reservationPreviewContainer: {
    flex: 0.55,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
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

export default ReserveModal;
