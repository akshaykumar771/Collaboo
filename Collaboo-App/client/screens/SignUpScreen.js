import React, { Component } from "react";
import { StyleSheet, View, Alert } from "react-native";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import RegisterAddress from "../components/RegisterAddress";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      street: "",
      pcode: "",
      city: "",
      company: "",
      category: "",
      phno: "",
      password: "",
    };
  }

  makeRemoteRequest = () => {
    const url =
      // Platform.OS === "android"
      //   ? "http://10.0.2.2:3000/craftsmen"
      //   : "http://192.168.0.213:3000/craftsmen";
      "http://81.89.193.99:3001/api/user/register";
    const data = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      emailId: this.state.email,
      role: this.state.role,
      selfEmployed: this.state.selfemployed,
      company: this.state.company,
      categories: this.state.category,
      street: this.state.street,
      city: this.state.city,
      postalCode: this.state.pcode,
      phNo: this.state.phno,
      pwd: this.state.password,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //console.log(response)
        if (response) {
          Alert.alert("Successful","Registered Successfully", [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => this.props.navigation.navigate("Customer"),
            },
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  addAddress = (address) => {
    //console.log("address" + address)
    this.setState(
      {
        street: address.street,
        city: address.city,
        pcode: address.pcode,
      },
      () => {}
    );
  };

  // showCategory = (category) =>{
  //   this.setState({
  //     category: category.category
  //   })
  // }
  showCompany = (company) =>{
    this.setState({
      company: company.company
    })
  }
  handleSubmit = () => {
    //console.log("state" + JSON.stringify(this.state));
    this.makeRemoteRequest();
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
                    this.setState({ firstname: text });
                  }}
                  value={this.state.firstname}
                />
              </Item>
              <Item>
                <Icon active name="ios-person" />
                <Input
                  placeholder="Enter your LastName"
                  onChangeText={(text) => {
                    this.setState({ lastname: text });
                  }}
                  value={this.state.lastname}
                />
              </Item>
              <Item style={{ paddingVertical: 10 }}>
                <Icon active name="ios-mail" />
                <Input
                  placeholder="Email"
                  onChangeText={(text) => {
                    this.setState({ email: text });
                  }}
                  value={this.state.email}
                />
              </Item>
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
              {this.state.role === "CUSTOMER" ? (
                <RegisterAddress addAddress={this.addAddress} />
              ) : (
                []
              )}
              {this.state.role === "CRAFTSMEN" ? <RegisterCraftsmen showCompany = {this.showCompany}/> : []}
              {this.state.role === "AGENT" ? <RegisterCraftsmen /> : []}
              <Item style={{ paddingVertical: 10 }}>
                <Icon active name="ios-phone-portrait" />
                <Input
                  placeholder=" Enter your Mobile Number"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    this.setState({ phno: text });
                  }}
                  value={this.state.phno}
                />
              </Item>
              <Item style={{ paddingVertical: 10 }}>
                <Icon active name="ios-lock" />
                <Input
                  placeholder="Enter Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({ password: text });
                  }}
                  value={this.state.password}
                />
              </Item>
            </Form>
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={this.handleSubmit}
                title="SIGN UP"
                buttonColor="#039BE5"
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
