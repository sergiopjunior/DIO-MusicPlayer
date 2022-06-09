import React, { createContext, useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import GetAudioFiles from "../services/api";

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

    async function NextAudio() {
        if (currentAudio) {
            if (currentAudioInfo.playListId == playList.length - 1){
                setCurrentAudioInfo(playList.slice(0)[0]);
                LoadNewAudio(playList.slice(0)[0]);
            }
            else {
                setCurrentAudioInfo(playList.slice(currentAudioInfo.playListId + 1)[0]);
                LoadNewAudio(playList.slice(currentAudioInfo.playListId + 1)[0]);
            }
        }
    };

    async function PrevAudio() {
        if (currentAudio) {
            setCurrentAudioInfo(playList.slice(currentAudioInfo.playListId - 1)[0]);
            LoadNewAudio(playList.slice(currentAudioInfo.playListId - 1)[0]);
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
            await currentAudio.stopAsync();
            await currentAudio.unloadAsync();
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

    async function LoadNewAudio(audio) {
        if (currentAudio) {
            //console.log("Loading new Audio", audio);
            const status = await currentAudio.getStatusAsync();
            await currentAudio.stopAsync();
            await currentAudio.unloadAsync();
            await currentAudio.loadAsync({uri: audio.uri}, {shouldPlay: status.isPlaying});
        }
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
            NextAudio,
            PrevAudio,
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