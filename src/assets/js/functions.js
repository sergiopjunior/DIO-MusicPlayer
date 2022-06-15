import React, {useState, useEffect} from "react";
import {
    Dimensions, 
    Platform, 
    PixelRatio,
  } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

export function normalize(size){
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

export function getWidth() {
  return Dimensions.get("screen").width;
}

export function getHeight() {
  return Dimensions.get("screen").height;
}

export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds}`;
}

export function secondsToMinutesAndSeconds(seconds) {
  var minutes = Math.floor(seconds / 60);
  var seconds = seconds - minutes * 60;

  return `${minutes}.${seconds}`;
}

export function secondsToMillis(seconds) {
  return seconds * 1000;
}