import React, { createContext, useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import GetAudioFiles from "../services/api";

const AudioContext = createContext({});

const AudioProvider: React.FC = ({children}) => {
    const [currentAudio, setCurrentAudio] = useState();
    const [playBackPosition, setPlayBackPosition] = useState();
    const [playBackDuration, setPlayBackDuration] = useState();
    const [currentAudioInfo, setCurrentAudioInfo] = useState({});
    const [selectedAudio, setSelectedAudio] = useState({});
    const [optionModalSate, setOptionModalState] = useState(false);
    const [playList, setPlayList] = useState([{}]);
    const [isPlay, setIsPlay] = useState(true);
    const [autoPlay, setAutoPlay] = useState(true);
    const [audiosFound, setAudiosFound] = useState(0);
    
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
        let nextAudio = currentAudioInfo.playListId == playList.length - 1 ? playList.slice(0)[0] : playList.slice(currentAudioInfo.playListId + 1)[0];;
        setCurrentAudioInfo(nextAudio);

        if (currentAudio) {
            LoadNewAudio(nextAudio);
        }
        else {
            PlayAudio(nextAudio);
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

    const onPlayBackStatusUpdate = (playBackStatus) => {
        if (playBackStatus.isLoaded && playBackStatus.isPlaying)
        {
            setPlayBackPosition(playBackStatus.positionMillis);
            setPlayBackDuration(playBackStatus.durationMillis);
        }
        if (playBackStatus.didJustFinish) {
            if (autoPlay)
                NextAudio();
        }
    }

    async function getPlayBackPosition() {
        if (currentAudio) {
            const status = currentAudio.getStatusAsync();
            if (status.isLoaded)
            {
                let pos = (status.positionMillis / status.durationMillis) * 100;
                console.log(pos, "%");
                return isNaN(pos) ? 0 : pos;
            }      
        }
        return 0;    
    }

    async function Play(source) {
        if (!currentAudio)
        {
            const sound = new Audio.Sound();
            await sound.loadAsync({uri: source}, {shouldPlay: true});
            setCurrentAudio(sound);

            sound.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate);
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
            try {
                let status = await currentAudio.getStatusAsync();
                if (status.isLoaded) {
                    await currentAudio.stopAsync();
                    await currentAudio.unloadAsync();
                }
                await currentAudio.loadAsync({uri: audio.uri}, {shouldPlay: status.isPlaying});
                status = await currentAudio.getStatusAsync();
                setPlayBackPosition(0);
                setPlayBackDuration(status.durationMillis);
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    };

    useEffect(() => {
        async function loadAudio() {
           const result = await GetAudioFiles();
           
           if (!result || result.length == 0) return;
           
           setPlayList(result);
           setAudiosFound(result.length);
        };

        loadAudio();
    }, []);

    return (
        <AudioContext.Provider value={{
            playList, 
            selectedAudio, 
            optionModalSate,
            currentAudioInfo,
            playBackPosition,
            playBackDuration,
            audiosFound,
            isPlay,
            CloseOptionModal, 
            OpenOptionModal,
            PlayAudio,
            NextAudio,
            PrevAudio,
            getPlayBackPosition,
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