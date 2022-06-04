import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Header from '../../components/Header';
import Album from '../../components/AboutAlbum';
import AudioPlayer from '../../components/AudioPlayer';
import ActionSheet from "react-native-actions-sheet";
import { getHeight } from '../../assets/js/functions';
import ListAudio from '../../components/ListAudio';
import OptionModal from '../../components/OptionModal';
import { Colors } from '../../assets/js/constants';

const Player: React.FC = () => {
  var selectedItem;

  return (
    <View>
        <Header></Header>
        <Album></Album>
        <AudioPlayer></AudioPlayer>
        <ScrollView></ScrollView>
        <ActionSheet id="listaudio_sheet" containerStyle={{
          backgroundColor: Colors.light_black, 
          height: getHeight() - 150,
          padding: 20,
          }}>
           <ListAudio/>
           <ActionSheet onBeforeShow={(data) => selectedItem = data} id="audioinfo_sheet" containerStyle={{
              backgroundColor: Colors.light_black, 
              height: 200,
              padding: 20,
              }}>
                <View>
                  <Text>Nome</Text>
                  <Text>Arquivo de Áudio</Text>
                </View>
                <View>
                  <Text>Formato</Text>
                  <Text>mp3</Text>
                </View>
            </ActionSheet>
        </ActionSheet>
        <OptionModal visible={true}/>
    </View>
  );
}

export default Player;