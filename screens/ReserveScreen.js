import React from "react";
import MapViewComponent from "../components/MapViewComponent";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { windowHeight, windowWidth } from "../Constants";
import { useRoute } from "@react-navigation/native";

// const styles = StyleSheet.create({});
const ReserveScreen = () => {
  const route = useRoute();
  const { lockpodId, status } = route.params; // Extract props from route.params

  return (
    <View style={{ position: "absolute", bottom: 0, width: "100%", height: "100%", backgroundColor: "white", padding: 24 }}>
        <Text>Status of Reservation:</Text>
        {/* Display reservation status here */}
        <Text>Available Reservation Times:</Text>
        <TouchableOpacity onPress={() => onReservationSelect(15)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>15 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onReservationSelect(30)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>30 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onReservationSelect(45)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>45 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onReservationSelect(60)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>60 mins</Text>
        </TouchableOpacity>
      </View>
  );

};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000', // Button background color
    padding: 20, // Padding around the text
    borderRadius: 5, // Border radius to make it rounded
    marginTop: 12,
  },
  buttonText: {
    color: '#fff', // Text color
    textAlign: 'center', // Center the text horizontally
  },
});

export default ReserveScreen;
