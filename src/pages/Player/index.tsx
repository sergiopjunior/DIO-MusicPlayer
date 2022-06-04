import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Album from '../../components/AboutAlbum';
import AudioPlayer from '../../components/AudioPlayer';
import ActionSheet from "react-native-actions-sheet";
import { getHeight } from '../../assets/js/functions';
import ListAudio from '../../components/ListAudio';

const Player: React.FC = () => {

  return (
    <View>
        <Header></Header>
        <Album></Album>
        <AudioPlayer></AudioPlayer>
        <ScrollView></ScrollView>
        <ActionSheet id="listaudio_sheet" containerStyle={{
          backgroundColor: "#3A3A3A", 
          height: getHeight() - 150,
          padding: 20,
          }}>
           <ListAudio/>
        </ActionSheet>
    </View>
  );
}

export default Player;

