import React, { useState } from 'react';
import { useAudio } from '../../hooks/audio';
import Container from './style';

const PlaylistInputModal: React.FC = ({ navigation }) => {
  const {playlistInputModalSate, ClosePlaylistInputModal} = useAudio();

  return (
    <Container navigation={navigation} onClose={() => ClosePlaylistInputModal()} visible={playlistInputModalSate}></Container>
  );
}

export default PlaylistInputModal;