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
} from "react-native";
import { windowWidth, windowHeight } from "../Constants";
import { useNavigation } from "@react-navigation/native";

// Services
import { updateLockPodStatus } from "../services/LockpodService";
// import endReservation, {
//   createReservation,
// } from "../services/ReservationService";

// Context & Models
import { UserProfile } from "../Models/UserProfileModel";
import { LockPod } from "../Models/LockPodModel";
import { useUserProfileContext } from "../stores/UserProfileContext";

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
  const sortedLockpods = lockpods.sort((a, b) => a.id - b.id); // Sorted for consistency in ordering for now

  const { userProfile, profileDispatch } = useUserProfileContext();
  const [clickable, setClickable] = useState(true);
  const [pictureSelected, setPictureSelected] = useState(false);
  const [reservedByUser, setReservedByUser] = useState(false);
  const [reserveButtonText, setReserveButtonText] = useState("Reserve");
  const userId = userProfile["user_id"];
  const [selectedPictureIndex, setSelectedPictureIndex] = useState(null);
  const [selectedLockpod, setSelectedLockpod] = useState(lockpod); // Set default as the originally selected lockpod (the pin first pressed on)

  // MARK: Init
  useEffect(() => {
    const fetchReservation = async () => {
      if (selectedLockpod) {
        const isReserved = selectedLockpod.isReserved;
        console.log("Reserved by user:", isReserved);
        setReservedByUser(isReserved);
      }
    };

    // MARK: Methods
    // TODO: rework status system: (update `isReserved` and `inSession` for the selected lockPod)
    // (update the `activeReservations` list for the currentUser)
    // const updateReservationStatus = async () => {
    //   if (selectedLockpod && selectedLockpod.status) {
    //     console.log("userId", userId);
    //     console.log("lockpodId", selectedLockpod.id);
    //     await fetchReservation();
    //     // Change button text
    //     if (reservedByUser) {
    //       setReserveButtonText("Cancel");
    //     } else {
    //       setReserveButtonText("Reserve");
    //       if (selectedLockpod.status == "unavailable") {
    //         setClickable(false);
    //       } else {
    //         setClickable(true);
    //       }
    //     }
    //   }
    // };
    // updateReservationStatus();
  }, [selectedLockpod, reservedByUser]);

  useEffect(() => {
    if (!visible) {
      // Reset picture selection when modal is closed
      setPictureSelected(false);
      setSelectedPictureIndex(null);
    }
  }, [visible]);

  // MARK: handleReserve
  const handleReserve = () => {
    // Navigate to ReserveScreen with lockpod information
    navigation.navigate("Reserve", {
      lockpod: selectedLockpod,
      userId: userId,
    });
    // Close the modal
    onModalClose();
    handlePictureUnSelect();
  };

  // MARK: handleCancel
  const handleCancel = async () => {
    console.log(
      `Cancelled Reservation for User ${userId} and Lockpod ${selectedLockpod.id}!`
    );

    const user = {
      userId: userId,
      lockpodId: selectedLockpod.id,
    };

    // await endReservation(user);

    // Update lockpod status in database to show updated status in map view
    await updateLockPodStatus(selectedLockpod.id, false, false);

    // Update reserve button text and set reservedByUser state to false
    setReserveButtonText("Reserve");
    setReservedByUser(false);

    onModalClose();
    handlePictureUnSelect();
  };

  // MARK: handleUnlock
  const handleUnlock = () => {
    console.log("wow this is finally running!");
    // createReservation(userProfile.user_id, selectedLockpod.id, 45);

    // // Navigate to ReserveScreen with lockpod information
    // navigation.navigate("ScanQR");
    // // Close the modal
    // onModalClose();
    // handlePictureUnSelect();
  };

  const handleDirections = () => {
    const destination = `${selectedLockpod.latitude},${selectedLockpod.longitude}`;
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${destination}`
    );
  };

  // MARK: handlePictureSelect
  // TODO: rework this function / what does this function do?
  const handlePictureSelect = (lockpod: LockPod) => {
    console.log("Selected: ", lockpod.id);
    setPictureSelected(true);
    setSelectedLockpod(lockpod);
    // setSelectedPictureIndex(lockpod.id);
    //also returns the name of the lockpod?
  };

  const handlePictureUnSelect = () => {
    setPictureSelected(false);
    setSelectedPictureIndex(null);
  };

  const renderPictures = () => {
    return sortedLockpods.map((lockpod, index) => (
      <Pressable key={lockpod.id} onPress={() => handlePictureSelect(lockpod)}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={styles.picture}
        />
      </Pressable>
    ));
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
          {/* Directions Section */}
          <View style={styles.directionContainer}>
            <Text style={styles.directionTitle}>Directions</Text>
            <Pressable style={[styles.button]} onPress={handleDirections}>
              <Text style={styles.buttonText}>Get Directions</Text>
            </Pressable>
          </View>

          {/* Picture List Section */}
          <ScrollView
            horizontal={true}
            // contentContainerStyle={styles.pictureListContainer}
          >
            {renderPictures()}
          </ScrollView>

          {/* Reserve and Unlock buttons (conditionally rendered) */}
          {pictureSelected && (
            <View style={styles.buttonContainer}>
              <Image
                source={require("../assets/adaptive-icon.png")}
                style={styles.picture}
              />
              <Pressable
                style={[
                  styles.button,
                  clickable || reservedByUser
                    ? styles.button
                    : styles.nonClickableButton,
                ]}
                onPress={reservedByUser ? handleCancel : handleReserve}
                disabled={
                  selectedLockpod &&
                  // selectedLockpod.status == "unavailable" &&
                  !reservedByUser
                }
              >
                <Text style={styles.buttonText}>{reserveButtonText}</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  clickable || reservedByUser
                    ? styles.button
                    : styles.nonClickableButton,
                ]}
                onPress={handleUnlock}
                // disabled={
                // selectedLockpod &&
                // selectedLockpod.status == "unavailable" &&
                // !reservedByUser
                // }
              >
                <Text style={styles.buttonText}>Unlock</Text>
              </Pressable>
            </View>
          )}
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
    width: windowWidth * 0.5,
    height: windowHeight * 0.5, // Adjust the height to cover half of the screen
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  directionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  directionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
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
