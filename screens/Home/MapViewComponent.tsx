import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text } from "react-native";
import ReserveModal from "../../components/ReserveModal";

// models
import { useLockPodsContext } from "../../stores/LockPodsContext";

import { LockPod } from "../../Models/LockPodModel";

const UCSD_REGION = {
  latitude: 32.8801,
  longitude: -117.237, // focused display of ucsd campus
  latitudeDelta: 0.02, // great zoom level
  longitudeDelta: 0.02,
};

const MapViewComponent = ({ navigation }: { navigation: any }) => {
  const initialRegion = UCSD_REGION;

  const { lockPods, lockPodsDispatch } = useLockPodsContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLockpod, setSelectedLockpod] = useState<LockPod | null>(null);

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
            onPress={() => handleCalloutPressed(lockpod)}
          />
        ))}
      </MapView>
      <ReserveModal
        visible={modalVisible}
        lockpods={lockPods}
        lockpod={selectedLockpod!}
        onModalClose={handleModalClose}
        navigation={navigation}
      />
    </View>
  );
};

export default MapViewComponent;
