import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Audio } from "expo-av";
import GetAudioFiles from "../services/api";

const AudioContext = createContext({});

const AudioProvider: React.FC = ({children}) => {
    
    const [currentAudio, setCurrentAudio] = useState();
    const [playBackPosition, setPlayBackPosition] = useState(0);
    const [playBackDuration, setPlayBackDuration] = useState(0);
    const [currentAudioInfo, setCurrentAudioInfo] = useState({});
    const [selectedAudio, setSelectedAudio] = useState({});
    const [audioOptionModalSate, setAudioOptionModalState] = useState(false);

    const [currentPlayList, setCurrentPlayList] = useState({});
    const [playLists, setPlaylists] = useState([{}]);
    const [selectedPlaylist, setSelectedPlaylist] = useState({});
    const [playlistOptionModalSate, setPlaylistOptionModalSate] = useState(false);
    const [playlistInputModalSate, setPlaylistInputModalSate] = useState(false);

    const [addToPlaylist, setAddToPlaylist] = useState({});

    const [isPlay, setIsPlay] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const [playLoop, setPlayLoop] = useState(false);
    const [randomSequence, setRandomSequence] = useState(false);
    const [audiosFound, setAudiosFound] = useState(0);
    
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);

    useEffect(() => {
      const timerId = setInterval(() => {
        if (isPlay && currentAudioInfo) {
            if (playBackPosition == playBackDuration) {
                setPlayBackPosition(0);
                if (!playLoop) {
                    setIsPlay(false);
                    if (randomSequence){
                        RandomAudio();
                        //console.log("Playing random audio");
                    }
                    else{
                        NextAudio();   
                        //console.log("Playing next audio") ;     
                    }
                } 
            }
            else {
                setPlayBackPosition(playBackPosition + 1);
            }
        }    
      }, 1000)
      return () => clearInterval(timerId);
    }, [playBackPosition, playBackDuration, isPlay])

    function toggleAutoPlay() {
        setAutoPlay(!autoPlay);
    };

    function togglePlayLoop() {
        if (currentAudio)
            currentAudio.setStatusAsync({ isLooping: !playLoop })
        setPlayLoop(!playLoop);
    };

    function toggleRandomSequence() {
        setRandomSequence(!randomSequence);
    };

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
        console.log(playLists);
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

    function isAudioInPlaylist(playlist, audio_id) {
        let audios = playlist.audios;
        for (let i = 0; i < audios.length; i++) {
            if (audios[i].id == audio_id) {
                return true;
            }
        }
        return false;
    }

    async function AddToPlaylist(playlist_id = null, audio = null) {
        if (playlist_id && audio) {
            for (let i = 0; i < playLists.length; i++) {
                if (playLists[i].id == playlist_id) {
                    audio.playListId = playLists[i].audios.length;
                    if (!isAudioInPlaylist(playLists[i], audio.id))
                    {
                        playLists[i].audios.push(audio);
                        setAddToPlaylist({});
                    }                
                    else {
                        Alert.alert(
                            "Ops!",
                            `${audio.title} já está adicinada à ${playLists[i].name}`,
                            [ // Array Buttons
                              { text: "OK", onPress: () => null }
                            ],                     
                        );
                    }
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
        let nextAudio = currentAudioInfo.playListId == audios.length - 1 ? audios.slice(0)[0] : audios.slice(currentAudioInfo.playListId + 1)[0];
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
        if (currentAudio && Object.keys(currentAudioInfo).length > 0) {
            if (audios.length == 1) return;
            else if (currentAudioInfo.playListId == 0) {
                setCurrentAudioInfo(audios.slice(audios.length - 1)[0]);
                LoadNewAudio(audios.slice(audios.length - 1)[0]);
            }
            else {
                setCurrentAudioInfo(audios.slice(currentAudioInfo.playListId - 1)[0]);
                LoadNewAudio(audios.slice(currentAudioInfo.playListId - 1)[0]);
            }
        }
    };

    async function RandomAudio() {
        let audios = currentPlayList.audios;
        if (currentAudio) {
            let index = Math.floor(Math.random() * audios.length);
            if (currentAudioInfo.playListId != index) {
                setCurrentAudioInfo(audios.slice(index)[0]);
                LoadNewAudio(audios.slice(index)[0]);
            }
            else {
                index += index == audios.length - 1 && index != 0 ? -1 : index != 0 ? 1 : 0;
                setCurrentAudioInfo(audios.slice(index)[0]);
                LoadNewAudio(audios.slice(index)[0]);
            }
        }
    }

    async function PlayAudio(audio = {}) {
        if (Object.keys(audio).length > 0) {
            //console.log("Playing new Audio", audio.title);
            setCurrentAudioInfo(audio);     
            Play(audio);
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

    const onPlayBackStatusUpdate = async (playBackStatus) => {
        if (playBackStatus.isLoaded && playBackStatus.isPlaying)
        {
            setPlayBackPosition(playBackStatus.positionMillis);
            setPlayBackDuration(playBackStatus.durationMillis);
        }
        if (playBackStatus.didJustFinish && !playBackStatus.isLooping) {
            setIsPlay(false);
            if (randomSequence)
            {
                RandomAudio();
                console.log("Random");
            }
            else
                NextAudio();         
        }
    }

    function setPlayBackTime(duration = "") {
        if (duration.trim() !== "") {
            const time = duration.split(".");
            const mins = parseInt(time[0]);
            const secs = parseInt(time[1]);
            
            setPlayBackPosition(0);
            setPlayBackDuration(mins * 60 + secs);
        }
        
    }

    async function Play(audio) {
        if (!currentAudio)
        {
            const sound = new Audio.Sound();
            await sound.loadAsync({uri: audio.uri}, {shouldPlay: autoPlay, isLooping: playLoop});
            setCurrentAudio(sound);

            //sound.setProgressUpdateIntervalAsync(2000);
            //sound.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate);

            setPlayBackTime(audio.duration);
            setIsPlay(true);
        }
        else {
            let status = await currentAudio.getStatusAsync();
            if (status.isLoaded) {
                await currentAudio.stopAsync();
                await currentAudio.unloadAsync();
            }
            await currentAudio.loadAsync({uri: audio.uri}, {shouldPlay: autoPlay, isLooping: playLoop});
            setPlayBackTime(audio.duration);
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
                    await currentAudio.loadAsync({uri: audio.uri}, {shouldPlay: autoPlay, isLooping: playLoop });
                    setPlayBackTime(audio.duration);
                    setIsPlay(true);
                }
                else {
                    setPlayBackTime("0.0");
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
            autoPlay,
            playLoop,
            randomSequence,
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
            DeletePlaylist,
            CreatePlaylist,
            RenamePlaylist,
            PlayPlaylist,
            setAddToPlaylist,
            AddToPlaylist,
            RemoveFromPlaylist,
            toggleAutoPlay,
            togglePlayLoop,
            toggleRandomSequence,
            setPlayLoop,
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