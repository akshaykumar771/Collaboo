import React, { useState, useContext } from "react";
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
import {Context} from '../contexts/AuthContext'
//  class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//       email: "",
//       password: "",
//       loginData: "",
//     };
//   }
const Login = () =>{
  const {state, signin} = useContext(Context); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');


   
  // validateEmail = () => {
  //   let regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   let isValid = regEx.test({email});
  //   if (!isValid) {
  //     setEmailVal("Please enter valid email");
  //   } else {
  //     setEmailVal("");
  //   }
  // };
  
   goToSignup = () => {
    this.props.navigation.navigate("Signup");
  };


    return ( 
      <Container>
        <Content style={{ paddingVertical: 15 }}>
            <Form>
              <Item>
                <Icon active name="ios-mail" />
                <Input
                  placeholder="Email"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType = "email-address"
                  autoCapitalize="none"
                />
              </Item>
                {/* <Text style={{ color: "red", marginLeft: 10 }}>
                {emailVal}
              </Text>  */}
              <Item>
                <Icon active name="ios-lock" />
                <Input
                  placeholder="Enter Password"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                  value={password}
                />
              </Item>
             {/* <Text style={{ color: "red", marginLeft: 10 }}>
                {this.state.passwordVal}
              </Text> */}
          </Form>

            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={() => signin({email, password})}
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
export default Login;