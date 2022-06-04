import React, { createContext, useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import GetAudioFiles from "../services/api";

const AudioContext = createContext({});

const AudioProvider: React.FC = ({children}) => {
    const [currentAudio, setCurrentAudio] = useState();
    const [currentAudioInfo, setCurrentAudioInfo] = useState();
    const [isPlay, setIsPlay] = useState(false);
    const [playList, setPlayList] = useState([{}]);

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
        <AudioContext.Provider value={{currentAudio, playList}}>{children}</AudioContext.Provider>
    );
};

const useAudio = () => {
    const context = useContext(AudioContext);

    if(!context) throw new Error("Context empty");
    return context;
};

export { AudioProvider, useAudio };