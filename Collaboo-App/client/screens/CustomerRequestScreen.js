import React, { Component } from "react";
import { View } from "react-native";
import SearchCraftsmen from "../components/SearchCraftsmen";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
export default class CustomerRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents />
        <SearchCraftsmen />
      </View>
    );
  }
}
const MaterialCommunityIconsHeader = (props) => (
  <HeaderButton
    {...props}
    IconComponent={MaterialCommunityIcons}
    iconSize={23}
    color="white"
  />
);

CustomerRequestScreen.navigationOptions = (navData) => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={MaterialCommunityIconsHeader}>
        <Item
          title="TermineAnsehen"
          iconName="history"
          onPress={() => {
            navData.navigation.navigate("TermineAnsehen");
          }}
        />
        <Item
          title="Einladung"
          iconName="calendar-multiple"
          onPress={() => {
            navData.navigation.navigate("Einladung");
          }}
        />
      </HeaderButtons>
    ),
  };
};
