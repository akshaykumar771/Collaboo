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
  Alert,
  Picker
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Form, Input, Item, Label, Textarea, Icon } from "native-base";
import { SearchBar, ListItem } from "react-native-elements";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

//import SearchList from "./SearchList";
class SearchCraftsmen extends Component {
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
  //   setTimeout(() => {
  //     this.makeRemoteRequest();
  //   }, 3000);
  // }
  if(this.props.token){
    this.makeRemoteRequest()
  }
}
  // componentWillReceiveProps(nextProps) {
  //  if(this.props.token != nextProps.token)
  //   this.makeRemoteRequest();
  // }
  makeRemoteRequest = () => {
    //console.log("searchCraftsmen", this.props.token);
    const url = "http://81.89.193.99:3001/api/user/search/craftsmen_agent/";
    const bearer = "Bearer " + this.props.token;
    //console.log("bearer", bearer);
    // Platform.OS === "android"
    //   ? "http://10.0.2.2:3000/craftsmen"
    //   : "http://192.168.0.213:3000/craftsmen";
    fetch(url, {
      method: "GET",
      // withCredentials: false,
      // credentials: "include",
      headers: { Authorization: bearer },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("search craftsmen", responseJson)
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

  requestAppointment = () => {
    const url = "http://81.89.193.99:3001/api/customer/requestappointment";
    const bearer = "Bearer " + this.props.token;
    //console.log("bearer", bearer);
    const data = {
      crafAgentId: this.state.id,
      categoryId: this.state.selectedValue,
      title:this.state.title,
      description:this.state.description
    };
    console.log("request appointment", data)
    fetch(url, {
      method: "POST",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then((response) => {
      const status = response.status;
      if (status === 200) {
        return response.json();
      } else if (status === 404) {
        Alert.alert(
          "Something went wrong",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    })
      .then((responseJson) => {
        console.log("response from post", responseJson);
        // this.setState({
        //   worklogCard: Date.now(),
        // });
        // const {navigation, position} = this.props
        // console.log("response from worklog :", responseJson);
        Alert.alert(
          "Appointment Requested Successfully",
          "You can check your appointments in the history",
          [{ text: "OK", onPress: () => this.closeModal() }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction =(text) => {
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
    console.log("categories", item)
    
    if(item.selfemployed === true){
      this.setState({
        isModalOpen: true,
      id: item._id,
      role: item.role,
        selectedCats: item.catid
      })
    }
    else{
      this.setState({
        isModalOpen: true,
        selectedCats: item.compid.categories,
        id: item._id,
        role: item.role,
      });
    }
   
    console.log("request modal", this.state)
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }
  showPicker = (category) => {
    this.setState({
      categoryValues: category && category,
    });
  };
  handleChange = (value) => {
    console.log("handlechange", value)
    this.setState({ selectedValue: value, categoryValues: value });
  };
  
  render() {
    //const value = useContext(UserContext);
    //console.log("props", this.props);
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
                  {/* <Item>
                    <Icon active name="ios-people" /> */}
                    <Picker
                      style = {styles.picker}
                      selectedValue={this.state.selectedValue}
                      onValueChange={(value) => {
                        this.handleChange(value);
                      }}
                    >
                    <Picker.Item label="Select category" />
                      {this.state.selectedCats && this.state.selectedCats.length
                        ? this.state.selectedCats.map((item, myIndex) => {
                            return (
                              <Picker.Item
                                label={item.catname}
                                value={item._id}
                                key={myIndex}
                              />
                            );
                          })
                        : null}
                    </Picker>
                  {/* </Item> */}
                  {/* {console.log("ok",this.state)} */}
                  <Item stackedLabel style={styles.title}>
                    <Label style={{paddingVertical: 10}}>Title</Label>
                    <Input
                      placeholder="Write your problem here"
                      value={this.state.title}
                      onChangeText={(title) => this.setState({ title })}
                    />
                  </Item>
                  <Item stackedLabel style={styles.description}>
                    <Label style={{paddingVertical: 10}}>Description</Label>
                    <Textarea
                      value={this.state.description}
                      rowSpan={5}
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
                    onPress={() => this.requestAppointment()}
                  >
                    <Text style={styles.buttonText}>Request Appointment</Text>
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
                id={item._id}
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
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 10 : 0,
  },
  title:{
    ...Platform.select({
      ios:{
        bottom: 100
      },
      android:{
        top: 10
      }
    })
  },
  description:{
    ...Platform.select({
      ios:{
        bottom: 80
      },
      android:{
        top: 20
      }
    })
  },
  picker:{
    ...Platform.select({
      ios:{
        bottom: 100
      },
      android:{
        top: 10,
        left: 10
      }
    })
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
  ...Platform.select({
    ios:{
    marginRight: 40,
    marginLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    bottom: 100,
    position: "relative",
    borderWidth: 1,
    borderColor: "#fff",
    },
    android:{
      marginRight: 40,
      marginLeft: 40,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: Colors.primary,
      borderRadius: 10,
      top: 20,
      position: "relative",
      borderWidth: 1,
      borderColor: "#fff",
    }
  }),
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

export default connect(mapStateToProps, null)(SearchCraftsmen);
