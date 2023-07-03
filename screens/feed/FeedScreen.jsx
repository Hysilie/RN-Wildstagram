import { FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import RenderItem from "./RenderItem";
import ListEmptyComponent from "../images/ListEmptyComponent";

const FeedScreen = () => {
  const [serverImagesUrls, setServerImagesUrls] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const filesUrl = await axios.get(
            "https://wildstagram.nausicaa.wilders.dev/list"
          );
          setServerImagesUrls(filesUrl.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }, [])
  );

  return (
    <FlatList
      data={serverImagesUrls}
      keyExtractor={(serverImageURI) => serverImageURI}
      renderItem={(itemData) => <RenderItem itemData={itemData} />}
      ListEmptyComponent={() => <ListEmptyComponent />}
    />
  );
};

export default FeedScreen;
