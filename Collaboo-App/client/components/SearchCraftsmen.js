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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Form, Input, Item, Label, Textarea, Picker, Icon } from "native-base";
import { SearchBar, ListItem } from "react-native-elements";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";


//import SearchList from "./SearchList";
export default class SearchCraftsmen extends Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = {
      isLoading: true,
      isModalOpen: false,
      title: "",
      description: "",
      search: "",
      id: "",
      role: "",
      selectedValue: "",
    };
    this.arrayholder = [];
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/search/craftsmen_agent";
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
      console.log("itemdata", item);
      const fNameData = item.fname
        ? item.fname.toUpperCase()
        : "".toUpperCase();
      const lNameData = item.lname
        ? item.lname.toUpperCase()
        : "".toUpperCase();
      //const companyName = item.compid.compname
      const companyData =
        item && item.compid
          ? item.compid.compname.toUpperCase()
          : "".toUpperCase();
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

  openModal = (item) => {
    //console.log("yyyyy", item.compid.categories)
    this.setState({
      isModalOpen: true,
      selectedCats: item.compid.categories,
      id: item._id,
      role: item.role,
    });
    //console.log("whatttt", this.state)
  };

  closeModal() {
    this.setState({ isModalOpen: false });
  }
  showPicker = (category) => {
    this.setState({
      categoryValues: category && category,
    });
  };
  handleChange = (value) => {
    this.setState({ selectedValue: value, categoryValues: value });
  };
  handleRequestAppointment = () => {
    const categoryId = this.state.selectedCats.map(
      (item) => {
        return item._id;
      },
      () => {
        this.setState({ categoryId });
        console.log("coming", this.state.categoryId);
      }
    );

    const url =
      // Platform.OS === "android"
      //   ? "http://10.0.2.2:3000/craftsmen"
      //   : "http://192.168.0.213:3000/craftsmen";
      `http://81.89.193.99:3001/api/customer/register?=${this.state}/requestappointment`;
    const data = {
      title: this.state.title,
      description: this.state.description,
      role: this.state.role,
      id: this.state.id,
      service: this.state.categories,
    };
    console.log("data", JSON.stringify(data));
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //console.log("backend response",JSON.stringify(response))
        if (response) {
          Alert.alert("Successful", "Appointment Requested", [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => this.props.navigation.navigate("Customer"),
            },
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: "90%",
          backgroundColor: "#080808",
        }}
      />
    );
  };
  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  render() {
    //const value = useContext(UserContext);

    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              enableAutomaticScroll={Platform.OS === "ios"}
            >
              <View style={styles.viewStyle}>
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
                    {/* {this.state.craftsmenData.map((item)=>{console.log("22", item)})} */}
                    <View
                      style={{
                        width: 300,
                        height: 550,
                        backgroundColor: "#fff",
                        paddingVertical: 40,
                        paddingHorizontal: 10,
                      }}
                    >
                      {/* {this.state.dataSource.filter((item) => {
                console.log("filterrr",item._id !== this.state.id)
              })} */}
                      <MaterialIcons
                        style={styles.modalCloseIcon}
                        name="close"
                        size={24}
                        onPress={() => this.closeModal()}
                      />
                      <Text style={styles.modalHeader}>Give your Request</Text>
                      <Form>
                        <Item>
                          <Icon active name="ios-people" />
                          <Picker
                            selectedValue={this.state.selectedValue}
                            onValueChange={(value) => {
                              this.handleChange(value);
                            }}
                          >
                            {this.state.selectedCats &&
                            this.state.selectedCats.length
                              ? this.state.selectedCats.map((item, myIndex) => {
                                  return (
                                    <Picker.Item
                                      label={item.catname}
                                      value={myIndex}
                                      key={myIndex}
                                    />
                                  );
                                })
                              : null}
                          </Picker>
                        </Item>
                        {/* {console.log("ok",this.state)} */}
                        <Item stackedLabel>
                          <Label style={{ paddingVertical: 20 }}>Title</Label>
                          <Input
                            placeholder="Write your problem here"
                            value={this.state.title}
                            onChangeText={(title) => this.setState({ title })}
                          />
                        </Item>
                        <Item stackedLabel style={{ paddingVertical: 20 }}>
                          <Label style={{ paddingVertical: 10 }}>
                            Description
                          </Label>
                          <Textarea
                            value={this.state.description}
                            rowSpan={7}
                            bordered
                            placeholder="Enter your description"
                            width="100%"
                            borderColor={"grey"}
                            onChangeText={(description) =>
                              this.setState({ description })
                            }
                            style={{ padding: 10 }}
                          />
                        </Item>
                      </Form>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          marginVertical: 60,
                        }}
                      >
                        <TouchableOpacity
                          style={styles.requestButton}
                          underlayColor="#fff"
                          onPress={this.handleRequestAppointment}
                        >
                          <Text style={styles.buttonText}>
                            Request Appointment
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                <FlatList
                  data={this.state.dataSource}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  ListFooterComponent={this.renderFooter}
                  //Item Separator View
                  renderItem={({ item, index }) => (
                    // Single Comes here which will be repeatative for the FlatListItems
                    //<Text style={styles.textStyle}>{item.name}</Text>
                    <ListItem
                      id={index}
                      title={item.fname + item.lname}
                      subtitle={item.email}
                      containerStyle={{ borderBottomWidth: 0 }}
                      rightIcon={{ name: "chevron-right" }}
                      onPress={() => this.openModal(item)}
                    />
                  )}
                  enableEmptySections={true}
                  style={{ marginTop: 10 }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </KeyboardAwareScrollView>
      //ListView to show with textinput used as search bar
      // <TouchableWithoutFeedback
      //   onPress={() => {
      //     Keyboard.dismiss();
      //   }}
      // >

      // </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 10 : 0,
  },
  textStyle: {
    padding: 10,
  },
  modalInput: {
    paddingVertical: 20,
    borderBottomColor: Colors.primary,
    backgroundColor: "#ffffff",
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
  buttonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
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
});
