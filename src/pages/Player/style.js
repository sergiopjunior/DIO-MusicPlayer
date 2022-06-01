import React, { Component} from 'react';
import { View, Text, StyleSheet } from "react-native";

export default function Background() {
    return (
      <View style={style.background}></View>
      
    );
  }


const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  }

});