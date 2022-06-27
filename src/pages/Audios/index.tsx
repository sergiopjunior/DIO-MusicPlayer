import React from 'react';
import ListAudio from '../../components/ListAudio';
import AudioOptionModal from '../../components/AudioOptionModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/js/constants';

const Audios: React.FC = ({ navigation }) => {
  return (
      <SafeAreaView style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.light_black,  }}>
        <ListAudio navigation={navigation}/>
        <AudioOptionModal navigation={navigation}/>
      </SafeAreaView>
    
  );
}

export default Audios;