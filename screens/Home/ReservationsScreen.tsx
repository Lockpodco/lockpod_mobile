import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Constants } from "../../components/constants";

// services
import {
  getReservation,
  extendReservation,
} from "../../services/ReservationService";

// context
import { useUserProfileContext } from "../../stores/UserProfileContext";
import { useLockPodsContext } from "../../stores/LockPodsContext";
import { LockpodReservation } from "../../Models/ReservationModel";
import { LockPod } from "../../Models/LockPodModel";

// MARK: ReservationsScreen
const ReservationsScreen = () => {
  const { userProfile, profileDispatch } = useUserProfileContext();
  const { lockPods, lockPodsDispatch } = useLockPodsContext();

  const [activeReservations, setActiveReservations] = useState<
    LockpodReservation[]
  >([]);

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

    if (activeReservations.length == 0) {
      fetchReservations();
    }
  }, []);

  //   MARK: Methods

  // MARK: Components
  const ReservationView = ({
    reservation,
  }: {
    reservation: LockpodReservation;
  }) => {
    const [lockpod, setLockpod] = useState<LockPod | null>(null);

    useEffect(() => {
      for (let pod of lockPods) {
        if (pod.id == reservation.lockpod_id) {
          setLockpod(pod);
        }
      }
    });

    const styles = StyleSheet.create({
      reservationContainer: {
        flex: 0.35,
        flexDirection: "row",
        padding: 7,
        margin: 7,
        backgroundColor: Constants.secondaryLight,
        borderRadius: Constants.defaultCornerRadius,
      },

      reservationTitle: {
        flex: 1,
      },
    });

    return (
      <View style={styles.reservationContainer}>
        {lockpod && (
          <View>
            <Text
              style={styles.reservationTitle}
            >{`You have an upcoming reservation for ${lockpod.name}`}</Text>

            <Text
              style={styles.reservationTitle}
            >{`There are ${reservation.getTimeRemaining()} minutes left in your reservation`}</Text>

            <Text>{`Start time: ${reservation.formatStartTime()}`}</Text>
            <Text>{`Expected Arrival: ${reservation.formatArrivalTime()}`}</Text>

            <Button
              onPress={() => {
                reservation.cancelReservation(userProfile, "cancel");
              }}
              title={"Cancel Reservation"}
            />

            <Button
              onPress={() => {
                extendReservation(
                  reservation.id,
                  reservation.expected_arrival,
                  30
                );
              }}
              title={"Extend Reservation"}
            />
          </View>
        )}
      </View>
    );
  };

  //   MARK: Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  // MARK: Body
  return (
    <View style={styles.container}>
      {activeReservations.length > 0 &&
        activeReservations.map((reservation) => (
          <ReservationView
            key={reservation.id}
            reservation={reservation}
          ></ReservationView>
        ))}
    </View>
  );
};

export default ReservationsScreen;
