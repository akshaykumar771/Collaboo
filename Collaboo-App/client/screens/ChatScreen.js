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
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { SearchBar, ListItem } from "react-native-elements";
import Colors from "../constants/Colors";
import SingleChatScreen from "../screens/SingleChatScreen";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
class ChatScreen extends Component {
  constructor(props) {
    //console.log("testing constructor props: ",props)
    super(props);
    this.state = {
      isLoading: true,
      search: "",
      socket: props.socket,
      users: [],
      arrayHolder: [],
    };
  }

  getAllChats() {
    //console.log("gettttt");
    // const userId = this.props.navigation.getParam("userId");
    // const messages = this.state.messages
    const action = { type: "chat:allchats/get", data: {} };
    this.state.socket.emit("action", action);
    this.state.socket.on("action", (action) => {
      console.log("from getAllChats: ", action)
      const allChats = action.type === "chats" ? action.data : "";
      console.log("Get all chats: ", allChats);
      this.setState({
        isLoading: false,
        users: allChats.data,
        arrayHolder: allChats.data,
      });
      console.log("from chat screen :", this.state.users);
    });
    this.state.socket.on("error", (error) => {
      console.log("from get all chats", error);
    });
  }

  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    //console.log("users of get all chats", this.state.arrayHolder);
    const newData = this.arrayHolder.filter(function (item) {
      //applying filter for the inserted text in search bar
      console.log("itemdata", item.toUser);
      const fNameData = item.toUser.fullname
        ? item.toUser.fullname.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      const itemData = fNameData;
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
    //console.log("data", this.state.dataSource);
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
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={() => this.getAllChats()} />
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
              data={this.state.users}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              ListFooterComponent={this.renderFooter}
              //Item Separator View
              renderItem={({ item }) => (
                // Single Comes here which will be repeatative for the FlatListItems
                <ListItem
                  title={item.toUser.fullname}
                  subtitle={item.toUser.phno}
                  containerStyle={{ borderBottomWidth: 0 }}
                  rightIcon={{ name: "message" }}
                  onPress={() =>
                    this.props.navigation.navigate("SingleChat", {
                      name: item.toUser.fullname,
                      userId: item.toUser._id,
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
      </View>
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
  //token: state.userReducer.token,
  socket: state.userReducer.socket,
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
