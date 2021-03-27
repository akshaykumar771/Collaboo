import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ChatScreen from "../screens/ChatScreen";
import ToDoScreen from "../screens/ToDoScreen";
import WorkLogScreen from "../screens/WorkLogScreen";
import CalendarScreen from "../screens/CalendarScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import CraftsmenAppointmentScreen from "../screens/CraftsmenAppointmentScreen";
import ChatConversationScreen from "../screens/ChatConversationScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import CraftsmenCRScreen from "../screens/CraftsmenCRScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "raleway-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "roboto-regular",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "white",
};
const AppointmentsNavigator = createStackNavigator(
  {
    Termine: CraftsmenAppointmentScreen,
    ÄndereAnfrage: CraftsmenCRScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="md-calendar" size={25} color={tabInfo.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const chatNavigator = createStackNavigator(
  {
    Chats: ChatScreen,
    SingleChat: ChatConversationScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="ios-chatbubbles"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
    },
    keyboardHidesNavigationBar: false,
    defaultNavigationOptions: defaultNavOptions,
  }
);
const ToDoNavigator = createStackNavigator(
  {
    Aufgabe: ToDoScreen,
    Kalendar: CalendarScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <FontAwesome5 name="list-alt" size={25} color={tabInfo.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const WorkLogNavigator = createStackNavigator(
  {
    Stundenzettel: WorkLogScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-log-in" size={25} color={tabInfo.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const UserProfileNavigator = createStackNavigator(
  {
    Profil: UserProfileScreen,
    EditProfil: EditProfileScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <FontAwesome
            name="user-circle-o"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const CollabooNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(
        {
          Termine: AppointmentsNavigator,
          Chat: chatNavigator,
          Aufgabe: ToDoNavigator,
          Stundenzettel: WorkLogNavigator,
          Profil: UserProfileNavigator,
        },
        {
          activeTintColor: "white",
          shifting: true,
          barStyle: {
            backgroundColor: Colors.primary,
          },
        }
      )
    : createBottomTabNavigator(
        {
          Termine: AppointmentsNavigator,
          Chat: chatNavigator,
          ToDo: ToDoNavigator,
          WorkLog: WorkLogNavigator,
          Profile: UserProfileNavigator,
        },
        {
          tabBarOptions: {
            activeTintColor: Colors.primary,
            keyboardHidesTabBar: !(Platform.OS === "ios"),
          },
        }
      );

export default CollabooNavigator;
