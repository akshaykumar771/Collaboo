import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";
import ToDoTabs from "../screens/ToDoTabs";
class ToDoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
  }

  render() {
    return (
      <View style={styles.screen}>
        <ToDoTabs />
        <Text>To Do Screen</Text>
      </View>
    );
  }
}

renderAddToDo = () => {
  this.setState({
    showComponent: true
  });
};

ToDoScreen.navigationOptions = navData => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add ToDo"
          iconName="ios-add"
          onPress={() => {
            navData.navigation.navigate("AddToDo");
          }}
        />
        <Item
          title="Calendar"
          iconName="ios-calendar"
          onPress={() => {
            navData.navigation.navigate("Calendar");
          }}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ToDoScreen;
