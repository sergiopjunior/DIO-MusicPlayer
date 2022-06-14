import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Colors } from '../../assets/js/constants';
import { normalize } from '../../assets/js/functions';
import { useAudio } from '../../hooks/audio';

export default function Container({ visible, onClose, navigation }) {
    const {selectedPlaylist, DeletePlaylist, RenamePlaylist, OpenPlaylistInputModal} = useAudio();

    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={style.container}>
                    <View style={style.infoContainer}>
                        <Text style={style.textH1}>Nome:</Text>
                        <Text style={style.text}>{selectedPlaylist.name}</Text>
                    </View>

                    <View style={style.separator} />
                    <TouchableOpacity onPress={() => {OpenPlaylistInputModal(selectedPlaylist); onClose()}} style={style.buttonContainer}>
                        <Text style={style.button}>Renomear</Text>
                    </TouchableOpacity>

                    <View style={style.separator} />
                    <TouchableOpacity onPress={() => {DeletePlaylist(selectedPlaylist.id); onClose()}} style={style.buttonContainer}>
                        <Text style={style.button}>Excluir</Text>
                    </TouchableOpacity>
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
        backgroundColor: Colors.light_black_darker, 
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
    },
    infoContainer: {
        // View
        //backgroundColor: "red",
    },
    textH1: {
        // Text
        color: Colors.audio_title,
        fontSize: normalize(20),
        paddingLeft: 5,
        //backgroundColor: "blue",
    },
    text: {
        // Text
        color: Colors.audio_title,
        fontSize: normalize(17),
        paddingLeft: 5,
        //backgroundColor: "purple",
    },
    buttonContainer: {},
    button: {
        color: Colors.audio_title, 
        fontSize: normalize(25),
        paddingLeft: 5,
    },
    separator: {
        // View
        width: "100%",
        height: 1,
        backgroundColor: Colors.list_separator,
        marginTop: 5,
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