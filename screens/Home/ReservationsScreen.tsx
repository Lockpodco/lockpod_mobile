import React, { useEffect, useState } from "react";
import { Text } from "react-native";

// services
import { getReservation } from "../../services/ReservationService";

// context
import { useUserProfileContext } from "../../stores/UserProfileContext";
import { LockpodReservation } from "../../Models/ReservationModel";

// MARK: ReservationsScreen
const ReservationsScreen = () => {
  const { userProfile, profileDispatch } = useUserProfileContext();

  const [activeReservations, setActiveReservations] = useState<
    LockpodReservation[]
  >([]);

  useEffect(() => {
    for (let i = 0; i < userProfile.activeReservations.length; i++) {
      const reservationId = userProfile.activeReservations[i];
      const _ = getReservation(reservationId).then((activeReservation) => {
        console.log(activeReservation?.lockpod_id);
      });
    }
  }, []);

  // MARK: Body
  return <Text>{userProfile.first_name}</Text>;
};

export default ReservationsScreen;
