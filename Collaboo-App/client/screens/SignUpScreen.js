import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
} from "native-base";
import { Formik } from "formik";
import Colors from "../constants/Colors";
import RegisterCraftsmen from "../components/RegisterCraftsmen"
export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRole: '',
      selectedCraftsmen: false
    };
  }

  handleRoleSelect = (itemValue) =>{
    
    this.setState({
      selectedRole: itemValue
    })
    if(this.state.selectedRole === 'Craftsmen'){
      const craftsmen = <RegisterCraftsmen /> 
    }
  }
  render() {
    return (
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          address: "",
          PLZ: "",
          city: "",
          role: "",
          mobilenumber: "",
          password: "",
        }}
      >
        {(props) => {
          return (
            <Container>
              <Content scrollEnabled={true}>
                <Form>
                  <Item stackedLabel>
                    <Label>Full Name</Label>
                    <Input
                      placeholder="FullName"
                      value={props.values.fullname}
                      onChangeText={props.handleChange("fullname")}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Email</Label>
                    <Input
                      placeholder="Email"
                      value={props.values.email}
                      onChangeText={props.handleChange("email")}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Address</Label>
                    <Input
                      placeholder="Address"
                      value={props.values.address}
                      onChangeText={props.handleChange("address")}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Postalzeit</Label>
                    <Input
                      placeholder="Postalzeit"
                      value={props.values.PLZ}
                      onChangeText={props.handleChange("PLZ")}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>City</Label>
                    <Input
                      placeholder="City"
                      value={props.values.city}
                      onChangeText={props.handleChange("city")}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Who are you</Label>
                    <Picker
                      style={{ height: 40, width: 400 }}
                      mode="dropdown"
                      prompt={"Who are you"}
                      itemStyle={{ backgroundColor: "grey" }}
                      selectedValue={this.state.selectedRole}
                      onValueChange={(itemValue, itemIndex) =>
                        //this.setState({ selectedRole: itemValue })
                        this.handleRoleSelect(itemValue)
        
                      }
                    >
                      <Picker.Item
                        label="Choose your role"
                        value={null}
                        key={0}
                      />
                      <Picker.Item label="Customer" value={1} key={1} />
                      <Picker.Item label="Craftsmen" value={2} key={2} />
                      <Picker.Item label="Agent" value={3} key={3} />
                    </Picker>
                  </Item>
                  <Item stackedLabel>
                    <Label>Mobile Number</Label>
                    <Input
                      placeholder="Mobile Number"
                      value={props.values.mobilenumber}
                      onChangeText={props.handleChange("mobilenumber")}
                    />
                  </Item>
                  <Item stackedLabel last>
                    <Label>Password</Label>
                    <Input
                      placeholder="Enter Password"
                      value={props.values.password}
                      onChangeText={props.handleChange("password")}
                    />
                  </Item>
                </Form>
                <View style={styles.buttonContainer}>
                  <Button title="Sign up" />
                </View>
              </Content>
            </Container>
          );
        }}
      </Formik>
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
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
