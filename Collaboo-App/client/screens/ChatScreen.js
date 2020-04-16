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
  TouchableWithoutFeedback
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { ListItem } from "react-native-elements";
import Colors from "../constants/Colors";
import SearchList from "../components/SearchList";
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = {
      isLoading: true,
    };
    this.arrayholder = [];
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    const url =
      Platform.OS === "android"
        ? "http://10.0.2.2:3000/craftsmen"
        : "http://192.168.0.213:3000/craftsmen";
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
      <TouchableWithoutFeedback onPress = {() =>{
        Keyboard.dismiss()
      }}>
      <View style={styles.viewStyle}>
        <SearchList />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          ListFooterComponent={this.renderFooter}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            //<Text style={styles.textStyle}>{item.name}</Text>
            <ListItem
              title={item.name}
              subtitle={item.mobile}
              containerStyle={{ borderBottomWidth: 0 }}
              rightIcon={{ name: "message" }}
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
          onPress={() =>{console.log("Added as fav")}}
        />
      </HeaderButtons>
    )
  };

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
      position: 'relative',
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