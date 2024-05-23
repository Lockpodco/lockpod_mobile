import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import images from "../../components/images";
import { Constants } from "../../components/constants";

// services
import {
  getReservation,
  extendReservation,
} from "../../services/ReservationService";

// context
import {
  UpdateUserProfileActionType,
  useUserProfileContext,
} from "../../stores/UserProfileContext";
import {
  UpdateLockPodsActionType,
  useLockPodsContext,
} from "../../stores/LockPodsContext";
import { LockpodReservation } from "../../Models/ReservationModel";
import { LockPod } from "../../Models/LockPodModel";
import { LockpodSession } from "../../Models/SessionModel";
import { getSession } from "../../services/SessionServices";

// MARK: ReservationsScreen
const ReservationsScreen = () => {
  const { userProfile, profileDispatch } = useUserProfileContext();
  const { lockPods, lockPodsDispatch } = useLockPodsContext();

  const [activeReservations, setActiveReservations] = useState<
    LockpodReservation[]
  >([]);
  const [activeSessions, setActiveSessions] = useState<LockpodSession[]>([]);

  // MARK: init
  useEffect(() => {
    const fetchReservations = async () => {
      for (let i = 0; i < userProfile.activeReservations.length; i++) {
        const reservationId = userProfile.activeReservations[i];
        const reservation: LockpodReservation | null =
          await getReservation(reservationId);

        if (reservation) {
          setActiveReservations((oldArr) => [...oldArr, reservation]);
        }
      }
    };

    const fetchSessions = async () => {
      for (let i = 0; i < userProfile.activeSessions.length; i++) {
        const sessionId = userProfile.activeSessions[i];
        const session: LockpodSession | undefined = await getSession(sessionId);

        if (session) {
          setActiveSessions((oldState) => [...oldState, session]);
        }
      }
    };

    if (activeReservations.length == 0) {
      fetchReservations();
    }
    if (activeSessions.length == 0) {
      fetchSessions();
    }
  }, [userProfile]);

  //   MARK: handleCancel
  async function handleCancel(reservation: LockpodReservation) {
    await reservation.cancelReservation(userProfile, "cancel");

    // refresh the app state
    const filter = lockPods.filter((lockpod) => {
      return lockpod.id == reservation.lockpod_id;
    });

    const updatedLockpod = filter[0];
    updatedLockpod.isReserved = false;

    lockPodsDispatch!({
      type: UpdateLockPodsActionType.updateLockPod,
      updatedLockPods: undefined,
      updatedLockPod: updatedLockpod,
    });
  }

  // MARK: handleEndSession
  async function handleEndSession(session: LockpodSession) {
    await session.end(userProfile);

    // refresh the app state
    const filter = lockPods.filter((lockpod) => {
      return lockpod.id == session.lockpod_id;
    });

    const updatedLockpod = filter[0];
    updatedLockpod.isReserved = false;
    updatedLockpod.inSession = false;

    lockPodsDispatch!({
      type: UpdateLockPodsActionType.updateLockPod,
      updatedLockPods: undefined,
      updatedLockPod: updatedLockpod,
    });
  }

  // MARK: handleExtend
  async function handleExtendReservation(reservation: LockpodReservation) {
    reservation.hasBeenExtended = true;
    await extendReservation(reservation.id, reservation.expected_arrival, 30);
  }

  // MARK: ViewBuilders
  const HorizontalLabel = ({ label, msg }: { label: string; msg: string }) => {
    const localStyles = StyleSheet.create({
      hoirzontalLabelHorizontalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
      },
    });

    return (
      <View style={localStyles.hoirzontalLabelHorizontalContainer}>
        <Text>{label}</Text>
        <Text>{msg}</Text>
      </View>
    );
  };

  // MARK: ReservationView
  const ReservationView = ({
    reservation,
  }: {
    reservation: LockpodReservation;
  }) => {
    const [lockpod, setLockpod] = useState<LockPod | null>(null);
    const description =
      "You have an upcoming \nreservation. If you need \nmore time, you can exten \nthe reservation.";
    const icon = images.lockpodPreviews.unavailable;

    const startTime = LockpodReservation.formatTime(reservation.start_time);
    const endTime = LockpodReservation.formatTime(reservation.expected_arrival);
    const timeRemaining = reservation.getTimeRemainingMessage();

    useEffect(() => {
      for (let pod of lockPods) {
        if (pod.id == reservation.lockpod_id) {
          setLockpod(pod);
        }
      }
    }, []);

    const localStyles = StyleSheet.create({
      reservationContainer: {
        flex: 1,
        padding: 10,
        margin: 7,
        backgroundColor: Constants.secondaryLight,
        borderRadius: Constants.defaultCornerRadius,
      },

      horizontalContainer: {
        flexDirection: "row",
      },

      titleContainer: {
        margin: 20,
      },

      reservationTitle: {
        flex: 1,
      },

      picture: {
        width: 130,
        height: 130,
        margin: 10,
      },

      cancelButton: {
        width: "96%",
        height: 50,
        margin: 2,

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Constants.secondaryDark,
        borderRadius: Constants.defaultCornerRadius,
      },

      cancelButtonText: {
        color: Constants.baseLight,
        fontSize: 18,
      },
    });

    return (
      <View style={localStyles.reservationContainer}>
        {lockpod && (
          <View>
            <View style={localStyles.horizontalContainer}>
              <Image source={icon} style={localStyles.picture} />
              <View style={localStyles.titleContainer}>
                <Text style={styles.titleText}>{`${lockpod.name}`}</Text>
                <Text style={styles.smallText}>{description}</Text>
              </View>
            </View>

            <HorizontalLabel label={"created"} msg={startTime} />
            <HorizontalLabel label={"expected arrival"} msg={endTime} />
            <HorizontalLabel label={"Time remaining"} msg={timeRemaining} />

            {!reservation.hasBeenExtended && (
              <Pressable
                onPress={() => handleExtendReservation(reservation)}
                style={localStyles.cancelButton}
              >
                <Text style={localStyles.cancelButtonText}>
                  Extend Reservation
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={() => handleCancel(reservation)}
              style={localStyles.cancelButton}
            >
              <Text style={localStyles.cancelButtonText}>
                Cancel Reservation
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  // MARK: SessionView
  const SessionView = ({ session }: { session: LockpodSession }) => {
    const [lockpod, setLockpod] = useState<LockPod | null>(null);
    const icon = images.lockpodPreviews.available;
    const feeMessage =
      "The fee for opening a pod per \nsession is $0.50, with a daily\n maximum fee of $4 per pod.";

    const startTime = LockpodSession.formatArrivalTime(session.start_time);
    const timeElapsed = session.getElapsedTimeMessage();

    useEffect(() => {
      for (let pod of lockPods) {
        if (pod.id == session.lockpod_id) {
          setLockpod(pod);
        }
      }
    }, []);

    const localStyles = StyleSheet.create({
      container: {
        flex: 1,
        width: "100%",
        backgroundColor: Constants.secondaryLight,
        padding: 5,
        borderRadius: Constants.defaultCornerRadius,
      },

      hoirzontalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },

      titleContainer: {
        margin: 20,
      },

      picture: {
        width: 130,
        height: 130,
        margin: 10,
      },

      cancelButton: {
        width: "96%",
        height: 50,
        margin: 7,
        marginTop: 10,

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Constants.secondaryDark,
        borderRadius: Constants.defaultCornerRadius,
      },

      cancelButtonText: {
        color: Constants.baseLight,
        fontSize: 18,
      },
    });

    return (
      <View style={localStyles.container}>
        <View style={localStyles.hoirzontalContainer}>
          <Image source={icon} style={localStyles.picture} />
          <View style={localStyles.titleContainer}>
            <Text style={styles.titleText}>{lockpod?.name}</Text>
            <Text style={styles.smallText}>{feeMessage}</Text>
          </View>
        </View>

        <Text> {} </Text>
        <HorizontalLabel label={"Started"} msg={startTime}></HorizontalLabel>
        <HorizontalLabel
          label={"Time Elapsed"}
          msg={timeElapsed}
        ></HorizontalLabel>

        <Pressable
          onPress={() => handleEndSession(session)}
          style={localStyles.cancelButton}
        >
          <Text style={localStyles.cancelButtonText}>End Session</Text>
        </Pressable>
      </View>
    );
  };

  //   MARK: Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 7,
    },

    sectionHeaders: {
      fontSize: 22,
      fontWeight: "bold",
    },

    titleText: {
      fontWeight: "bold",
      fontSize: 22,
      marginVertical: 7,
    },

    smallText: {
      fontSize: 12,
    },
  });

  // MARK: Body
  return (
    <View style={styles.container}>
      <ScrollView>
        {activeReservations.length > 0 && (
          <View>
            <Text style={styles.sectionHeaders}>Reservations</Text>
            {activeReservations.map((reservation) => (
              <ReservationView
                key={reservation.id}
                reservation={reservation}
              ></ReservationView>
            ))}
          </View>
        )}

        {activeSessions.length > 0 && (
          <View>
            <Text style={styles.sectionHeaders}>Sessions</Text>
            {activeSessions.map((session) => (
              <SessionView key={session.id} session={session}></SessionView>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ReservationsScreen;
