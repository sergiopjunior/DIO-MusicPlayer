import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { normalize } from '../../assets/js/functions';
import { SimpleLineIcons } from "react-native-vector-icons"
import { SheetManager } from 'react-native-actions-sheet';
import { Colors } from '../../assets/js/constants';

const imageUrl = "../../assets/images/icon.png"

export default function Container() {
    return (
      <View style={style.container}>
        <Image style={style.image} source={require(imageUrl)}></Image>
      </View>
    );
    test
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
    width: normalize(33),
    height: normalize(33),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
});