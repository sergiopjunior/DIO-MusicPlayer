import React, { Component} from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getWidth, normalize } from '../../assets/js/functions';
import { Feather } from "react-native-vector-icons"

const imageUrl = "../../assets/images/temp.png"

export default function Container() {
    return (
      <View style={style.container}>
        <View style={style.buttonContainer}>
            <TouchableOpacity style={style.buttonAction}>
              <Feather name="chevron-left" size={normalize(25)} color="white"></Feather>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonActionPrimay}>
              <Feather name="play" size={normalize(30)} color="white"></Feather>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonAction}>
              <Feather name="chevron-right" size={normalize(25)} color="white"></Feather>
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
    backgroundColor: "#F43F30",
    borderRadius: normalize(42),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAction: {
    width: normalize(36),
    height: normalize(36),
    backgroundColor: "#FE9541",
    borderRadius: normalize(33),
    justifyContent: "center",
    alignItems: "center",
  },
});