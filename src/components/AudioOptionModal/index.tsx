import React, { useState } from 'react';
import { useAudio } from '../../hooks/audio';
import Container from './style';

const AudioOptionModal: React.FC = ({ navigation }) => {
  const {audioOptionModalSate, CloseAudioOptionModal} = useAudio();

  return (
    <Container navigation={navigation} onClose={() => CloseAudioOptionModal()} visible={audioOptionModalSate}></Container>
  );
}

export default AudioOptionModal;