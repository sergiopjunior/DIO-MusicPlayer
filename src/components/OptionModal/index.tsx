import React, { useState } from 'react';
import { useAudio } from '../../hooks/audio';
import Container from './style';

const OptionModal: React.FC = ({ navigation }) => {
  const {optionModalSate, CloseOptionModal} = useAudio();

  return (
    <Container navigation={navigation} onClose={() => CloseOptionModal()} visible={optionModalSate}></Container>
  );
}

export default OptionModal;