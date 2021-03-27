import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ChatScreen from "../screens/ChatScreen";
import CustomerRequestScreen from "../screens/CustomerRequestScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ViewAppointmentsScreen from "../screens/ViewAppointmentsScreen";
import ViewInvitationScreen from "../screens/ViewInvitationScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import ChatConversationScreen from "../screens/ChatConversationScreen";
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
const CustomerRequestNavigator = createStackNavigator(
  {
    Anfrage: CustomerRequestScreen,
    TermineAnsehen: ViewAppointmentsScreen,
    Einladung: ViewInvitationScreen,
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
      tabBarVisible: ({ navigation }) => {
        if (navigation.state.routes[1].routeName === "SingleChat") {
          tabBarVisible = false;
        }
        return {
          tabBarVisible,
        };
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
const InventoryNavigator = createStackNavigator(
  {
    Inventar: InventoryScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-folder" size={25} color={tabInfo.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const CustomerNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(
        {
          Anfrage: CustomerRequestNavigator,
          Chat: chatNavigator,
          Inventar: InventoryNavigator,
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
          Anfrage: CustomerRequestNavigator,
          Chat: chatNavigator,
          Inventar: InventoryNavigator,
          Profil: UserProfileNavigator,
        },
        {
          tabBarOptions: {
            activeTintColor: Colors.primary,
          },
        }
      );

export default CustomerNavigator;
