import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { SearchBar, ListItem } from "react-native-elements";
import Colors from "../constants/Colors";
import { connect } from "react-redux";

class AgentWorkLogScreen extends Component {
  constructor(props) {
    super(props);
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
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/company/search/craftsmen";
    const bearer = "Bearer " + this.props.token;
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
      .then((response) => {
        const status = response.status;
        console.log("agent worklog status", status);
        if (status === 200) {
          return response.json();
        } else if (status === 204) {
          console.log("agent 204");
          Alert.alert(
            "Sorry",
            "Keine Arbeitsprotokoll gefunden",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          return;
        }
      })
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
    this.setState({
      isModalOpen: true,
      selectedCats: item.compid.categories,
      id: item._id,
      role: item.role,
    });
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
            placeholder="Hier tippen..."
            value={this.state.search}
          />
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            ListFooterComponent={this.renderFooter}
            //Item Separator View
            renderItem={({ item, index }) => (
              // Single Comes here which will be repeatative for the FlatListItems
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
