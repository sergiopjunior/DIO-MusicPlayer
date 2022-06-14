import React, { useState } from 'react';
import { useAudio } from '../../hooks/audio';
import Container from './style';

const PlaylistOptionModal: React.FC = ({ navigation }) => {
  const {playlistOptionModalSate, ClosePlaylistOptionModal} = useAudio();

  return (
    <Container navigation={navigation} onClose={() => ClosePlaylistOptionModal()} visible={playlistOptionModalSate}></Container>
  );
}

export default PlaylistOptionModal;