import React from 'react';
import { View, Image, StyleSheet, Text} from "react-native";
import { getWidth, normalize } from '../../assets/js/functions';
import { useAudio } from '../../hooks/audio';

const imageUrl = "../../assets/images/temp.png"

export default function Container() {
  const {currentAudioInfo} =  useAudio();

  return (
      <View style={style.container}>
        <Text numberOfLines={1} style={style.title}>{currentAudioInfo?.title || "Selecione um Áudio"}</Text>
        <Image source={require(imageUrl)} style={style.album}></Image>
      </View>
    );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  title: {
    color: "#FFFFFF",
    fontSize: normalize(24),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  album: {
    width: getWidth() - 40,
    height: getWidth() - 100,
  },
});