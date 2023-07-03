import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import React, { useMemo, useState } from "react";
import { Camera } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";

const CameraView = ({ toggleCameraType, type, takePicture, cameraRef }) => {
  const s = useMemo(() => {
    const flip = {
      margin: 10,
      width: 40,
      height: 40,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 0,
    };
    return {
      flipFront: {
        ...flip,
        backgroundColor: "white",
      },
      flipBack: {
        ...flip,
        backgroundColor: "#16998e",
        transform: [{ rotate: "180deg" }],
      },
    };
  }, []);

  return (
    <>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <TouchableOpacity style={type === "front" ? s.flipFront : s.flipBack}>
          <Ionicons
            name="refresh-outline"
            size={30}
            color={type === "front" ? "#16998e" : "white"}
            onPress={toggleCameraType}
          />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity style={styles.iconCamera}>
        <Ionicons
          name="camera"
          size={45}
          color={"white"}
          onPress={takePicture}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  iconCamera: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default CameraView;
