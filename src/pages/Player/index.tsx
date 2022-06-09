import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Header from '../../components/Header';
import Album from '../../components/AboutAlbum';
import AudioPlayer from '../../components/AudioPlayer';
import ActionSheet from "react-native-actions-sheet";
import { getHeight } from '../../assets/js/functions';
import ListAudio from '../../components/ListAudio';
import { Colors } from '../../assets/js/constants';
import PlayerContainer from './style';

const Player: React.FC = () => {
  var selectedItem;

  return (
    <PlayerContainer>
        <Header></Header>
        <Album></Album>
        <AudioPlayer></AudioPlayer>
        <ScrollView></ScrollView>
    </PlayerContainer>
  );
}

export default Player;