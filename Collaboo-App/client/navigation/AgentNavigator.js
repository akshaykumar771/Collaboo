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
const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
      //marginTop: Expo.Constants.statusBarHeight
  },
  headerTitleStyle: {
    fontFamily: "raleway-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "roboto-regular",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "white",
};

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
const ToDoNavigator = createStackNavigator(
  {
    ToDo: ToDoScreen,
    AddToDo: AddToDoScreen,
    Calendar: CalendarScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-today" size={25} color={tabInfo.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const AppointmentNavigator = createStackNavigator(
  {
    Appointments: AgentAppointmentScreen
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="md-timer" size={25} color={tabInfo.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)
const WorkLogNavigator = createStackNavigator(
  {
    WorkLog: AgentWorkLogScreen,
    ACWorkLog: ACWorkLogScreen
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="md-timer" size={25} color={tabInfo.tintColor} />;
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const UserProfileNavigator = createStackNavigator(
  {
    Profile: UserProfileScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="md-person" size={25} color={tabInfo.tintColor} />
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
          Appointments: AppointmentNavigator,
          Chat: chatNavigator,
          WorkLog: WorkLogNavigator,
          Profile: UserProfileNavigator
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
          Appointments: AppointmentNavigator,
          Chat: chatNavigator,
          WorkLog: WorkLogNavigator,
          Profile: UserProfileNavigator,
        },
        {
          tabBarOptions: {
            activeTintColor: Colors.primary,
          },
        }
      );


export default AgentNavigator;