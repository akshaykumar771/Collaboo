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
import {userPostFetch} from '../actions/action';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
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

  makeRemoteRequest = () => {
    const url =
      // Platform.OS === "android"
      //   ? "http://10.0.2.2:3000/craftsmen"
      //   : "http://192.168.0.213:3000/craftsmen";
      "http://81.89.193.99:3001/api/user/register";
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
      role: this.state.role,
      selfEmployed: this.state.selfEmployed,
      companyName: this.state.companyName,
      categories: this.state.categories,
      street: this.state.street,
      city: this.state.city,
      postalCode: this.state.postalCode,
      phNo: this.state.phNo,
      pwd: this.state.pwd,
    };
    console.log("data", JSON.stringify(data))
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //console.log("backend response",JSON.stringify(response))
        if (response.role === "CUSTOMER") {
          Alert.alert("Successful", "Registered Successfully", [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => this.props.navigation.navigate("Customer"),
            },
          ]);
        } else if (response.role === "CRAFTSMEN") {
          Alert.alert("Successful", "Registered Successfully", [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => this.props.navigation.navigate("App"),
            },
          ]);
        }
        else if (response.role === "AGENT") {
          Alert.alert("Successful", "Registered Successfully", [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => this.props.navigation.navigate("Agent"),
            },
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    if(selfEmployed === true) {
      this.setState({
        selfEmployed: selfEmployed && selfEmployed,
        categories: categories && categories,
        street: street && street,
        postalCode: pcode && pcode,
        city: city && city
      })
    }
    else {
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
      street: street && street
    });
  };

  // showCategory = (category) => {
  //   this.setState ({
  //     category: category.category
  //   })
  // }

  validateName = () => {
    let regEx = /^[a-zA-z]+$/;
    let isValid = regEx.test(this.state.firstName);
    // console.warn(isValid);
    if (!isValid) {
      this.setState({ firstNameVal: "Name field must be alphabets" });
    } else {
      this.setState({ firstNameVal: "" });
    }
  };
  validateEmail = () => {
    let regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = regEx.test(this.state.emailId);
    console.warn(isValid);
    if (!isValid) {
      this.setState({ emailIdVal: "Please enter valid emailId" });
    } else {
      this.setState({ emailIdVal: "" });
    }
  };
  validateRole = () => {
    if ((this.state.role = "")) {
      this.setState({ roleVal: "Role cannot be empty" });
    } else {
      this.setState({ roleVal: "" });
    }
  };

  validateMobNo = () => {
    //let regEx = /^\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/
    let regEx = /^(((\+|00+)49)|0)[1-9]\d+/;
    let isValid = regEx.test(this.state.phNo);
    if (!isValid) {
      this.setState({ phnoVal: "Please enter valid number" });
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
          "Password should contain atleast 8 characters with atlease one letter and one number ",
      });
    } else {
      this.setState({ passwordVal: "" });
    }
  };
  handleSubmit = () => {
    console.log("state" + JSON.stringify(this.state));
    //this.makeRemoteRequest();
    this.props.userPostFetch(this.state)
  };

  render() {
    //console.log("role"+this.state.role)
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
                  placeholder="Enter your FirstName"
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
                  placeholder="Enter your LastName"
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
                  placeholder="Choose your role"
                  prompt={"Who are you"}
                  itemStyle={{ backgroundColor: "grey" }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ role: itemValue });
                  }}
                  selectedValue={this.state.role}
                  onBlur={this.validateRole}
                >
                  <Picker.Item
                    style={{ paddingVertical: 10 }}
                    label="Choose your role"
                    value={null}
                    key={0}
                  />
                  <Picker.Item label="Customer" value={"CUSTOMER"} key={1} />
                  <Picker.Item label="Craftsmen" value={"CRAFTSMEN"} key={2} />
                  <Picker.Item label="Agent" value={"AGENT"} key={3} />
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
                  placeholder=" Enter your Mobile Number"
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
                  placeholder="Enter Password"
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
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={this.handleSubmit}
                title="SIGN UP"
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
const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(SignUpScreen);