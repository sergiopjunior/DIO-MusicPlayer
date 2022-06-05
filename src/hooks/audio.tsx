import React, { createContext, useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import GetAudioFiles from "../services/api";
import { Sound } from "expo-av/build/Audio";

const AudioContext = createContext({});

const AudioProvider: React.FC = ({children}) => {
    const [currentAudio, setCurrentAudio] = useState();
    const [currentAudioInfo, setCurrentAudioInfo] = useState({});
    const [selectedAudio, setSelectedAudio] = useState({});
    const [optionModalSate, setOptionModalState] = useState(false);
    const [playList, setPlayList] = useState([{}]);
    const [isPlay, setIsPlay] = useState(true);
    
    function CloseOptionModal() {
        setOptionModalState(false);
    };

    function OpenOptionModal(item = {}) {
        if (item) {
            setSelectedAudio(item);
            setOptionModalState(true);
        }
    };

    async function PlayAudio(audio = {}) {
        if (Object.keys(audio).length > 0) {
            //console.log("Playing new Audio", audio.title);
            setCurrentAudioInfo(audio);     
            Play(audio.uri);
        }
        else if (currentAudio) {
            const status = await currentAudio.getStatusAsync();
            if (status.isPlaying){
                //console.log("Pause Áudio", currentAudioInfo);
                Pause()     
            }
            else if (status.isLoaded) {     
                //console.log("Resume Audio", currentAudioInfo.title);
                Resume();  
            } 
        }
        else {   
            console.log("Nenhum áudio selecionado");
        }
    }

    async function Play(source) {
        if (!currentAudio)
        {
            const sound = new Audio.Sound();
            await sound.loadAsync({uri: source}, {shouldPlay: true});
            setCurrentAudio(sound);
            setIsPlay(true);
        }
        else {
            currentAudio.unloadAsync();
            await currentAudio.loadAsync({uri: source}, {shouldPlay: true});
        }
        setIsPlay(true);
    };

    async function Resume() {
        await currentAudio.setStatusAsync({shouldPlay: true});
        setIsPlay(true);
    }

    async function Pause() {
        await currentAudio.setStatusAsync({shouldPlay: false}); 
        setIsPlay(false);
    };

    useEffect(() => {
        async function loadAudio() {
           const result = await GetAudioFiles();
           
           if (!result || result.length == 0) return;
           
           setPlayList(result);
        };

        loadAudio();
    }, []);

    return (
        <AudioContext.Provider value={{currentAudio, 
            playList, 
            selectedAudio, 
            optionModalSate,
            currentAudioInfo, 
            isPlay,
            CloseOptionModal, 
            OpenOptionModal,
            PlayAudio,
            }}
        >{children}</AudioContext.Provider>
    );
};

const useAudio = () => {
    const context = useContext(AudioContext);

    if(!context) throw new Error("Context empty");
    return context;
};

export { AudioProvider, useAudio };