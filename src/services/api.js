import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import * as MediaLibrary from 'expo-media-library';

function permissionAlert() {
    Alert("Permissão requerida", "Esse app precisa de permissão para ler arquivos de áudio!", [
        { text: "Ok", onPress: getPermission() },
        { text: "Cancel", onPress:  permissionAlert()}
      ]);
}

const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    
    if (!permission.granted && permission.canAskAgain) {
        const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'denied' && canAskAgain) {
          // display some allert or request again to read media files.
          getPermission();
        }
  
        if (status === 'denied' && !canAskAgain) {
          // we want to display some error to the user
          permissionAlert();
        }
      }

    return (permission.status === "granted");
  };

async function generateData(files) {
    let data = [];

    for (let i = 0; i < files.totalCount; i++) {
        // console.log(files.assets[i]["id"], files.assets[i]["filename"], files.assets[i]["modificationTime"]);
        var date = new Date(files.assets[i]["modificationTime"]);
        var datestring = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        data.push({
            id: files.assets[i]["id"],
            title: files.assets[i]["filename"],
            date: datestring
        })
    }

    return data;
}

const getFiles = async () => {
    /*
    Object {
        "assets": Array [
          Object {
            "albumId": "82896267",
            "creationTime": 0,
            "duration": 5.82,
            "filename": "audio 4.mp3",     
            "height": 0,
            "id": "5201",
            "mediaType": "audio",
            "modificationTime": 1615998129000,
            "uri": "file:///storage/emulated/0/Music/audio 4.mp3",
            "width": 0,
          },
          ...
        ],
        "endCursor": "4",
        "hasNextPage": false,
        "totalCount": 4,
      }*/
    const media = await MediaLibrary.getAssetsAsync({mediaType: 'audio'});
    return await generateData(media);
};

const GetAudioFiles = async () => {
    const permission = await getPermission();
    if (permission) return await getFiles();

    return null;
};

export default GetAudioFiles;