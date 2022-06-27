import React, { useState } from 'react';
import { useAudio } from '../../hooks/audio';
import Container from './style';

const AudioOptionModal: React.FC = ({ navigation, id = 1 }) => {
  const {audioOptionModalSate, audioOptionModalSate2, CloseAudioOptionModal} = useAudio();

  return (
    <Container navigation={navigation} onClose={() => CloseAudioOptionModal()} visible={id == 1 ? audioOptionModalSate : audioOptionModalSate2}></Container>
  );
}

export default AudioOptionModal;