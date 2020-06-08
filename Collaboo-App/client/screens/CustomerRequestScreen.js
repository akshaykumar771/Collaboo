import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, TextInput } from "react-native";
import SearchCraftsmen from "../components/SearchCraftsmen";
import { HeaderButton,HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default class CustomerRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  toggleDrawer = () =>{

  }
  render() {
    return( 
    <View style = {{flex: 1}}>
    <SearchCraftsmen />
    </View>
    );
  }
}
const MaterialCommunityIconsHeader = (props) => (
  <HeaderButton {...props} IconComponent={MaterialCommunityIcons} iconSize={23} color="white" />
);

CustomerRequestScreen.navigationOptions = navData => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={MaterialCommunityIconsHeader}>
        <Item
          title="View Appointments"
          iconName="history"
          onPress={() => {
            navData.navigation.navigate("ViewAppointments");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={MaterialCommunityIconsHeader}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});
