import { Image, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import RenderItem from "./RenderItem";
import ListEmptyComponent from "./ListEmptyComponent";
import singleFileUploader from "single-file-uploader";
import Constants from "expo-constants";

const ImageScreen = () => {
  const [pictures, setPictures] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const images = await FileSystem.readDirectoryAsync(
          FileSystem.cacheDirectory + "ImageManipulator"
        );
        setPictures(images);
      })();
    }, [])
  );

  const uploadFile = async (itemData) => {
    try {
      await singleFileUploader({
        distantUrl: "https://wildstagram.nausicaa.wilders.dev/upload",
        expectedStatusCode: 201,
        filename: itemData.item,
        filetype: "image/jpeg",
        formDataName: "fileData",
        localUri:
          FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
        token: Constants.manifest.extra.token,
      });
      alert("Uploaded");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <FlatList
      data={pictures}
      keyExtractor={(pictures) => pictures}
      renderItem={(itemData) => (
        <RenderItem itemData={itemData} uploadFile={uploadFile} />
      )}
      ListEmptyComponent={() => <ListEmptyComponent />}
    />
  );
};

export default ImageScreen;
