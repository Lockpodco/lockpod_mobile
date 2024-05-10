import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { reserveLockpod, endReservation } from "../services/ReservationService";

import { fetchLockpods, updateLockPodStatus } from "../services/LockpodService";

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

  const handleCalloutpressed = async (lockPod: LockPod) => {
    await updateLockPodStatus(lockPod.id, true, false);

    // // chagning the status of the pod since its now reserved/unreserved
    // if (lockpod.status == "available") {
    //   lockpod.status = "unavailable";
    // } else {
    //   lockpod.status = "available";
    // }
    // const fakeUser = {
    //   userId: 2,
    //   lockpodId: lockpod.id,
    //   status: lockpod.status,
    // };
    // //this is reversed cause we changed status at the top
    // if (lockpod.status == "available") {
    //   endReservation(fakeUser);
    // } else {
    //   reserveLockpod(fakeUser);
    // }
    // //setting the lockpods again after changeing the status to rerender map
    // setLockpods([...lockpods]);
  };

  return (
    <MapView initialRegion={initialRegion} style={{ flex: 1 }}>
      {lockPods.map((lockpod) => (
        <Marker
          key={lockpod.id}
          coordinate={{
            latitude: lockpod.latitude,
            longitude: lockpod.longitude,
          }}
          title={`Lockpod ${lockpod.id}`}
          description={lockpod.name}
          onCalloutPress={() => handleCalloutpressed(lockpod)}
        ></Marker>
      ))}
    </MapView>
  );
};

export default MapViewComponent;
