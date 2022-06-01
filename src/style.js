import React, { Component} from 'react';
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { Colors } from './assets/js/constants';
import Player from './pages/Player';

export default function App() {
    return (
      <SafeAreaView style={style.background}>
          <Player></Player>
      </SafeAreaView>
    );
  }


const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.light_black,
  }

});