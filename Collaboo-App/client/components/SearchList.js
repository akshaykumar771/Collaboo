import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

export default class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      search: "",
    };
  }
  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

  render() {
      return (
        <View>
        <SearchBar
        lightTheme={true}
        platform="default"
        only
        round
        platform="default"
        only
        searchIcon={{ size: 24 }}
        onChangeText={(text) => this.SearchFilterFunction(text)}
        onClear={(text) => this.SearchFilterFunction("")}
        placeholder="Type Here..."
        value={this.state.search}
      />
      </View>
      )
  }
}

const styles = StyleSheet.create({
});
