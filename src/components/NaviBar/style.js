import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { getHeight, getWidth, normalize } from '../../assets/js/functions';
import { Colors } from "../../assets/js/constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Player from "../../pages/Player";
import ListAudio from "../ListAudio";
import Playlist from "../../pages/Playlist";
import { useAudio } from "../../hooks/audio";

const Tab = createBottomTabNavigator();

export default function Container() {
    const {audiosFound} = useAudio();

    return (
        <Tab.Navigator initialRouteName="Player" screenOptions={({ route }) => ({
            tabBarStyle: style.container,
            tabBarIcon: ({ focused}) => {
                let iconName;
                let color = focused ? Colors.tabBarIconFocusColor : Colors.tabBarIconColor
              
                if (route.name === "Playlist")
                    return <MaterialIcons name="library-music" size={normalize(24)} color={color} />;

                if (route.name === 'Músicas')
                    iconName = 'headphones';
                else if (route.name === 'Player')
                    iconName = "compact-disc";

                return <FontAwesome5 name={iconName} size={normalize(24)} color={color} />;
            },
            tabBarLabelStyle: {fontSize: normalize(12)},
            tabBarActiveTintColor: Colors.tabBarLabelFocusColor,
            tabBarInactiveTintColor: Colors.tabBarLabelColor, 
            tabBarBadgeStyle: {color: Colors.tabBarBadgeTextColor, backgroundColor: Colors.tabBarBadgeColor, fontSize: normalize(15), alignItems: "center", justifyContent: "center" }, 
            headerShown: false,
          })}>
            <Tab.Screen name="Músicas" component={ListAudio} options={{ tabBarBadge: audiosFound }}/>
            <Tab.Screen name="Player" component={Player}/>
            <Tab.Screen name="Playlist" component={Playlist}/>
        </Tab.Navigator>
    );
}


const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.tabBarColor, 
        height: normalize(45),
        width: getWidth() - 100, 
    }
});