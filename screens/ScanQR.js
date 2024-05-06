import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { windowHeight, windowWidth } from "../Constants";
import { TextInput } from "react-native-gesture-handler";

const ScanQR = () => {
  // MARK: Vars
  const [type, setType] = useState(CameraType.back);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [code, setCode] = useState("");

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`Barcode scanned with data: ${data}`);
  };

  const handleSubmit = () => {
    // Use the value of 'code' when the submit button is pressed
    alert(`Submitted code: ${code}`);
  };

  // MARK: Body
  //permission still loading because useCameraPermissions() is async
  if (!permission) {
    return <View />;
  }

  // permissions loaded and app does not have persmision to use camera
  if (!permission.granted) {
    //camera permissions are not granted yet
    return (
      <View>
        <Text>We need your permission to use the camera!</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // permissions loaded and app has persmission to use camera
  return (
    <View style={styles.container}>
      <Camera
        type={type}
        style={styles.cameraContainer}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} //so it doesnt scan over and over again
      >
        <View style={styles.buttonContainer}>
          {scanned && (
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={styles.button}
            >
              <Text style={styles.text}>Tap to scan again</Text>
            </TouchableOpacity>
          )}
        </View>
      </Camera>
      <Text>-or-</Text>
      <TextInput
        placeholder="Type in 5-digit code"
        style={styles.input}
        value={code}
        onChangeText={setCode}
      />
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
};

// MARK: StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.4,
    width: windowWidth * 0.4,
    margin: 50,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    textAlign: "center",
    backgroundColor: "white",
    width: windowWidth * 0.4,
    padding: 5,
    marginTop: 20,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "black",
    width: windowWidth * 0.4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});

export default ScanQR;
