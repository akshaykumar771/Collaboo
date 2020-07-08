import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Colors from "../constants/Colors";
import PickerCheckBox from "react-native-picker-checkbox";
import SelectMultiple from "react-native-select-multiple";
import { ThemeConsumer } from "react-native-elements";
export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isLoading: true,
      check: false,
      dataSource: [],
      isModalOpen: true,
      iosCategories:[],
      iosItems:[]
    };
    this.arrayholder = [];
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
        console.log("Response from categories", responseJson)
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  handleConfirm = (pItems) => {
    const catName = pItems.map((item) => {
      return item.catname;
    });

    this.setState({ categories: catName }, () => {
      this.props.showCategories(this.state.categories);
    });
  };

  onSelectionChange = () => {
    this.state.dataSource.map((item) => {
      const catName = item.catname;
      this.setState({
        iosCategories: catName
      })
    })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else if (Platform.OS === "android") {
      return (
        <PickerCheckBox
          data={this.state.dataSource}
          headerComponent={
            <Text style={{ fontSize: 25 }}>Select your Categories</Text>
          }
          OnConfirm={(pItems) => this.handleConfirm(pItems)}
          ConfirmButtonTitle="OK"
          DescriptionField="catname"
          KeyField="_id"
          placeholder="       Selct your specializations"
          arrowColor="#FFD740"
          arrowSize={10}
          placeholderSelectedItems="       $count categories selected"
        />
      );
    } else if (Platform.OS === "ios") {
      return (
        <View>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            // enableAutomaticScroll={Platform.OS === "ios"}
          >
          <ScrollView>
            <Modal transparent={true} visible={this.state.isModalOpen}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#00000080",
                }}
              >
                <View
                  style={{
                    width: 300,
                    height: 400,
                    backgroundColor: "#fff",
                    paddingVertical: 40,
                    paddingHorizontal: 10,
                  }}
                >
                  <MaterialIcons
                    style={styles.modalCloseIcon}
                    name="close"
                    size={24}
                    onPress={() => this.closeModal()}
                  />
                  <Text style={styles.modalHeader}>Categories</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      marginVertical: 60,
                    }}
                  >
                    <SelectMultiple
                      items={this.state.iosItems}
                      selectedItems={this.state.iosCategories}
                      onSelectionsChange={() => this.onSelectionChange()} />
                    
                    <TouchableOpacity
                      style={styles.requestButton}
                      underlayColor="#fff"
                      // onPress={this.handleRequestAppointment}
                    >
                      <Text style={styles.buttonText}>Log Work</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            </ScrollView>
          </KeyboardAwareScrollView> 
        </View>
      );
    }
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
  requestButton: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
