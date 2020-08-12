import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Button, Icon } from "native-base";
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import * as authActions from "../actions/action";
class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogout = async () => {
    const bearer = "Bearer " + this.props.token;
    const pushToken = await AsyncStorage.getItem("pushtoken");
    console.log("pushtoken logout", pushToken);
    fetch("http://81.89.193.99:3001/api/user/logout", {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({pushToken}),
    })
      .then((resp) => resp.json())
      .then((response) => {
        //console.log("data logout", data);
       
          console.log("logout", response);
          //localStorage.setItem("token", data.token)
          AsyncStorage.removeItem('token')
          this.props.navigation.navigate("Auth");
          
          
      })
      .catch((e) => {console.log(e)})
      
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
                this.props.navigation.navigate("EditProfile");
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
                  Edit Profile
                </Text>
                {/* <Icon
                style={{ left: 150, color: "white" }}
                name="arrow-forward"
              /> */}
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
                //  dispatch(authActions.logout());
                this.handleLogout();
                //props.navigation.navigate('Auth');
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
                <Text style={{ color: "white", fontSize: 18 }}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={{width: "100%", left: 30, height: 40, float: 30,  top: 20}}>
        <Button
          title="Logout"
          color={Colors.primary}
          onPress={() => {
             dispatch(authActions.logout());
             props.navigation.navigate('Auth');
          }}
        />
        </View> */}
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});
// const UserProfileScreen = (props) => {
//   const dispatch = useDispatch();
//   return (

//   );
// };

export default connect(mapStateToProps, null)(UserProfileScreen);
