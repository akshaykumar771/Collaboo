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
import { connect } from "react-redux";

//import SearchList from "./SearchList";
class AgentWorkLogScreen extends Component {
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
    // setTimeout(() => {
    //   this.makeRemoteRequest();
    // }, 3000);
    if(this.props.token){
      this.makeRemoteRequest()
    }
  }
  makeRemoteRequest = () => {
    console.log("search craftsmen by agent", this.props.token);
    const url = "http://81.89.193.99:3001/api/company/search/craftsmen";
    const bearer = "Bearer " + this.props.token;
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
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
      const textData = text.toUpperCase();
      const itemData = fNameData + lNameData;
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
                containerStyle={{ borderBottomWidth: 0 }}
                rightIcon={{ name: "chevron-right" }}
                onPress={() =>
                    this.props.navigation.navigate("ACWorkLog", {
                      name: item.fullname,
                      userId: item._id,
                    })
                  }
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

export default connect(mapStateToProps, null)(AgentWorkLogScreen);
