import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

const ScanQR = () => {
  // MARK: Vars
  const [type, setType] = useState(CameraType.back);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`Barcode scanned with data: ${data}`);
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
        style={{ flex: 1 }}
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
    </View>
  );
};

// MARK: StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default ScanQR;
