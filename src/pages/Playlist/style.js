import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity } from "react-native";
import { Colors } from '../../assets/js/constants';
import { Entypo, AntDesign } from '@expo/vector-icons';
import PlaylistOptionModal from "../../components/PlaylistOptionModal";
import { getWidth, normalize } from "../../assets/js/functions";
import { useAudio } from "../../hooks/audio";

export default function ItemContainer({ navigation }) {
    const {playLists, currentPlayList, OpenPlaylistOptionModal} = useAudio();

    const RenderItem = ({ item }) => { 
        return (
              <View style={style.itemContainer}>
                <TouchableOpacity style={style.leftContainer}>
                    <View style={style.thumbnail}>            
                      <AntDesign name={item.id == currentPlayList.id ? "pausecircleo" : "playcircleo"} size={normalize(35)} color={Colors.audio_thumbnail} />
                    </View>  
                    <View style={style.itemInfoContainer}>
                        <Text numberOfLines={1} style={style.itemInfoTitle}>{item.name}</Text>
                        <Text style={style.itemInfoAudiosCount}>{item.audios.length}</Text>
                    </View>
                </TouchableOpacity>   
                <TouchableOpacity onPress={() => OpenPlaylistOptionModal(item)}>
                  <View style={style.rightConainer}>
                    <Entypo name="dots-three-vertical" size={normalize(20)} color={Colors.audio_more_info} />
                  </View>  
                </TouchableOpacity>                           
              </View>
            )
      };

    return (
        <SafeAreaView style={style.listContainer}>
            <FlatList 
                data={playLists} 
                keyExtractor={item => item.id} 
                ItemSeparatorComponent={() => <View style={style.separator}/>}
                renderItem={item => <RenderItem {...item}/>}
                ListFooterComponent={
                    <PlaylistOptionModal visible={true} navigation={navigation}/>
                  }
            />  
        </SafeAreaView> 
    );
};

const style = StyleSheet.create({
    listContainer: {
        paddingTop: 20,
        backgroundColor: Colors.light_black,
        flex: 1,
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
        width: "90%",
        height: 1,
        backgroundColor: Colors.list_separator,
        marginTop: 5,
        alignSelf: "center",
    },
});