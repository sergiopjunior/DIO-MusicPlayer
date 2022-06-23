import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { Colors } from '../../assets/js/constants';
import { normalize } from '../../assets/js/functions';
import { useAudio } from '../../hooks/audio';
import ListAudio from '../ListAudio';

export default function Container({ visible, onClose, navigation }) {
    const {selectedPlaylist} = useAudio();

    return (
        <Modal animationType="fade" transparent visible={visible}>
            <View style={style.container}>
                <View style={style.topContainer}>
                    <TouchableOpacity onPress={onClose} style={style.rowBackButton}>
                        <Ionicons name="arrow-back-outline" size={normalize(30)} color={Colors.row_back_color} />    
                    </TouchableOpacity>
                    <Text style={style.playListName}>{selectedPlaylist.name}</Text>
                </View>    
                <ListAudio navigation={navigation}/>   
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={style.modalBackground}></View>
            </TouchableWithoutFeedback>
        </Modal>
    );
  }

const style = StyleSheet.create({
    container: {
        // View
        position: "absolute",
        top: normalize(50), bottom: 0, left: 0, right: 0,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
        backgroundColor: Colors.light_black_darker, 
    },
    topContainer: {
        // View        
        flexDirection: "row",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        height: normalize(35),
        //backgroundColor: "black",
    },
    rowBackButton: {
        // TouchableOpacity
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: "85%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        zIndex: 1000,
        //backgroundColor: "blue",
    },  
    playListName: {
        // View
        flex: 0,
        textAlign: "center",
        fontSize: normalize(20),
        color: Colors.audio_thumbnail,
        //backgroundColor: "red",
    },
    modalBackground: {
        // View
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.modal_background,
      }
});