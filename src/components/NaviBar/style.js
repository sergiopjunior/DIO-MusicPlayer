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
   /*<View style={style.container}>
            <View style={style.optionContainer}>
                <TouchableOpacity style={style.button}>
                    <FontAwesome5 name="headphones" size={normalize(24)} color={Colors.text_color} />
                </TouchableOpacity>
            </View>
            <View style={style.optionContainer}>
                <TouchableOpacity style={style.button}>
                    <FontAwesome5 name="compact-disc" size={normalize(24)} color={Colors.text_color} />
                </TouchableOpacity>
            </View>
            <View style={style.optionContainer}>
                <TouchableOpacity style={style.button}>
                    <MaterialIcons name="library-music" size={normalize(24)} color={Colors.text_color} />
                </TouchableOpacity>
            </View>
        </View>*/

export default function Container() {
    const {audiosFound} = useAudio();

    return (
        <Tab.Navigator initialRouteName="Player" screenOptions={({ route }) => ({
            tabBarStyle: {backgroundColor: Colors.tabBarColor, height: 60},
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
            tabBarLabelStyle: {fontSize: 15},
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
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: Colors.navi_bg_color,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    optionContainer: {
        //backgroundColor: "red",
    },
    button: {
        //backgroundColor: "blue",
    },
});