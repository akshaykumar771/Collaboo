import React, { Component } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Picker,
  Icon,
} from "native-base";
import FormButton from "../components/FormButton";
import Colors from "../constants/Colors";
import RegisterCraftsmen from "../components/RegisterCraftsmen";
import RegisterAddress from "../components/RegisterAddress";
import RegisterAgent from "../components/RegisterAgent";
import { userPostFetch } from "../actions/action";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { registerForPushNotificationsAsync } from "../services/push_notifications";
class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstName: "",
      lastName: "",
      emailId: "",
      role: "",
      street: "",
      postalCode: "",
      city: "",
      companyName: "",
      categories: [],
      selfEmployed: false,
      phNo: "",
      pwd: "",
      firstNameVal: "",
      emailVal: "",
      roleVal: "",
      phnoVal: "",
      passwordVal: "",
    };
  }

  addAddress = (address) => {
    this.setState(
      {
        street: address.street,
        city: address.city,
        postalCode: address.pcode,
      },
      () => {}
    );
  };

  showCompany = (selfEmployed, street, pcode, city, company, categories) => {
    if (selfEmployed === true) {
      this.setState({
        selfEmployed: selfEmployed && selfEmployed,
        categories: categories && categories,
        street: street && street,
        postalCode: pcode && pcode,
        city: city && city,
      });
    } else {
      this.setState({
        selfEmployed: selfEmployed && selfEmployed,
        companyName: company && company,
      });
    }
  };

  showAgentDetails = (street, pcode, city, company, categories) => {
    this.setState({
      categories: categories && categories,
      city: city && city,
      companyName: company && company,
      postalCode: pcode && pcode,
      street: street && street,
    });
  };

  validateName = () => {
    let regEx = /^[a-zA-z]+$/;
    let isValid = regEx.test(this.state.firstName);
    if (!isValid) {
      this.setState({
        firstNameVal: "Namensfeld muss aus Alphabeten bestehen",
      });
    } else {
      this.setState({ firstNameVal: "" });
    }
  };
  validateEmail = () => {
    let regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = regEx.test(this.state.emailId);
    if (!isValid) {
      this.setState({ emailIdVal: "Bitte gültige emailId eingeben" });
    } else {
      this.setState({ emailIdVal: "" });
    }
  };
  validateRole = () => {
    if ((this.state.role = "")) {
      this.setState({ roleVal: "Rolle kann nicht leer sein" });
    } else {
      this.setState({ roleVal: "" });
    }
  };

  validateMobNo = () => {
    //let regEx = /^\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/
    let regEx = /^(((\+|00+)49)|0)[1-9]\d+/;
    let isValid = regEx.test(this.state.phNo);
    if (!isValid) {
      this.setState({ phnoVal: "Bitte gültige Nummer eingeben" });
    } else {
      this.setState({ phnoVal: "" });
    }
  };
  validatePassword = () => {
    let regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let isValid = regEx.test(this.state.pwd);
    if (!isValid) {
      this.setState({
        passwordVal:
          "Das Passwort sollte mindestens 8 Zeichen mit mindestens einem Buchstaben und einer Zahl enthalten ",
      });
    } else {
      this.setState({ passwordVal: "" });
    }
  };
  handleSubmit = async () => {
    console.log("state" + JSON.stringify(this.state));
    await registerForPushNotificationsAsync()
      .then((token) => {
        console.log("signup pushtoken", token);
        this.setState({
          pushToken: token,
        });
        return token;
      })
      .then(async (pushToken) => {
        await this.props.userPostFetch(this.state);
      });
  };

  render() {
    return (
      <Container>
        <Content style={{ paddingVertical: 15 }}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === "ios"}
          >
            <Form>
              <Item>
                <Icon active name="ios-person" />
                <Input
                  placeholder="Vorname"
                  onChangeText={(text) => {
                    this.setState({ firstName: text });
                  }}
                  value={this.state.firstName}
                  onBlur={this.validateName}
                />
              </Item>
              <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.firstNameVal}
              </Text>
              <Item>
                <Icon active name="ios-person" />
                <Input
                  placeholder="Nachname"
                  onChangeText={(text) => {
                    this.setState({ lastName: text });
                  }}
                  value={this.state.lastName}
                  onBlur={this.validateName}
                />
              </Item>
              <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.firstNameVal}
              </Text>
              <Item>
                <Icon active name="ios-mail" />
                <Input
                  placeholder="Email"
                  onChangeText={(text) => {
                    this.setState({ emailId: text });
                  }}
                  value={this.state.emailId}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={this.validateEmail}
                />
              </Item>
              <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.emailIdVal}
              </Text>
              <Item style={{ paddingVertical: 10 }}>
                <Icon active name="ios-people" />
                <Picker
                  style={{ height: 40, width: 400 }}
                  mode="dropdown"
                  placeholder="Wähle dein Rolle aus"
                  itemStyle={{ backgroundColor: "grey" }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ role: itemValue });
                  }}
                  selectedValue={this.state.role}
                  onBlur={this.validateRole}
                >
                  <Picker.Item
                    style={{ paddingVertical: 10 }}
                    label="Wähle dein Rolle aus"
                    value={null}
                    key={0}
                  />
                  <Picker.Item label="Kunde" value={"CUSTOMER"} key={1} />
                  <Picker.Item label="Handwerker" value={"CRAFTSMEN"} key={2} />
                  <Picker.Item label="Verwaltung" value={"AGENT"} key={3} />
                </Picker>
              </Item>
              <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.roleVal}
              </Text>
              {this.state.role === "CUSTOMER" ? (
                <RegisterAddress addAddress={this.addAddress} />
              ) : (
                []
              )}
              {this.state.role === "CRAFTSMEN" ? (
                <RegisterCraftsmen showCompany={this.showCompany} />
              ) : (
                []
              )}
              {this.state.role === "AGENT" ? (
                <RegisterAgent showAgentDetails={this.showAgentDetails} />
              ) : (
                []
              )}

              <Item>
                <Icon active name="ios-phone-portrait" />
                <Input
                  placeholder="Telefon-/Mobilfunknummer"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    this.setState({ phNo: text });
                  }}
                  value={this.state.phNo}
                  onBlur={this.validateMobNo}
                />
              </Item>
              <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.phnoVal}
              </Text>
              <Item>
                <Icon active name="ios-lock" />
                <Input
                  placeholder="Passwort"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({ pwd: text });
                  }}
                  value={this.state.pwd}
                  onBlur={this.validatePassword}
                />
              </Item>
              <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.passwordVal}
              </Text>
            </Form>
            <View>
              {this.props.signupError ? (
                <Text style={{ color: "red", marginLeft: 10, fontSize: 16 }}>
                  Bitte gültige Daten eingeben
                </Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={this.handleSubmit}
                title="Anmelden"
                buttonColor="#039BE5"
                onBlur={this.validatePassword}
              />
            </View>
          </KeyboardAwareScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  inputStyle: {
    padding: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  buttonContainer: {
    margin: 25,
  },
});
const mapStateToProps = (state) => ({
  signupError: state.userReducer.signupError,
});

const mapDispatchToProps = (dispatch) => ({
  userPostFetch: (userInfo) => dispatch(userPostFetch(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
