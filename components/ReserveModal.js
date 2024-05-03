import React, { useEffect, useState }from "react";
import { Modal, Pressable, StyleSheet, Text, View, Linking, ScrollView, Image } from "react-native";
import { windowWidth, windowHeight } from "../Constants";
import { useNavigation } from "@react-navigation/native";

const ReserveModal = ({ lockpod, visible, onModalClose}) => {
  const [clickable, setClickable] = useState(false);
  const [pictureSelected, setPictureSelected] = useState(false);
  const [selectedPictureIndex, setSelectedPictureIndex] = useState(null);
  const { navigate } = useNavigation();

  useEffect(() => {
    if (lockpod && lockpod.status && lockpod.status === "available") {
      setClickable(true);
    }
  }, [lockpod]);

  useEffect(() => {
    if (!visible) {
      // Reset picture selection when modal is closed
      setPictureSelected(false);
      setSelectedPictureIndex(null);
    }
  }, [visible]);

  const handleReserve = () => {
    // Navigate to ReserveScreen with lockpod information
    navigate("Reserve", {
      lockpod: lockpod,
    });
    // Close the modal
    onModalClose();
    handlePictureUnSelect();
  };

  const handleUnlock = () => {
    // Navigate to ReserveScreen with lockpod information
    navigate("ScanQR");
    // Close the modal
    onModalClose();
    handlePictureUnSelect();
  };

  const handleDirections = () => {
    const destination = `${lockpod.latitude},${lockpod.longitude}`;
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${destination}`);
  };

  const handlePictureSelect = (index) => {
    if (pictureSelected) {
        // If picture is already selected, unselect it
        handlePictureUnSelect();
    } else {
        // If picture is not selected, select it
        setPictureSelected(true);
        setSelectedPictureIndex(index);
    }
    
    //also returns the name of the lockpod?
  };

  const handlePictureUnSelect = () => {
    setPictureSelected(false);
    setSelectedPictureIndex(null);
  };

  const renderPictures = () => {
    return (
        <>
            <Pressable onPress={() => handlePictureSelect(0)}>
            <Image source={require('../assets/adaptive-icon.png')} style={styles.picture} />
            </Pressable>
            <Pressable onPress={() => handlePictureSelect(1)}>
            <Image source={require('../assets/adaptive-icon.png')} style={styles.picture} />
            </Pressable>
            <Pressable onPress={() => handlePictureSelect(2)}>
            <Image source={require('../assets/adaptive-icon.png')} style={styles.picture} />
            </Pressable>
        </>
    ); 
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
          {/* Directions Section */}
          <View style={styles.directionContainer}>
            <Text style={styles.directionTitle}>Directions</Text>
            <Pressable style={[styles.button, styles.directionButton]} onPress={handleDirections}>
              <Text style={styles.buttonText}>Get Directions</Text>
            </Pressable>
          </View>

          {/* Picture List Section */}
          {!pictureSelected && (
            <ScrollView horizontal={true} contentContainerStyle={styles.pictureListContainer}>
              {renderPictures()}
            </ScrollView>
          )}

          {/* Reserve and Unlock buttons (conditionally rendered) */}
          {pictureSelected && (
            <View style={styles.buttonContainer}>
              <Image source={require('../assets/adaptive-icon.png')} style={styles.picture} />
              <Pressable
                style={[
                  styles.button,
                  clickable ? styles.button : styles.nonClickableButton,
                ]}
                onPress={handleReserve}
              >
                <Text style={styles.buttonText}>Reserve</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleUnlock}>
                <Text style={styles.buttonText}>Unlock</Text>
              </Pressable>
            </View>
          )}
          
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    modalContainer: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.6, // Adjust the height to cover half of the screen
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
        backgroundColor: "grey",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
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
