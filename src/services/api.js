import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { secondsToMinutesAndSeconds } from '../assets/js/functions';

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
    
    const filterFileName = (str) => {
      let spl = str.split('.');
      let name = str.replace("." + spl.slice(-1), "")
      let format = spl.slice(-1).join("");
      return {name: name, format: format};
		};

    for (let i = 0; i < files.totalCount; i++) {
        let date = new Date(files.assets[i]["modificationTime"]);
        let datestring = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        let temp = filterFileName(files.assets[i]["filename"]);

        data.push({
            playListId: i,
            id: files.assets[i]["id"],
            title: temp.name,
            date: datestring,
            duration: secondsToMinutesAndSeconds(Math.floor(files.assets[i]["duration"])),
            format: temp.format,
            uri: files.assets[i]["uri"],
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