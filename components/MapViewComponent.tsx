import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import ReserveModal from "./ReserveModal.js";

// services
import { reserveLockpod, endReservation } from "../services/ReservationService";
import { fetchLockpods, updateLockPodStatus } from "../services/LockpodService";

// models
import {
  useLockPodsContext,
  UpdateLockPodsActionType,
} from "../stores/LockPodsContext";

import { LockPod } from "../Models/LockPodModel";

const UCSD_REGION = {
  latitude: 32.8801,
  //longitude: -117.234,
  longitude: -117.227, // focused display of ucsd campus
  latitudeDelta: 0.03, // great zoom level
  longitudeDelta: 0.03,
};

const MapViewComponent = ({ initialRegion = UCSD_REGION }) => {
  const { lockPods, lockPodsDispatch } = useLockPodsContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLockpod, setSelectedLockpod] = useState<LockPod | null>(null);

  useEffect(() => {
    async function fetch() {
      const pods = await fetchLockpods();
      lockPodsDispatch!({
        type: UpdateLockPodsActionType.setLockPods,
        updatedLockPods: pods,
        updatedLockPod: undefined,
      });
    }
    fetch();
  }, []);

  const handleCalloutPressed = (lockpod: LockPod) => {
    setSelectedLockpod(lockpod);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedLockpod(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView initialRegion={initialRegion} style={{ flex: 1 }}>
        {lockPods.map((lockpod) => (
          <Marker
            key={lockpod.id}
            coordinate={{
              latitude: lockpod.latitude,
              longitude: lockpod.longitude,
            }}
            title={lockpod.name}
            description={"" + lockpod.id}
            onPress={() => handleCalloutPressed(lockpod)}
          />
        ))}
      </MapView>
      <ReserveModal
        visible={modalVisible}
        lockpods={lockPods}
        lockpod={selectedLockpod}
        onModalClose={handleModalClose}
      />
    </View>
  );
};

export default MapViewComponent;
