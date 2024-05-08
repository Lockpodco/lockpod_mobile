import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { windowHeight, windowWidth } from "../Constants";
import { useRoute } from "@react-navigation/native";
import { reserveLockpod } from "../services/ReservationService";
import { updateLockpodStatus } from "../services/LockpodService";
import { useNavigation } from "@react-navigation/native";

const ReserveScreen = () => {
  const route = useRoute();
  const { navigate } = useNavigation();
  const { lockpod, userId } = route.params; // Extract props from route.params

  const onReservationSelect = async (minutes) => {
    // Get the current time
    const currentTime = new Date();

    // Add selected minutes to the current time
    const startTime = new Date(currentTime.getTime() + minutes * 60000);

    // print test
    console.log(
      "Current time: ",
      currentTime.getHours(),
      ":",
      currentTime.getMinutes(),
      " Reserved time: ",
      startTime.getHours(),
      ":",
      startTime.getMinutes()
    );

    user = {
      userId: userId,
      lockpodId: lockpod.id,
      status: "unavailable",
      startTime: startTime,
      endTime: null,
    };

    try {
      await reserveLockpod(user);

      // Update lockpod status in database to show updated status in map view
      await updateLockpodStatus(lockpod.id, "unavailable");
      navigate("Home");
    } catch (error) {
      // Handle any errors that occur during reservation
      console.error("Error occurred during reservation:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Status of Reservation:</Text>
      {/* Display reservation status here */}
      <Text>Available Reservation Times:</Text>
      <TouchableOpacity
        onPress={() => onReservationSelect(15)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>15 mins</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => onReservationSelect(30)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>30 mins</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onReservationSelect(45)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>45 mins</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onReservationSelect(60)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>60 mins</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 24,
  },
  button: {
    backgroundColor: "#90EE90", // Button background color
    padding: 20, // Padding around the text
    borderRadius: 5, // Border radius to make it rounded
    marginTop: 12,
    width: windowWidth * 0.4,
  },
  buttonText: {
    color: "#fff", // Text color
    textAlign: "center", // Center the text horizontally
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 18,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: "80%", // Width of the modal
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});
export default ReserveScreen;
