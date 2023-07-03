import { Image, View, Button } from "react-native";
import React, { useMemo } from "react";
import * as FileSystem from "expo-file-system";
import { Dimensions } from "react-native";

const RenderItem = ({ itemData, uploadFile }) => {
  const win = Dimensions.get("screen");
  const ratio = win.width / 800;

  const s = useMemo(
    () => ({
      imageStyle: {
        width: win.width - 100,
        height: 1402 * ratio - 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      container: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "white",
        marginVertical: 10,
        marginLeft: 50,
        marginRight: 50,
        elevation: 2,
        borderRadius: 10,
      },
    }),
    []
  );

  return (
    <View style={s.container}>
      <Image
        style={s.imageStyle}
        source={{
          uri: FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
        }}
      />
      <Button
        title={`Télécharger l'image`}
        onPress={() => uploadFile(itemData)}
      />
    </View>
  );
};

export default RenderItem;
