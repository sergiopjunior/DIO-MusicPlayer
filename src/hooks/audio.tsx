import React, { createContext, useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import GetAudioFiles from "../services/api";

const AudioContext = createContext({});

const AudioProvider: React.FC = ({children}) => {
    const [currentAudio, setCurrentAudio] = useState();
    const [currentAudioInfo, setCurrentAudioInfo] = useState();
    const [selectedAudio, setSelectedAudio] = useState({});
    const [optionModalSate, setOptionModalState] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [playList, setPlayList] = useState([{}]);
    
    function CloseOptionModal() {
        setOptionModalState(false);
    };

    function OpenOptionModal(item = {}) {
        if (item) {
            setSelectedAudio(item);
            setOptionModalState(true);
        }
    }

    //console.log(selectedAudio);
    const PlaySong = async (source, autoPlay = false) => {
        if (currentAudio) {
            
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
            CloseOptionModal, 
            OpenOptionModal}}
            >{children}</AudioContext.Provider>
    );
};

const useAudio = () => {
    const context = useContext(AudioContext);

    if(!context) throw new Error("Context empty");
    return context;
};

export { AudioProvider, useAudio };