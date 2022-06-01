import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Album from '../../components/AboutAlbum';
import AudioPlayer from '../../components/AudioPlayer';
import ActionSheet from "react-native-actions-sheet";
import { getHeight } from '../../assets/js/functions';

const Player: React.FC = () => {
  return (
    <SafeAreaView>
        <Header></Header>
        <Album></Album>
        <AudioPlayer></AudioPlayer>
        <ScrollView></ScrollView>
        <ActionSheet id="helloworld_sheet" containerStyle={{
          backgroundColor: "red", 
          height: getHeight() - 150,
          padding: 20,
          }}>
           <View>
              <Text>Hello World</Text>
           </View>
        </ActionSheet>
    </SafeAreaView>
  );
}

export default Player;

