import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getWidth, secondsToMinutesAndSeconds, normalize } from '../../assets/js/functions';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../assets/js/constants';
import { useAudio } from '../../hooks/audio';
import Slider from '@react-native-community/slider';

const imageUrl = "../../assets/images/temp.png"

export default function Container() {
    const {isPlay, PlayAudio, NextAudio, PrevAudio, currentAudioInfo, playBackPosition,
      playBackDuration, playLoop, randomSequence, togglePlayLoop, toggleRandomSequence} = useAudio();

    const calculateSeekBar = () => {
      if (Object.keys(currentAudioInfo).length > 0) {
        let pos = parseFloat((playBackPosition / playBackDuration * 100));
        return isNaN(pos) ? 0 : pos;
      }
      return 0;
    };

    return (
      <View style={style.container}>
        <View style={style.sliderContainer}>
          <View style={style.sliderLabelContainer}>
            <Text style={style.sliderLabel}>{secondsToMinutesAndSeconds(playBackPosition)}</Text>
            <Text style={style.sliderLabel}>{secondsToMinutesAndSeconds(playBackDuration)}</Text>
          </View>
          <Slider
            style={style.slider}
            maximumValue={playBackDuration}
            minimumValue={0}
            minimumTrackTintColor={Colors.minimumTrackTintColor}
            maximumTrackTintColor={Colors.maximumTrackTintColor}
            step={0.5}
            value={playBackPosition}
            onValueChange={(sliderValue) => null}
          />
        </View>
        
        <View style={style.buttonContainer}>
          <TouchableOpacity onPress={() => togglePlayLoop()} style={style.buttonAction}>
            <Entypo name="loop" size={normalize(17)} color={!playLoop ? Colors.audio_player : Colors.audio_play_active} />
          </TouchableOpacity>

          <View style={style.middleButtonContainer}>
            <TouchableOpacity onPress={() => PrevAudio()} style={style.buttonAction}>
              <AntDesign name="banckward" size={normalize(23)} color={Colors.audio_player}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => PlayAudio()} style={style.buttonActionPrimay}>
              <AntDesign name={isPlay && Object.keys(currentAudioInfo).length > 0 ? "pausecircleo" : "playcircleo"} size={50} color={Colors.audio_player}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => NextAudio()} style={style.buttonAction}>
              <AntDesign name="forward" size={normalize(23)} color={Colors.audio_player}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => toggleRandomSequence()} style={style.buttonAction}>
            <FontAwesome name="random" size={normalize(17)} color={!randomSequence ? Colors.audio_player : Colors.audio_play_active} />
          </TouchableOpacity>
        </View>
      </View>
    );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    //backgroundColor: "orange",
  },
  sliderContainer: {
    width: getWidth() - 40,
    //backgroundColor: "white",
  },
  sliderLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 18,
  },
  sliderLabel: {
    color: Colors.slider_label,
    fontSize: normalize(15),
    //backgroundColor: "blue"
  },
  slider: {
    width: "100%",
  },
  buttonContainer: {
      flexDirection: "row",
      width: getWidth() - normalize(70),
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
  },
  middleButtonContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonActionPrimay: {
    width: normalize(55),
    height: normalize(55),
    borderRadius: normalize(42),
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#F43F30",
  },
  buttonAction: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(33),
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#FE9541",
  },
});