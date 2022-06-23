import React from 'react';
import ListAudio from '../../components/ListAudio';
import AudioOptionModal from '../../components/AudioOptionModal';

const Audios: React.FC = ({ navigation }) => {
  return (
      <>
        <ListAudio navigation={navigation}/>
        <AudioOptionModal visible={false} navigation={navigation}/>
      </>
    
  );
}

export default Audios;