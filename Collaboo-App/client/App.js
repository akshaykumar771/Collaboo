console.ignoredYellowBox = ["Remote debugger"];
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
]);
import React, { useState, useEffect } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import AppNavigation from "./navigation/AppNavigator";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { setNavigator } from "./navigationRef";
import ReduxThunk from "redux-thunk";
import createSocketIoMiddleware from "redux-socket.io";
import { userReducer } from "./reducers/userReducer";
import { chatReducer } from "./reducers/chatReducer";

// const socket = io("http://81.89.193.99:3001");
// c


// let currentValue = store.getState().userReducer.token;
//
// console.log("CuurentValue", currentValue);
//
const fetchFont = () => {
  return Font.loadAsync({
    "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
    ralewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    robotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Regular.ttf"),
  });
};
const store = createStore(
  combineReducers({ userReducer, chatReducer }),
  applyMiddleware(ReduxThunk, socketIoMiddleware)
);
export default function App() {
  useEffect(async() => {
      const userData = await AsyncStorage.getItem("token");
      const transformedData = JSON.parse(userData);
      const { token, userId, userRole } = transformedData;
      console.log("App", transformedData);
      const socket = io.connect("http://81.89.193.99:3001/chat", {
        query: { token: token },
      });
      const socketIoMiddleware = createSocketIoMiddleware(socket, "chat:");
  }, []);
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
      <AppNavigation
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// console.ignoredYellowBox = ["Remote debugger"];
// import { YellowBox } from "react-native";
// YellowBox.ignoreWarnings([
//   "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
// ]);
// import React, { Component } from "react";
// import { StyleSheet, Text, View, AsyncStorage } from "react-native";
// import * as Font from "expo-font";
// import { AppLoading } from "expo";
// import AppNavigation from "./navigation/AppNavigator";
// import { setNavigator } from "./navigationRef";
// import {userReducer} from "./reducers/userReducer";
// import {chatReducer} from "./reducers/chatReducer";
// //import  {store}  from "./Store";
// import { Provider, connect } from "react-redux";
// import { createStore, applyMiddleware, combineReducers } from "redux";
// import ReduxThunk from 'redux-thunk';
// import createSocketIoMiddleware from "redux-socket.io";
// import io from "socket.io-client";

// // const store = createStore(combineReducers({userReducer, chatReducer}), applyMiddleware(ReduxThunk));
// // store.subscribe(() => {
// //       token = store.getState().userReducer.token;
// //       console.log("new state", token);
// //     });

// class App extends Component {
//   constructor(props) {
//     super(props);
//    const token = store.getState().userReducer.token;
//     console.log("Testing: ", token)
//    const socket = io.connect('http://81.89.193.99:3001/chat', {
//   query: {token: token} })
//     this.state = {
//       fontLoaded: false
//     };
//   }

//   render() {
//     const fetchFont = () => {
//       return Font.loadAsync({
//         "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
//         ralewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
//         "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
//         robotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
//         Roboto_medium: require("./assets/fonts/Roboto-Regular.ttf"),
//       });
//     };

//     // const [fontLoaded, setFontLoaded] = useState(false);
//     if (!this.state.fontLoaded) {
//       return (
//         <AppLoading
//           startAsync={fetchFont}
//           onFinish={() => this.setState({ fontLoaded: true })}
//           onError={(err) => {
//             console.log(err);
//           }}
//         />
//       );
//     }
//     return (
//       <Provider store={store}>
//         <AppNavigation
//           ref={(navigator) => {
//             setNavigator(navigator);
//           }}
//         />
//       </Provider>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   token: state.userReducer.token,
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default App;
