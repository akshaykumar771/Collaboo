import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ChatScreen from "../screens/ChatScreen";
import ToDoScreen from "../screens/ToDoScreen";
import WorkLogScreen from "../screens/WorkLogScreen";
import CustomerDetailScreen from "../screens/CustomerDetailScreen";
import CalendarScreen from "../screens/CalendarScreen";
import AddToDoScreen from "../screens/AddToDoScreen";
import AddCustomerDetailScreen from "../screens/AddCustomerDetailScreen";
import CustomerRequestScreen from "../screens/CustomerRequestScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import ChatConversationScreen from "../screens/ChatConversationScreen";
import AgentAppointmentScreen from "../screens/AgentAppointmentScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import AgentWorkLogScreen from "../screens/AgentWorkLogScreen";
import ACWorkLogScreen from "../screens/ACWorkLogScreen";
import { FontAwesome } from "@expo/vector-icons";
import EditProfileScreen from "../screens/EditProfileScreen";
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
const AppointmentNavigator = createStackNavigator(
  {
    Termine: AgentAppointmentScreen,
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
    defaultNavigationOptions: defaultNavOptions,
  }
);

const WorkLogNavigator = createStackNavigator(
  {
    Stundenzettel: AgentWorkLogScreen,
    ACStundenzettel: ACWorkLogScreen,
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

const AgentNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(
        {
          Termine: AppointmentNavigator,
          Chat: chatNavigator,
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
          Termine: AppointmentNavigator,
          Chat: chatNavigator,
          Stundenzettel: WorkLogNavigator,
          Profil: UserProfileNavigator,
        },
        {
          tabBarOptions: {
            activeTintColor: Colors.primary,
          },
        }
      );

export default AgentNavigator;
