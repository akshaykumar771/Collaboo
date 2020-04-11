import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import CollabooNavigator from './navigation/CollabooNavigator';
import SignUpScreen from './screens/SignUpScreen';

const fetchFont = () =>{
  return Font.loadAsync({
    'raleway-bold':require("./assets/fonts/Raleway-Bold.ttf"),
    'ralewayBold':require("./assets/fonts/Raleway-Bold.ttf"),
    'roboto-regular':require("./assets/fonts/Roboto-Regular.ttf"),
    'robotoRegular':require("./assets/fonts/Roboto-Regular.ttf"),
    'Roboto_medium':require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const[fontLoaded, setFontLoaded]= useState(false);
  if(!fontLoaded){
    return <AppLoading startAsync={fetchFont} onFinish={() =>setFontLoaded(true)} onError={(err) => {console.log(err)}}/>
  }
  return <CollabooNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
