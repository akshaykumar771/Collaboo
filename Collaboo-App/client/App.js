console.ignoredYellowBox = ["Remote debugger"];
import { YellowBox, Alert } from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
]);
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, AsyncStorage, Vibration, Platform } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import AppNavigation from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { setNavigator } from "./navigationRef";
import { store } from "./Store";
// import * as Permissions from 'expo-permissions';
import { Notifications } from "expo";
// import Constants from 'expo-constants'
// import registerForPushNotificationsAsync from "./services/push_notifications"

// const registerForPushNotificationsAsync = async () => {
//   let previousToken = await  AsyncStorage.getItem('pushtoken');
//   if(previousToken){
//     return;
//   }
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync();
//     AsyncStorage.setItem('pushtoken', token)
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.createChannelAndroidAsync('default', {
//       name: 'default',
//       sound: true,
//       priority: 'max',
//       vibrate: [0, 250, 250, 250],
//     });
//   }
// };
const fetchFont = () => {
  return Font.loadAsync({
    "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
    ralewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    robotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Regular.ttf"),
  });
};
export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    Notifications.addListener((notification) => {
      console.log("notification", notification);
      Vibration.vibrate();
      const {
        data: { message },
        origin,
      } = notification;
      // if(origin === "selected"){
      //   console.log(data)
        // if(message === "New appointment requested!")
        // navigation.navigate("Appointments",{message})
      //}
      if (origin === "received")
        Alert.alert("New Push Notification", message, [{ text: "OK" }]);
    
      
    });
      
  }, []);

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
// import React, { Component } from 'react'
// import { StyleSheet, ActivityIndicator, View } from "react-native";
// import AppNavigation from "./navigation/AppNavigator";
// import { Provider } from "react-redux";
// import registerForNotifications from "./services/push_notifications"
// import { setNavigator } from "./navigationRef";
// import { store } from "./Store";
// import * as Font from 'expo-font';
// class App extends Component {
//       constructor(props) {
//         super(props);

//         this.state = {
//           fontLoaded: false,
//         };
//       }
//    async componentDidMount() {
//      await Font.loadAsync({
//       "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
//       ralewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
//       "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
//       robotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
//       Roboto_medium: require("./assets/fonts/Roboto-Regular.ttf"),
//     });
//      this.setState({ loading: true })
//      await registerForNotifications()
//    }
//       render() {
//         // const [fontLoaded, setFontLoaded] = useState(false);
//         if (this.state.fontLoaded) {

//             return (
//               <View style={{ flex: 1, paddingTop: 20 }}>
//                 <ActivityIndicator />
//               </View>
//             );

//         }
//         return (
//           <Provider store={store}>
//             <AppNavigation
//               ref={(navigator) => {
//                 setNavigator(navigator);
//               }}
//             />
//           </Provider>
//         );
//       }
//     }

//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//       },
//     });

//     export default App;
