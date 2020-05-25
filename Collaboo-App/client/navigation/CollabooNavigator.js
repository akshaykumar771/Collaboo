import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SignUpScreen from "../screens/SignUpScreen-old";
import SignInScreen from "../screens/SignInScreen";
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
    Requests: CustomerRequestScreen,
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
const WorkLogNavigator = createStackNavigator(
  {
    WorkLog: WorkLogScreen,
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


const CollabooNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(
        {
          Requests: CustomerRequestNavigator,
          Chat: chatNavigator,
          ToDo: ToDoNavigator,
          WorkLog: WorkLogNavigator,
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
          ToDo: ToDoNavigator,
          WorkLog: WorkLogNavigator,
        },
        {
          tabBarOptions: {
            activeTintColor: Colors.primary,
          },
        }
      );

// const SignedOut = createStackNavigator(
//   {
//   SignIn: SignInScreen,
//   SignUp: SignUpScreen
  
// },
// {
// defaultNavigationOptions: defaultNavOptions,
// }
// );

// const MainNavigator = createSwitchNavigator({
//   Auth: SignedOut,
//   Collaboo: SignedIn,
// });

//export default createAppContainer(MainNavigator);
export default CollabooNavigator