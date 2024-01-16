import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { fetchLockpods } from "../services/LockpodService";

const UCSD_REGION = {
  latitude: 32.8801,
  //longitude: -117.234,
  longitude: -117.227, // focused display of ucsd campus
  latitudeDelta: 0.03, // great zoom level
  longitudeDelta: 0.03,
};

const MapViewComponent = ({ initialRegion = UCSD_REGION }) => {
  const [lockpods, setLockpods] = useState([]);

  useEffect(() => {
    fetchLockpods().then((data) => setLockpods(data));
  }, []);

  return (
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
        />
      ))}
    </MapView>
  );
};

export default MapViewComponent;
