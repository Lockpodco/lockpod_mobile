import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { fetchLockpods } from "../services/LockpodService";
import ReserveModal from "./ReserveModal.js";
import { useIsFocused } from "@react-navigation/native";

// default zoom on UCSD
const UCSD_REGION = {
  latitude: 32.8801,
  longitude: -117.227, // focused display of ucsd campus
  latitudeDelta: 0.03, // great zoom level
  longitudeDelta: 0.03,
};

const MapViewComponent = ({ initialRegion = UCSD_REGION }) => {
  // MARK: VARS
  // create a state variable to store the list of active lockpods
  const isFocused = useIsFocused();
  const [lockpods, setLockpods] = useState([]);
  const [selectedLockpod, setSelectedLockpod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchLockpods().then((data) => setLockpods(data));
  }, []);

  const handleCalloutPressed = (lockpod) => {
    setSelectedLockpod(lockpod);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedLockpod(null);
  };

  // MARK: BODY
  return (
    <View style={{ flex: 1 }}>
      <MapView initialRegion={initialRegion} style={{ flex: 1 }}>
        {lockpods.map((lockpod) => (
          <Marker
            key={lockpod.id}
            coordinate={{
              latitude: lockpod.latitude,
              longitude: lockpod.longitude,
            }}
            title={`Lockpod ${lockpod.id}`}
            description={lockpod.status}
            onPress={() => handleCalloutPressed(lockpod)}
          />
        ))}
      </MapView>
      <ReserveModal
        visible={modalVisible}
        lockpod={selectedLockpod}
        onModalClose={handleModalClose}
      />
    </View>
  );
};

export default MapViewComponent;
