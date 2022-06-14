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
    const [audioOptionModalSate, setAudioOptionModalState] = useState(false);

    const [currentPlayList, setCurrentPlayList] = useState({});
    const [playLists, setPlaylists] = useState([{}]);
    const [selectedPlaylist, setSelectedPlaylist] = useState({});
    const [playlistOptionModalSate, setPlaylistOptionModalSate] = useState(false);

    const [isPlay, setIsPlay] = useState(true);
    const [autoPlay, setAutoPlay] = useState(true);
    const [audiosFound, setAudiosFound] = useState(0);
    
    function CloseAudioOptionModal() {
        setAudioOptionModalState(false);
    };

    function OpenAudioOptionModal(item = {}) {
        if (item) {
            setSelectedAudio(item);
            setAudioOptionModalState(true);
        }
    };

    function ClosePlaylistOptionModal() {
        setPlaylistOptionModalSate(false);
    }

    function OpenPlaylistOptionModal(item = {}) {
        if (item) {
            setSelectedPlaylist(item);
            setPlaylistOptionModalSate(true);
        }
    };

    async function DeletePlaylist(id = null) {
        if (id) {
            for (let i = 0; i < playLists.length; i++) {
                if (playLists[i].id == id) {
                    playLists.splice(i, 1);
                    break;
                }
            }
        }
    }

    async function CreatePlaylist(name = "") {
        let new_playlist = {id: playLists.length + 1, name: name, audios: []}
        playLists.push(new_playlist);
        setPlaylists(playLists);
    }

    async function NextAudio() {
        let audios = currentPlayList.audios;
        let nextAudio = currentAudioInfo.playListId == audios.length - 1 ? audios.slice(0)[0] : audios.slice(currentAudioInfo.playListId + 1)[0];;
        setCurrentAudioInfo(nextAudio);

        if (currentAudio) {
            LoadNewAudio(nextAudio);
        }
        else {
            PlayAudio(nextAudio);
        }
    };

    async function PrevAudio() {
        let audios = currentPlayList.audios;
        if (currentAudio) {
            setCurrentAudioInfo(audios.slice(currentAudioInfo.playListId - 1)[0]);
            LoadNewAudio(audios.slice(currentAudioInfo.playListId - 1)[0]);
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
           
           let audiosFound = {id: 0, name: "Audios", audios: result};
           let favoritos = {id: 1, name: "Favoritos", audios: result};
           setCurrentPlayList(audiosFound);
           setAudiosFound(result.length);
           let temp = [audiosFound];

           temp.push(favoritos);
           setPlaylists(temp);
        };

        loadAudio();
    }, []);

    return (
        <AudioContext.Provider value={{
            currentPlayList, 
            playLists,
            selectedAudio,
            selectedPlaylist,
            audioOptionModalSate,
            playlistOptionModalSate,
            currentAudioInfo,
            playBackPosition,
            playBackDuration,
            audiosFound,
            isPlay,
            CloseAudioOptionModal, 
            OpenAudioOptionModal,
            ClosePlaylistOptionModal,
            OpenPlaylistOptionModal,
            PlayAudio,
            NextAudio,
            PrevAudio,
            getPlayBackPosition,
            DeletePlaylist,
            CreatePlaylist,
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