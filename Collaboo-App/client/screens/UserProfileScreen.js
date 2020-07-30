import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "native-base";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../actions/action";
const UserProfileScreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <View style={{ alignItems: "center", justifyContent: "center", top: 30 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.primary, width: 300, borderRadius: 15 }}
            underlayColor="#fff"
            onPress={() => {props.navigation.navigate("EditProfile")}}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                left: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Edit Profile</Text>
              {/* <Icon
                style={{ left: 150, color: "white" }}
                name="arrow-forward"
              /> */}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", top: 50 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.primary, width: 300, borderRadius: 15 }}
            underlayColor="#fff"
            onPress={() => {
             dispatch(authActions.logout());
             props.navigation.navigate('Auth');
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
              {/* <Icon
                style={{ left: 180, color: "white" }}
                name="arrow-forward"
              /> */}
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
};
export default UserProfileScreen;
