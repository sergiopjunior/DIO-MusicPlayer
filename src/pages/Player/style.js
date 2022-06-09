import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from '../../assets/js/constants';

export default function PlayerContainer({children}) {
    return (
        <SafeAreaView style={style.playerContainer}>
            {children}
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    playerContainer: {
        flex: 1,
        backgroundColor: Colors.light_black,
    }
});