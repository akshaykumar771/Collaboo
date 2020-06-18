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
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { SearchBar, ListItem } from "react-native-elements";
import Colors from "../constants/Colors";
import SingleChatScreen from "../screens/SingleChatScreen";
import { connect } from "react-redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
class ChatScreen extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = {
      isLoading: true,
      search: "",
    };
    this.arrayholder = [];
  }
  componentDidMount() {
    setTimeout(() => this.makeRemoteRequest(), 3000);
  }
  makeRemoteRequest = () => {
    // const socket = io.connect("http://81.89.193.99:3001/chat", {
    //  query: { token: this.props.token },
    //  });
    // console.log("Shocke", socket);
    // console.log("Chat Screen:", this.props.token);
    const url = "http://81.89.193.99:3001/api/search/craftsmen_agent";
    const bearer = "Bearer " + this.props.token;
    // Platform.OS === "android"
    //   ? "http://10.0.2.2:3000/craftsmen"
    //   : "http://192.168.0.213:3000/craftsmen";
    fetch(url, { method: "GET", headers: { Authorization: bearer } })
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
  }
  // makeRemoteRequest = () => {
  //   
  // };
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
      //ListView to show with textinput used as search bar
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
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
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              //<Text style={styles.textStyle}>{item.name}</Text>
              <ListItem
                title={item.fname + item.lname}
                subtitle={item.phno}
                containerStyle={{ borderBottomWidth: 0 }}
                rightIcon={{ name: "message" }}
                onPress={() =>
                  this.props.navigation.navigate("SingleChat", {
                    name: item.fname + item.lname,
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
      </TouchableWithoutFeedback>
    );
  }
}

ChatScreen.navigationOptions = {
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Favorite"
        iconName="ios-star"
        onPress={() => {
          console.log("Added as fav");
        }}
      />
    </HeaderButtons>
  ),
};

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
});

export default connect(mapStateToProps, null)(ChatScreen);
