import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { fetchLockpods } from "../services/LockpodService";
import { reserveLockpod, endReservation } from "../services/ReservationService";
import { Text } from "react-native";

// default zoom on UCSD
const UCSD_REGION = {
  latitude: 32.8801,
  longitude: -117.227,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

const MapViewComponent = ({ initialRegion = UCSD_REGION }) => {
  // MARK: VARS
  // create a state variable to store the list of active lockpods
  const [lockpods, setLockpods] = useState([]);

  // pull the lockpods from the 'fetchLockpods()' function, then, once the data is loaded save it to the state variable,
  // this should probably have a limitted number of lockpods it pulls, in a radius around the peson
  // ie. this needs a person's current location
  useEffect(() => {
    fetchLockpods().then((data) => setLockpods(data));
  }, []);

  // this is run when a lockpod is pressed, basically checking if it is available or unavaible
  // being used to test the end / reserveLockPod functions
  function handleCalloutpressed(lockpod) {
    if (lockpod.status == "available") {
      lockpod.status = "unavailable";
    } else {
      lockpod.status = "available";
    }

    console.log("running");

    fakeUser = {
      userId: 2,
      lockpodId: lockpod.id,
      status: lockpod.status,
    };

    if (lockpod.status == "available") {
      endReservation(fakeUser);
    } else {
      reserveLockpod(fakeUser);
    }
    //setting the lockpods again after changeing the status to rerender map
    setLockpods([...lockpods]);
  }

  // MARK: BODY
  return (
    <MapView initialRegionr={initialRegion} style={{ flex: 1 }}>
      {lockpods.map((lockpod) => (
        <Marker
          key={lockpod.id}
          coordinate={{
            latitude: lockpod.latitude,
            longitude: lockpod.longitude,
          }}
          title={`Lockpod ${lockpod.id}`}
          description={lockpod.status}
          onCalloutPress={() => {
            handleCalloutpressed(lockpod);
          }}
        >
          {/* put visual of lockpod here */}
        </Marker>
      ))}
    </MapView>
  );
};

export default MapViewComponent;
