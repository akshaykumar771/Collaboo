import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  AsyncStorage,
} from "react-native";
import FormButton from "../components/FormButton";
import { Container, Content, Form, Item, Input, Icon } from "native-base";
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
      this.setState({ emailVal: "Bitte gültige E-Mail eingeben" });
    } else {
      this.setState({ emailVal: "" });
    }
  };
  handleSubmit = async () => {
    const pushToken = await AsyncStorage.getItem("pushtoken");
    this.setState({
      pushToken: pushToken,
    });
    this.props.userLoginFetch(this.state);
  };
  goToSignup = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
      <Container style={{ backgroundColor: Colors.primary }}>
        <View
          style={{ alignItems: "center", justifyContent: "center", top: 80 }}
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
                placeholder="Passwort"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}
                onBlur={this.validatePassword}
              />
            </Item>
            {this.props.loginError ? (
              <Text style={{ color: "red", marginLeft: 10, fontSize: 16 }}>
                Bitte gültige Daten eingeben
              </Text>
            ) : null}
          </Form>
          <View style={styles.buttonContainer}>
            <FormButton
              buttonType="outline"
              onPress={this.handleSubmit}
              title="Anmeldung"
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
              Sie haben noch kein Konto? Anmelden
            </Text>
          </TouchableHighlight>
          <View style={{ flex: 1, flexDirection: "row", top: 20, padding: 15 }}>
            <Text
              style={{
                flex: 1,
                flexWrap: "wrap",
                fontSize: 18,
                lineHeight: 30,
                textAlign: "center",
                color: "orange",
                fontStyle: "italic",
              }}
            >
              "Handwerkliches Geschick ist zufällig eine Fähigkeit ohne jede
              Vorstellung."
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

const mapStateToProps = (state) => ({
  loginError: state.userReducer.loginError,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
