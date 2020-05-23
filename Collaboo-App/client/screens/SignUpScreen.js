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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import RegisterAddress from "../components/RegisterAddress";
import RegisterAgent from "../components/RegisterAgent";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      company: "",
      street: "",
      pcode: "",
      city: "",
      categories: [],
      selfEmployed:false,
      phno: "",
      password: "",
      firstnameVal:"",
      emailVal:"",
      roleVal:"",
      phnoVal:"",
      passwordVal:""
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
      companyName: this.state.company,
      categories: this.state.categories,
      street: this.state.street,
      city: this.state.city,
      postalCode: this.state.pcode,
      phNo: this.state.phno,
      pwd: this.state.password
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
        //console.log("backend response",JSON.stringify(response))
        if (response.role === 'CUSTOMER') {
          Alert.alert("Successful","Registered Successfully", [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => this.props.navigation.navigate("Customer"),
            },
          ]);
        }
        else if (response.role === 'CRAFTSMEN') {
          Alert.alert("Successful","Registered Successfully", [
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
  showCompany = (company, street, pcode, city, categories, selfEmployed) =>{
    this.setState({
      company: company && company,
      street: street && street,
      pcode: pcode && pcode,
      city: city && city,
      categories: categories && categories,
      selfEmployed: selfEmployed && selfEmployed
    })
  }

  showAgentDetails = (street, pcode, city, company, categories) => {
    this.setState({
      street: street && street,
      pcode: pcode && pcode,
      city: city && city,
      company: company && company,
      categories: categories && categories
    })
  }

  // showCategory = (category) => {
  //   this.setState ({
  //     category: category.category
  //   })
  // }

  validateName = () => {
    let regEx = /^[a-zA-z]+$/
    let isValid = regEx.test(this.state.firstname)
   // console.warn(isValid);
    if(!isValid) {
      this.setState({firstnameVal:"Name field must be alphabets"})
    }
    else{
      this.setState({firstnameVal:""})
    }
  }
  validateEmail = () => {
    let regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let isValid = regEx.test(this.state.email)
    console.warn(isValid)
    if(!isValid){
      this.setState({emailVal:"Please enter valid email"})
    }
    else{
      this.setState({emailVal:""})
    }
  }
  validateRole = () => {
    if(this.state.role = ""){
      this.setState({roleVal:"Role cannot be empty"})
    }
    else{
      this.setState({roleVal:""})
    }
  }

  validateMobNo = () => {
    //let regEx = /^\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/
    let regEx = /^(((\+|00+)49)|0)[1-9]\d+/
    let isValid = regEx.test(this.state.phno)
    if(!isValid) {
      this.setState({phnoVal:"Please enter valid number"})
    }
    else{
      this.setState({phnoVal: ""})
    }
  }
  validatePassword = () =>{
    let regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let isValid = regEx.test(this.state.password)
    if(!isValid) {
      this.setState({passwordVal: "Password should contain atleast 8 characters with atlease one letter and one number "})
    }
    else{
      this.setState({passwordVal:""})
    }
  }
  handleSubmit = () => {
    console.log("state" + JSON.stringify(this.state));
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
                  onBlur = {this.validateName}
                />
              </Item>
              <Text style = {{color:'red', marginLeft: 10}}>{this.state.firstnameVal}</Text>
              <Item>
                <Icon active name="ios-person" />
                <Input
                  placeholder="Enter your LastName"
                  onChangeText={(text) => {
                    this.setState({ lastname: text });
                  }}
                  value={this.state.lastname}
                  onBlur = {this.validateName}
                />
              </Item>
              <Text style = {{color:'red', marginLeft: 10}}>{this.state.firstnameVal}</Text>
              <Item>
                <Icon active name="ios-mail" />
                <Input
                  placeholder="Email"
                  onChangeText={(text) => {
                    this.setState({ email: text });
                  }}
                  value={this.state.email}
                  onBlur = {this.validateEmail}
                />
              </Item>
              <Text style = {{color:'red', marginLeft: 10}}>{this.state.emailVal}</Text>
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
                  onBlur = {this.validateRole}
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
              <Text style = {{color:'red', marginLeft: 10}}>{this.state.roleVal}</Text>
              {this.state.role === "CUSTOMER" ? (
                <RegisterAddress addAddress={this.addAddress} />
              ) : (
                []
              )}
              {this.state.role === "CRAFTSMEN" ? <RegisterCraftsmen showCompany = {this.showCompany}/> : []}
              {this.state.role === "AGENT" ? <RegisterAgent showAgentDetails = {this.showAgentDetails} /> : []}
              
              <Item>
                <Icon active name="ios-phone-portrait" />
                <Input
                  placeholder=" Enter your Mobile Number"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    this.setState({ phno: text });
                  }}
                  value={this.state.phno}
                  onBlur={this.validateMobNo}
                />
              </Item>
              <Text style = {{color:'red', marginLeft: 10}}>{this.state.phnoVal}</Text>
              <Item>
                <Icon active name="ios-lock" />
                <Input
                  placeholder="Enter Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({ password: text });
                  }}
                  value={this.state.password}
                  onBlur = {this.validatePassword}
                  
                />
              </Item>
              <Text style = {{color:'red', marginLeft: 10}}>{this.state.passwordVal}</Text>
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
