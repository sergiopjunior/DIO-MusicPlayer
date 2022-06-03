import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { normalize } from '../../assets/js/functions';
import { Feather } from "react-native-vector-icons"
import { SheetManager } from 'react-native-actions-sheet';

const imageUrl = "../../assets/images/favicon.png"

export default function Container() {
    return (
      <View style={style.container}>
        <Image style={style.image} source={require(imageUrl)}></Image>
        <TouchableOpacity style={style.button} onPress={() => SheetManager.show("listaudio_sheet")}>
            <Feather name="list" size={normalize(25)} color="white"></Feather>
        </TouchableOpacity>
      </View>
    );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 15,
    marginTop: 30,
  },
  image: {
    width: normalize(25),
    height: normalize(25),
  },
  button: {
    width: normalize(25),
    height: normalize(25),
    alignItems: "center",
    justifyContent: "center",
  },
});