import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ChatScreen from "../screens/ChatScreen";
import CustomerDetailScreen from "../screens/CustomerDetailScreen";
import AddCustomerDetailScreen from "../screens/AddCustomerDetailScreen";
import CustomerRequestScreen from "../screens/CustomerRequestScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ViewAppointmentsScreen from "../screens/ViewApoointmentsScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import ChatConversationScreen from "../screens/ChatConversationScreen";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
      marginTop: Expo.Constants.statusBarHeight
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
    Requests: CustomerRequestScreen,
    ViewAppointments: ViewAppointmentsScreen
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
  },
  );
  chatNavigator.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;
    if (navigation.state.index > 0 && navigation.state.routes[1].routeName === "SingleChat") {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };
  // {
  //   navigationOptions: {
  //     tabBarVisible: false,
  //     tabBarIcon: (tabInfo) => {
  //       return (
  //         <Ionicons
  //           name="ios-chatbubbles"
  //           size={25}
  //           color={tabInfo.tintColor}
  //         />
  //       );
  //     },
  //   },
  //   defaultNavigationOptions: defaultNavOptions,
  // },

  // chatNavigator.navigationOptions = ({ navigation }) => {   
  //   let tabBarVisible = true;   
  //   if (navigation.state.index > 0) {
  //        tabBarVisible = false;   }
  //      return {
  //        tabBarVisible,
  //  };
  // }
const CustomerDetailNavigator = createStackNavigator(
  {
    CustomerDetails: CustomerDetailScreen,
    AddCustomerDetails: AddCustomerDetailScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-people" size={25} color={tabInfo.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const InventoryNavigator = createStackNavigator(
  {
    Inventory: InventoryScreen,
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
          Requests: CustomerRequestNavigator,
          Chat: chatNavigator,
          CustomerDetail: CustomerDetailNavigator,
          Inventory: InventoryNavigator
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
          Requests: CustomerRequestNavigator,
          Chat: chatNavigator,
          CustomerDetail: CustomerDetailNavigator,
          Inventory: InventoryNavigator
        },
        {
          tabBarOptions: {
            activeTintColor: Colors.primary
          },
        }
      );

export default CustomerNavigator;