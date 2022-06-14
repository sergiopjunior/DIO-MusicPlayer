import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity } from "react-native";
import { Colors } from '../../assets/js/constants';
import { Entypo, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PlaylistOptionModal from "../../components/PlaylistOptionModal";
import { getWidth, normalize } from "../../assets/js/functions";
import { useAudio } from "../../hooks/audio";
import PlaylistInputModal from "../../components/PlaylistInputModal";

export default function ItemContainer({ navigation }) {
    const {playLists, addToPlaylist, currentPlayList, OpenPlaylistOptionModal, OpenPlaylistInputModal, AddToPlaylist} = useAudio();

    const RenderItem = ({ item }) => { 
        return (
              <View style={style.itemContainer}>
                <TouchableOpacity style={style.leftContainer} onPress={() => 
                    Object.keys(addToPlaylist).length > 0 ? AddToPlaylist(item.id, addToPlaylist) : console.log("View Playlist")
                }>
                    <View style={style.thumbnail}>
                        {
                            Object.keys(addToPlaylist).length > 0 ?
                            <Entypo name="add-to-list" size={normalize(35)} color={Colors.audio_thumbnail} /> :
                            <MaterialCommunityIcons name={item.id == currentPlayList.id ? "playlist-play" : "playlist-music-outline"} 
                            size={normalize(35)} color={item.id == currentPlayList.id ? Colors.audio_thumbnail_select : Colors.audio_thumbnail} />
                        }       
                    </View>  
                    <View style={style.itemInfoContainer}>
                        <Text numberOfLines={1} style={style.itemInfoTitle}>{item.name}</Text>
                        <Text style={style.itemInfoAudiosCount}>
                            {item.audios.length > 0 ?
                            item.audios.length > 1 ? `${item.audios.length} Áudios` : `${item.audios.length} Áudio` :
                            "Nenhum áudio adicionado"
                        }</Text>
                    </View>
                </TouchableOpacity>   
                {
                        Object.keys(addToPlaylist).length > 0 ? 
                        <></> : 
                        <TouchableOpacity onPress={() => OpenPlaylistOptionModal(item)}>
                           <View style={style.rightConainer}>
                                 <Entypo name="dots-three-vertical" size={normalize(20)} color={Colors.audio_more_info} />            
                           </View>  
                        </TouchableOpacity>  
                }                          
              </View>
            )
      };

    return (
        <SafeAreaView style={style.listContainer}>
            <FlatList 
                data={playLists.slice(1)} 
                keyExtractor={item => item.id} 
                ItemSeparatorComponent={() => <View style={style.separator}/>}
                renderItem={item => <RenderItem {...item}/>}
                ListFooterComponent={
                    <>
                    <View style={style.separator}/>
                    <TouchableOpacity style={style.newListButton} onPress={() => OpenPlaylistInputModal()}>
                        <Ionicons name="add-circle-outline" size={normalize(30)} color={Colors.new_list_icon_color} />
                        <Text style={style.newListText}>Criar nova Playlist</Text>
                    </TouchableOpacity>
                    </>
                }
            />       
            <PlaylistOptionModal visible={true} navigation={navigation}/>
            <PlaylistInputModal visible={true} navigation={navigation}/>
        </SafeAreaView> 
    );
};

const style = StyleSheet.create({
    listContainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: Colors.light_black,  
    },
    itemContainer: {
        // View
        flexDirection: "row",
        margin: 3,
        alignSelf: "center",
        alignItems: "center",
        width: getWidth() - 40,
        //backgroundColor: "red",
    },
    leftContainer: {  
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor: "blue",
    },
    rightConainer: {
        //backgroundColor: "green",
    },
    thumbnail: {
        // Image
        width: normalize(50),
        height: normalize(50),
        alignItems:"center",
        justifyContent: "center",
        //backgroundColor: "orange",
    },
    itemInfoContainer: {
        // View
        flex: 1,
        paddingLeft: 10,
        //backgroundColor: "black",
    },
    itemInfoTitle: {
        // Text
        fontSize: normalize(17),
        fontWeight: "700",
        color: Colors.audio_title,
        width: getWidth() - 130,
        marginBottom: 1,
    },
    itemInfoAudiosCount: {
        // Text
        fontSize: normalize(13),
        fontWeight: "300",
        color: Colors.audio_date,
    },
    separator: {
        // View
        width: "100%",
        height: 1,
        backgroundColor: Colors.list_separator,
        marginTop: 5,
    },
    newListButton: {
        flexDirection: "row",
        alignItems: "center",
        width: getWidth() - 40,
        marginTop: 10,
        paddingLeft: 15,
    },
    newListText: {
        marginLeft: 5,
        fontSize: normalize(20),
        color: Colors.audio_title,
    }
});