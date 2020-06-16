console.ignoredYellowBox = ["Remote debugger"];
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);
import React, { useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import AppNavigation from "./navigation/AppNavigator";
//import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { setNavigator } from './navigationRef';
//import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSocketIoMiddleware from "redux-socket.io";
import userReducer from "./reducers/userReducer";
import chatReducer from "./reducers/chatReducer";
import reducer from "./reducers/userReducer";
//const socket = io("http://81.89.193.99:3001");

const rootReducer = combineReducers({
  auth: userReducer,
  chat: chatReducer
});
//const store = createStore(rootReducer, applyMiddleware(ReduxThunk, createSocketIoMiddleware));

const store = createStore(reducer, applyMiddleware(ReduxThunk));
let token = null;
store.subscribe(() => {
  token = store.getState().token;
  console.log("new state", token);
});
//const uri = encodeURI(`http://81.89.193.99:3001/chat?token=${userToken}`)
//  const socket = io.connect('http://81.89.193.99:3001/chat', {
//   query: {token: token}
//  })
//const socketIoMiddleware = createSocketIoMiddleware(socket, "chat:");
const fetchFont = () => {
  return Font.loadAsync({ 
    "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
    ralewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    robotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigation ref = {(navigator) => {setNavigator(navigator)}} {...store}/>
    </Provider>
  );
}
/**
 *  <Provider store={store}>
      <App />
    </Provider>
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
