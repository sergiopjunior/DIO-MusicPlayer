import React, { useState } from 'react';
import { useAudio } from '../../hooks/audio';
import Container from './style';

const PlaylistViewModal: React.FC = ({ navigation }) => {
  const {playlistViewModalState, ClosePlaylistViewModal} = useAudio();

  return (
    <Container navigation={navigation} onClose={() => ClosePlaylistViewModal()} visible={playlistViewModalState}></Container>
  );
}

export default PlaylistViewModal;