import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from '../../assets/js/constants';

export  default function Container() {
    return (
        <View style={style.container}>
            <Text style={style.text}>Playlist</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_black,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 30,
    },
});