import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import { normalize } from '../../assets/js/functions';
import { useAudio } from '../../hooks/audio';

const imageUrl = "../../assets/images/sound.png"

export default function ItemContainer() {
    const {playList} = useAudio();

    const RenderItem = ({ item }) => { 
        return (
            <View style={style.itemContainer}>
                <Image source={require(imageUrl)} style={style.imageAlbum}/>
                <View style={style.itemInfoContainer}>
                    <Text style={style.itemInfoTitle}>{item.title}</Text>
                    <Text style={style.itemInfoData}>{item.date}</Text>
                </View>
            </View>
          )
    };

    return (
      <ScrollView>
          <FlatList 
          data={playList} 
          keyExtractor={item => item.id} 
          ItemSeparatorComponent={() => <View style={style.separator}/>}
          renderItem={item => <RenderItem {...item}/>}
          />
      </ScrollView>
    );
}

const style = StyleSheet.create({
  itemContainer: {
    // View
    flexDirection: "row",
    margin: 5,
    //marginTop: 30,
  },
  itemInfoContainer: {
    // View
    paddingLeft: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  itemInfoTitle: {
    // Text
    fontSize: normalize(20),
    fontWeight: "700",
    color: "white",
    width: "80%",
  },
  itemInfoData: {
    // Text
    fontSize: normalize(15),
    fontWeight: "300",
    color: "rgba(255, 255, 255, 255.5)",
  },
  imageAlbum: {
    // Image
    width: normalize(75),
    height: normalize(75),
  },
  separator: {
    // View
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 255.5)",
  },
});