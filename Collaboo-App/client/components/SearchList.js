import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

export default class SearchList extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = {
      isLoading: true,
      isModalOpen: false,
      title: "",
      description: "",
      search: ""
    };
    this.arrayholder = [];
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/search/craftsmen_agent"
      // Platform.OS === "android"
      //   ? "http://10.0.2.2:3000/craftsmen"
      //   : "http://192.168.0.213:3000/craftsmen";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
      console.log("itemdata", item)
      const fNameData = item.fname ? item.fname.toUpperCase() : "".toUpperCase();
      const lNameData = item.lname ? item.lname.toUpperCase() : "".toUpperCase();
      //const companyName = item.compid.compname
      const companyData = item && item.compid ? item.compid.compname.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      const itemData = fNameData + lNameData + companyData;
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
