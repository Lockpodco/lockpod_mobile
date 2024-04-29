import React, { useEffect, useState } from "react";
import MapViewComponent from "../components/MapViewComponent";
import { View, StyleSheet, TouchableOpacity, Text, Modal, Pressable } from "react-native";
import { windowHeight, windowWidth } from "../Constants";
import { useRoute } from "@react-navigation/native";

// const styles = StyleSheet.create({});
const ReserveScreen = () => {
  const route = useRoute();
  const { lockpodId, status } = route.params; // Extract props from route.params
  const [startTime, setStartTime] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);

  
  const handleReservationSelect = async (minutes) => {
    try{
      const currentTime = new Date();
      const reserveTime = new Date(currentTime.getTime() + minutes * 60000); // Adding minutes (minutes * 60000 milliseconds)

      //test!!!!
      console.log("Current time: ",currentTime.getHours(),":", currentTime.getMinutes()," Reserved time: ", reserveTime.getHours(),":",  reserveTime.getMinutes())
      // await axios.put('/createreservation', { startTime: reserveTime});
      // Set the start time state to the current time
      setStartTime(reserveTime);
    } catch (error) {
      console.error('Error updating start time:', error);
      // Handle error appropriately (e.g., show error message to the user)
    }
  };

  return (
    <View style={styles.container}>
      <Text>Status of Reservation:</Text>
      {/* Display reservation status here */}
      <Text>Available Reservation Times:</Text>
      <TouchableOpacity onPress={() => handleReservationSelect(15)} style={styles.button}>
        <Text style={styles.buttonText}>15 mins</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleReservationSelect(30)} style={styles.button}>
        <Text style={styles.buttonText}>30 mins</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleReservationSelect(45)} style={styles.button}>
        <Text style={styles.buttonText}>45 mins</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleReservationSelect(60)} style={styles.button}>
        <Text style={styles.buttonText}>60 mins</Text>
      </TouchableOpacity>

      {/* Reservation Popup Modal */}
      <Modal
        animationType="side"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Cross button to close the modal */}
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
            {/* Content of the modal */}
            <Text>Reservation Details:</Text>
            {/* Render reservation details or any other content */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
  },
  button: {
    backgroundColor: '#90EE90', // Button background color
    padding: 20, // Padding around the text
    borderRadius: 5, // Border radius to make it rounded
    marginTop: 12,
  },
  buttonText: {
    color: '#fff', // Text color
    textAlign: 'center', // Center the text horizontally
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: '80%', // Width of the modal
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
