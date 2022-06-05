import React, { Component} from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getWidth, normalize } from '../../assets/js/functions';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../assets/js/constants';
import { useAudio } from '../../hooks/audio';

const imageUrl = "../../assets/images/temp.png"

export default function Container() {
    const {isPlay, PlayAudio, currentAudio} = useAudio();

    return (
      <View style={style.container}>
        <View style={style.buttonContainer}>
            <TouchableOpacity style={style.buttonAction}>
              <AntDesign name="banckward" size={normalize(23)} color={Colors.audio_player}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => PlayAudio()} style={style.buttonActionPrimay}>
              <AntDesign name={isPlay && currentAudio ? "pausecircleo" : "playcircleo"} size={50} color={Colors.audio_player}/>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonAction}>
              <AntDesign name="forward" size={normalize(23)} color={Colors.audio_player}/>
            </TouchableOpacity>
        </View>
      </View>
    );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonContainer: {
      flexDirection: "row",
      width: getWidth() - normalize(100),
      justifyContent: "space-between",
      alignItems: "center",
  },
  buttonActionPrimay: {
    width: normalize(55),
    height: normalize(55),
    //backgroundColor: "#F43F30",
    borderRadius: normalize(42),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAction: {
    width: normalize(36),
    height: normalize(36),
    //backgroundColor: "#FE9541",
    borderRadius: normalize(33),
    justifyContent: "center",
    alignItems: "center",
  },
});