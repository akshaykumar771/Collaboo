import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Vibration,
  Alert,
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
    // registerForPushNotificationsAsync()
    //   .then((token) => {
    //     console.log("startup pushtoken", token)
    //     return token;
    //   })
    //   .then((pushToken) => {
    //     tryLogin();
    //   })
    //   .catch((e) => console.log("error push", e));
    //console.log("testnoti", testNotification);
    // const tryNotifications = async () => {
    //   Notifications.addListener((notification) => {
    //     console.log("notification", notification);
    //     Vibration.vibrate();
    //     const {
    //       data: { message },
    //       origin,
    //     } = notification;
        // if (origin === "selected") {
        //   if (
        //     message === "New appointment requested!" ||
        //     "Craftsmen has accepted the appointment" ||
        //     "Craftsmen has rejected the appointment. Assign new craftsmen"
        //   )
        //     console.log("check notifications");
        //   props.navigation.navigate("Appointments", { message });
        // } 
        // else if (message === "New craftsmen has been assigned.Your request has been accepted.")
        // {
        //   console.log("customer")
        //   props.navigation.navigate("Requests", {message})
        // }
        // else if (message === "You have received a new appointment request") {
        //   console.log("cr appnts");
        //   props.navigation.navigate("CRAppointments", { message });
        // }
    //       if (origin === "received")
    //         Alert.alert("New Push Notification", message, [{ text: "OK" }]);
    //   });
    // };
    // tryNotifications();
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
    tryLogin();
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
