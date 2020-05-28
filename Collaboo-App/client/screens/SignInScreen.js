import React, { Component } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableHighlight } from "react-native";
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


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: "",
      password: "",
      loginData: "",
    };
  }

   
  onLogin = async () => {
    //const { email, password } = this.state;
    const emailId = this.state.dataSource.email
    console.log("email", emailId)
    //const pwd = this.state.dataSource.password
    //console.log("onlogin function")
    try {
      if (this.state.dataSource.role == 'CUSTOMER') {
        this.props.navigation.navigate("Customer");
      }
      else if (email === emailId  && password === pwd && role === 'CRAFTSMEN') {
        this.props.navigation.navigate("App");
      }
      else if(email === emailId  && password === pwd && role === 'AGENT') {
        this.props.navigation.navigate("Agent");
      }
    } catch (error) {
      alert(error);
    }
  };
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
  handleSubmit = () => {
    fetch(`http://81.89.193.99:3001/api/user/login?email=${this.state.email}&password=${this.state.password}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.setState({
        //   isLoading: false,
        //   dataSource: responseJson,
        // });
        if(responseJson.role === 'CUSTOMER'){
          this.props.navigation.navigate("Customer")
        }
        else if(responseJson.role === 'CRAFTSMEN'){
          this.props.navigation.navigate("App")
        }
        else if(responseJson.role === 'AGENT'){
          this.props.navigation.navigate("Agent")
        }
        console.log("testing purpose", this.state.dataSource);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  goToSignup = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
      <Container>
        <Content style={{ paddingVertical: 15 }}>
            <Form>
              <Item>
                <Icon active name="ios-mail" />
                <Input
                  placeholder="Email"
                  onChangeText={(text) => {
                    this.setState({ email: text });
                  }}
                  value={this.state.email}
                  onBlur={this.validateEmail}
                />
              </Item>
              <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.emailVal}
              </Text>
              <Item>
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
                buttonColor="#039BE5"
              />
            </View>
            <TouchableHighlight style={styles.linkContainer} onPress={() => this.goToSignup()}>
            <Text style ={{color: 'orange', fontSize: 16, textAlign:'center'}}>Don't have an account? Sign up here</Text>
        </TouchableHighlight>
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
  },
  // linkContainer: {
  //   paddingLeft: 65,
  // }
});
