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
    const [playlistInputModalSate, setPlaylistInputModalSate] = useState(false);

    const [addToPlaylist, setAddToPlaylist] = useState({});

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

    function OpenPlaylistOptionModal(item = null) {
        if (item) {
            setSelectedPlaylist(item);
            setPlaylistOptionModalSate(true);
        }
    };

    function ClosePlaylistInputModal() {
        setSelectedPlaylist({});
        setPlaylistInputModalSate(false);
    }

    function OpenPlaylistInputModal(item = null) {
        if (item) {
            setSelectedPlaylist(item);
        }
        else {
            setSelectedPlaylist({});
        }
        setPlaylistInputModalSate(true);
    }
    
    async function DeletePlaylist(id = null) {
        if (id) {
            for (let i = 0; i < playLists.length; i++) {
                if (playLists[i].id == id) {
                    if (playLists[i].id == currentPlayList.id)
                    {
                        LoadNewAudio();
                        setCurrentPlayList(playLists[0]);
                    }                    
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

    async function RenamePlaylist(id = null, new_name = "") {
        if (id) {
            for (let i = 0; i < playLists.length; i++) {
                if (playLists[i].id == id) {
                    playLists[i].name = new_name;
                    break;
                }
            }
        }
    }

    async function PlayPlaylist(playlist = null) {
        if (playlist) {
            setCurrentPlayList(playlist);
            if (Object.keys(playlist).length > 0)
                PlayAudio(playlist.audios[0])
        }
    }

    async function AddToPlaylist(playlist_id = null, audio = null) {
        if (playlist_id && audio) {
            for (let i = 0; i < playLists.length; i++) {
                if (playLists[i].id == playlist_id) {
                    audio.playListId = playLists[i].audios.length + 1;
                    playLists[i].audios.push(audio);
                    break;
                }
            }
        }
    }

    async function RemoveFromPlaylist(playlist_id = null, audio = null) {
        if (playlist_id && audio) {
            for (let i = 0; i < playLists.length; i++) {
                if (playLists[i].id == playlist_id) {
                    for (let j = 0; j < playLists[i].audios.length; j++){
                        if (playLists[i].audios[j].id = audio.id) {
                            playLists[i].audios.splice(j, 1);
                            break;
                        }
                    }         
                }
            }
        }
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
            let status = await currentAudio.getStatusAsync();
            if (status.isLoaded) {
                await currentAudio.stopAsync();
                await currentAudio.unloadAsync();
            }
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

    async function LoadNewAudio(audio = null) {
        if (currentAudio) {
            //console.log("Loading new Audio", audio);
            try {
                let status = await currentAudio.getStatusAsync();
                if (status.isLoaded) {
                    await currentAudio.stopAsync();
                    await currentAudio.unloadAsync();
                }
                if (audio) {
                    await currentAudio.loadAsync({uri: audio.uri}, {shouldPlay: status.isPlaying});
                    status = await currentAudio.getStatusAsync();
                    setPlayBackPosition(0);
                    setPlayBackDuration(status.durationMillis);
                }
                else {
                    setPlayBackPosition(0);
                    setPlayBackDuration(0);
                    setIsPlay(false);
                    setCurrentAudioInfo({});
                }
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
            playlistInputModalSate,
            currentAudioInfo,
            playBackPosition,
            playBackDuration,
            audiosFound,
            isPlay,
            addToPlaylist,
            CloseAudioOptionModal, 
            OpenAudioOptionModal,
            ClosePlaylistOptionModal,
            OpenPlaylistOptionModal,
            ClosePlaylistInputModal,
            OpenPlaylistInputModal,
            PlayAudio,
            NextAudio,
            PrevAudio,
            getPlayBackPosition,
            DeletePlaylist,
            CreatePlaylist,
            RenamePlaylist,
            PlayPlaylist,
            setAddToPlaylist,
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