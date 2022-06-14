import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Colors } from '../../assets/js/constants';
import { AntDesign } from '@expo/vector-icons';
import { getWidth, normalize } from '../../assets/js/functions';
import { useAudio } from '../../hooks/audio';

export default function Container({ visible, onClose, navigation }) {
    const {selectedPlaylist, CreatePlaylist, RenamePlaylist} = useAudio();
    const [playlistName, setPlaylistName] = useState("");

    return (
        <Modal onShow={() => setPlaylistName(selectedPlaylist.name == undefined ? "" : selectedPlaylist.name)} animationType="fade" transparent visible={visible}>
            <View style={style.container}>
                <View style={style.inputContainer}>
                    <TextInput value={playlistName} onChangeText={(text) => setPlaylistName(text)} style={style.input} placeholder="Nome da Playlist"></TextInput>
                    <TouchableOpacity 
                        onPress={() => {
                            if (!playlistName.trim()) {
                            onClose();
                            }
                            else {
                                Object.keys(selectedPlaylist).length > 0 ? 
                                RenamePlaylist(selectedPlaylist.id, playlistName) :
                                CreatePlaylist(playlistName);
                                onClose();
                            }       
                        }                        
                            }>
                        <AntDesign name="check" size={normalize(24)} color={Colors.new_playlist_check_color} 
                        style={[
                            style.submitIcon,
                            {backgroundColor: playlistName == undefined || playlistName == "" ? 
                            Colors.new_playlist_invalid_check_bg_color : Colors.new_playlist_check_bg_color
                            }
                        ]}></AntDesign>
                    </TouchableOpacity>
                </View>     
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[StyleSheet.absoluteFillObject, ,style.modalBackground]}></View>
            </TouchableWithoutFeedback>
        </Modal>
    );
  }

const style = StyleSheet.create({
    container: {
        // View
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    inputContainer: {
        width: getWidth() - 50,
        height: normalize(120),
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.tabBarColor, 
    },
    input: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.new_playlist_input_color,
        fontSize: normalize(18),
        paddingVertical: 5,
        textAlign:"center",
    },
    submitIcon: {
        padding: 10,
        //backgroundColor: Colors.new_playlist_check_bg_color,
        borderRadius: 50,
        marginTop: 20,
    },
    modalBackground: {
        // View
        backgroundColor: Colors.modal_background,
        zIndex: -1,
      }
});