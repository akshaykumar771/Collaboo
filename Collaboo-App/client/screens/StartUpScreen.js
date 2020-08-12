import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch, connect, useSelector } from "react-redux";
import * as authActions from "../actions/action";
import userReducer from "../reducers/userReducer";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import io from "socket.io-client";
import { registerForPushNotificationsAsync } from "../services/push_notifications";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {return token})
      .then((pushToken) => {
        tryLogin();
      })
      .catch((e) => console.log("error push", e));
    //console.log("testnoti", testNotification);
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("token");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, userRole } = transformedData;
      console.log("transformedData", transformedData);
      const socket = await io.connect("http://81.89.193.99:3001/chat", {
        query: { token: token },
      });

      //console.log("socker sconnection", socket);
      console.log("startupscreen", transformedData);
      if (!token || !userId || !userRole) {
        props.navigation.navigate("Auth");
        return;
      }
      if (userRole === "CUSTOMER") {
        props.navigation.navigate("Customer");
      } else if (userRole === "CRAFTSMEN") {
        props.navigation.navigate("App");
      } else if (userRole === "AGENT") {
        props.navigation.navigate("Agent");
      }
      dispatch(authActions.authenticate(token, userId, userRole));
      dispatch(authActions.socket(socket));
    };
    
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartUpScreen;
