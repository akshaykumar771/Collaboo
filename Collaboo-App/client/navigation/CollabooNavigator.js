import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ChatScreen from "../screens/ChatScreen";
import ToDoScreen from "../screens/ToDoScreen";
import WorkLogScreen from "../screens/WorkLogScreen";
import CalendarScreen from "../screens/CalendarScreen";
import AddToDoScreen from "../screens/AddToDoScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import CraftsmenAppointmentScreen from "../screens/CraftsmenAppointmentScreen";
import ChatConversationScreen from "../screens/ChatConversationScreen";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
    marginTop: Expo.Constants.statusBarHeight,
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
    Appointments: CraftsmenAppointmentScreen,
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

const CollabooNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(
        {
          Appointments: AppointmentsNavigator,
          Chat: chatNavigator,
          ToDo: ToDoNavigator,
          WorkLog: WorkLogNavigator,
          Profile: UserProfileNavigator,
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
          Appointments: AppointmentsNavigator,
          Chat: chatNavigator,
          ToDo: ToDoNavigator,
          WorkLog: WorkLogNavigator,
          Profile: UserProfileNavigator,
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
export default CollabooNavigator;
