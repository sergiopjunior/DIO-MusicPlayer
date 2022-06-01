import React, { Component} from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { getWidth, normalize } from '../../assets/js/functions';

const imageUrl = "../../assets/images/temp.png"

export default function Container() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Selecione um áudio</Text>
        <Image source={require(imageUrl)} style={style.album}></Image>
      </View>
    );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 26,
  },
  title: {
    color: "#FFFFFF",
    fontSize: normalize(24),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  album: {
    width: getWidth() - 40,
    height: 350,
  },
});