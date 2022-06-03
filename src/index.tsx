import React from 'react';
import { StatusBar } from 'expo-status-bar';
import App from './style';
import { AudioProvider } from './hooks/audio';

const Main: React.FC = () => {
  return (
    <AudioProvider>
      <StatusBar style="light"/>
      <App/>
    </AudioProvider>
  );
}

export default Main;