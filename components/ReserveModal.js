import React, { useEffect, useState }from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { windowWidth, windowHeight } from "../Constants";
import { useNavigation } from "@react-navigation/native";

const ReserveModal = ({ lockpod, visible, onModalClose}) => {
  const [clickable, setClickable] = useState(false);
  const { navigate } = useNavigation();

  if(lockpod && lockpod.status && lockpod.status == "avaliable"){
    setClickable(true);
  }
  const handleReserve = () => {
    // TODO: Implement reserve functionality (navigate to the reserve screen)

    // Navigate to ReserveScreen with lockpod information
    navigate("Reserve", { lockpodId: lockpod.id, status: lockpod.status });
    // Close the modal
    onModalClose();
    
  };

  const handleUnlock = () => {
    // TODO: Implement reserve functionality (navigate to the reserve screen)

    // Navigate to ReserveScreen with lockpod information
    navigate("ScanQR");
    // Close the modal
    onModalClose();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onModalClose}
    >
      <Pressable onPress={onModalClose} style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>LockPod {lockpod?.id}</Text>
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, clickable ? styles.button : styles.nonClickableButton]}
              onPress={handleReserve}
              disabled={!clickable} // Disable the button if it's not clickable
            >
              <Text style={styles.buttonText}>Reserve</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleUnlock}>
              <Text style={styles.buttonText}>Unlock</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    padding: 10,
    borderRadius: 10,
    marginBottom: windowHeight * 0.1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  nonClickableButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default ReserveModal;
