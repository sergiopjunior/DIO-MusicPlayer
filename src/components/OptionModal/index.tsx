import React, { useState } from 'react';
import { useAudio } from '../../hooks/audio';
import Container from './style';

const OptionModal: React.FC = () => {
  const {optionModalSate, CloseOptionModal} = useAudio();

  return (
    <Container onClose={() => CloseOptionModal()} visible={optionModalSate}></Container>
  );
}

export default OptionModal;