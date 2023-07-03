import React, { useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import Permission from "./Permission";
import CameraView from "./CameraView";
import * as ImageManipulator from "expo-image-manipulator";

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const pictureMetadata = await cameraRef.current.takePictureAsync();
        console.log(
          await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
            { resize: { width: 800 } },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Camera Ref is null");
    }
  };

  return !permission?.granted ? (
    <Permission requestPermission={requestPermission} />
  ) : (
    <CameraView
      takePicture={takePicture}
      cameraRef={cameraRef}
      toggleCameraType={toggleCameraType}
      type={type}
    />
  );
}
