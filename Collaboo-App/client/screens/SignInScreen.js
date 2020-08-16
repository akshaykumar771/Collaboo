import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  Image,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import FormButton from "../components/FormButton";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Picker,
  Icon,
} from "native-base";
import { userLoginFetch } from "../actions/action";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: "",
      password: "",
      loginData: "",
      pushToken: "",
    };
  }

  validateEmail = () => {
    let regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = regEx.test(this.state.email);
    if (!isValid) {
      this.setState({ emailVal: "Please enter valid email" });
    } else {
      this.setState({ emailVal: "" });
    }
  };
  // validatePassword = () => {
  //   let regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   let isValid = regEx.test(this.state.password);
  //   if (!isValid) {
  //     this.setState({
  //       passwordVal:
  //         "Password should contain atleast 8 characters with atlease one letter and one number ",
  //     });
  //   } else {
  //     this.setState({ passwordVal: "" });
  //   }
  // };
  handleSubmit = async () => {
    const pushToken = await AsyncStorage.getItem("pushtoken");
    this.setState({
      pushToken: pushToken,
    });
    console.log("sign in pushtoken", this.state.pushToken);
    this.props.userLoginFetch(this.state);
  };
  goToSignup = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
     
        
      <Container style={{backgroundColor: Colors.primary }}>
       <View
          style={{ alignItems: "center", justifyContent: "center", top:80}}
      >
          <Image
            source={require("../constants/src_assets_icon.png")}
            style={{ width: 200, height: 150 }}
          />
          </View>
        <Content
          style={{ paddingVertical: 15, paddingHorizontal: 20, top: 150 }}
        >
          <Form>
            <Item
              regular
              style={{ backgroundColor: "white", borderRadius: 10 }}
            >
              <Icon active name="ios-mail" />
              <Input
                placeholder="Email"
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
                value={this.state.email}
                onBlur={this.validateEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Item>

            <Text style={{ color: "red", marginLeft: 10 }}>
              {this.state.emailVal}
            </Text>

            <Item
              regular
              style={{ backgroundColor: "white", borderRadius: 10 }}
            >
              <Icon active name="ios-lock" />
              <Input
                placeholder="Enter Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}
                onBlur={this.validatePassword}
              />
            </Item>
            {/* <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.passwordVal}
              </Text> */}
          </Form>

          <View style={styles.buttonContainer}>
            <FormButton
              buttonType="outline"
              onPress={this.handleSubmit}
              title="LOGIN"
              buttonColor={Colors.primary}
            />
          </View>
          <TouchableHighlight
            style={styles.linkContainer}
            onPress={() => this.goToSignup()}
          >
            <Text
              style={{ color: "#f68ba7", fontSize: 16, textAlign: "center" }}
            >
              Don't have an account? Sign up
            </Text>
          </TouchableHighlight>
          <View style={{ flex: 1, flexDirection: "row", top: 20, padding: 15 }}>
            <Text
              style={{
                flex: 1,
                flexWrap: "wrap",
                fontSize: 18,
                lineHeight:30,
                textAlign: "center",
                color: "orange",
                fontStyle: "italic",
              }}
            >
              "Craftsmanship happens to be a skill without any imagination."
            </Text>
          </View>
        </Content>
      </Container>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    margin: 25,
    backgroundColor: "white",
    borderRadius: 20,
    height: 40,
    top: 15,
  },
});
const mapDispatchToProps = (dispatch) => ({
  userLoginFetch: (userInfo) => dispatch(userLoginFetch(userInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
