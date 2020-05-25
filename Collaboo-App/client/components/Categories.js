import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Modal,
  Button,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ListView,
  CheckBox,
} from "react-native";
import {
  Form,
  Input,
  Item,
  Label,
  Textarea,
  Icon,
  Container,
  Content,
  ListItem,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import PickerCheckBox from "react-native-picker-checkbox";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isLoading: true,
      check: false,
      dataSource: [],
    };
  }
  componentDidMount() {
    //First method to be called after components mount
    //fetch the data from the server for the suggestion
    return fetch("http://81.89.193.99:3001/api/category", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {
            // In this block you can do something with new state.
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleConfirm = (pItems) => {
    const catName = pItems.map((item) => {
      return item.catname
    })
    
    this.setState({ categories: catName }, ()=> {this.props.showCategories(this.state.categories)});
    
    // const data = this.state.categories.filter((item) => item.catname);
    // console.log("123", data);
    //console.log("outside",this.state.categories)

  };

  render() {
    // const items = [
    //   {
    //     id: 1,
    //     catname: "Dishwasher"
    //   },
    //   {
    //     id: 2,
    //     catname: "Washing Machine"
    //   },
    //   {
    //     id: 3,
    //     catname: "Heating"
    //   },
    //   {
    //     id: 4,
    //     catname: "Plumbing"
    //   }
    // ]
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <PickerCheckBox
        data={this.state.dataSource}
        headerComponent={<Text style={{ fontSize: 25 }}>Select your Categories</Text>}
        OnConfirm={(pItems) => this.handleConfirm(pItems)}
        ConfirmButtonTitle="OK"
        DescriptionField="catname"
        KeyField="_id"
        placeholder="       Selct your specializations"
        arrowColor="#FFD740"
        arrowSize={10}
        placeholderSelectedItems="$count categories selected"
      />
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    marginLeft: 50,
  },
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 10 : 0,
  },
  modalHeader: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  modalCloseIcon: {
    position: "absolute",
    right: 5,
    top: 5,
    color: Colors.primary,
  },
  requestButton: {
    marginRight: 40,
    marginLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: -35,
    position: "relative",
    borderWidth: 1,
    borderColor: "#fff",
  },
  selfEmployed: {
    marginTop: 20,
    marginLeft: 10,
  },
});
