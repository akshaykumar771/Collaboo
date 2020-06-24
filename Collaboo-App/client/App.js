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
import { Provider } from "react-redux";
import { setNavigator } from "./navigationRef";
import { store } from "./Store";

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
