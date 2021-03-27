import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Colors from "../constants/Colors";
import { connect } from "react-redux";
class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogout = async () => {
    const bearer = "Bearer " + this.props.token;
    const pushToken = await AsyncStorage.getItem("pushtoken");
    fetch("http://81.89.193.99:3001/api/user/logout", {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ pushToken }),
    })
      .then((resp) => resp.json())
      .then(async (response) => {
        await AsyncStorage.removeItem("token");
        this.props.navigation.navigate("Auth");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <View
            style={{ alignItems: "center", justifyContent: "center", top: 30 }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                width: 300,
                borderRadius: 15,
              }}
              underlayColor="#fff"
              onPress={() => {
                this.props.navigation.navigate("EditProfil");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  left: 20,
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  Ändere das Profil
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center", top: 50 }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                width: 300,
                borderRadius: 15,
              }}
              underlayColor="#fff"
              onPress={() => {
                this.handleLogout();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  left: 20,
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Abmelden</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps, null)(UserProfileScreen);
