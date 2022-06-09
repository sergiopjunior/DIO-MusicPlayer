import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import { getWidth, normalize } from '../../assets/js/functions';
import { useAudio } from '../../hooks/audio';
import { Entypo, AntDesign } from '@expo/vector-icons'; 
import { Colors } from '../../assets/js/constants';
import OptionModal from '../OptionModal';

const imageUrl = "../../assets/images/sound.png"

export default function ItemContainer() {
    const {playList, OpenOptionModal, currentAudioInfo, PlayAudio, isPlay} = useAudio();
    
    const RenderItem = ({ item }) => { 
      return (
            <View style={style.itemContainer}>
                <TouchableOpacity onPress={() => item.id == currentAudioInfo.id ? PlayAudio() : PlayAudio(item)} style={style.leftContainer}>
                  <View style={style.thumbnail}>            
                      <AntDesign name={item.id== currentAudioInfo.id && isPlay ? "pausecircleo" : "playcircleo"} size={normalize(35)} color={Colors.audio_thumbnail} />
                  </View>   
                  <View style={style.itemInfoContainer}>
                        <Text numberOfLines={1} style={style.itemInfoTitle}>{item.title}</Text>
                        <Text style={style.itemInfoDuration}>{item.duration}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => OpenOptionModal(item)}>
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
                data={playList} 
                keyExtractor={item => item.id} 
                ItemSeparatorComponent={() => <View style={style.separator}/>}
                renderItem={item => <RenderItem {...item}/>}
                ListFooterComponent={
                  <OptionModal visible={true}/>
                }
            />  
        </SafeAreaView>      
    );
}

const style = StyleSheet.create({
  listContainer: {
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
  itemInfoDuration: {
    // Text
    fontSize: normalize(13),
    fontWeight: "300",
    color: Colors.audio_date,
  },
  thumbnail: {
    // Image
    width: normalize(50),
    height: normalize(50),
    alignItems:"center",
    justifyContent: "center",
    //backgroundColor: "orange",
  },
  separator: {
    // View
    width: "100%",
    height: 1,
    backgroundColor: Colors.list_separator,
    marginTop: 5,
  },
});