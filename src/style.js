import React from 'react';
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { Colors } from './assets/js/constants';
import Player from './pages/Player';
import AppNavigator from './components/NaviBar';
import { NavigationContainer } from "@react-navigation/native"

export default function App() {
    return (
      <SafeAreaView style={style.background}>
          <NavigationContainer>
            <AppNavigator/>
          </NavigationContainer> 
      </SafeAreaView>
    );
  }


const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.light_black,
  }

});