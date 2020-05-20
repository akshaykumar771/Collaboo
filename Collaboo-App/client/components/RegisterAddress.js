import React, { Component } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from "native-base";
export default class RegisterAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street:"",
      pcode:"",
      city:""
    };
  }
  handleChange = () =>{
   // console.log(this.state)
    this.props.addAddress(this.state)
  }
  render() {
    return (
            <Form>
              <Item style={{ paddingVertical: 10 }}>
                <Icon active name="home" />
                <Input
                  placeholder="Address"
                  onChangeText={(text) => this.setState ({street: text},() => this.handleChange())}
                  value={this.state.street}
                  // onSubmitEditing = {this.handleSubmit}
                />
              </Item>
              <Item style={{ paddingVertical: 10 }}>
                <Icon active name="ios-pin" />
                <Input
                  placeholder="Postalzeit"
                  keyboardType="numeric"
                  onChangeText={(text) => this.setState ({pcode: text},() => this.handleChange())}
                  value={this.state.pcode}
                  //onSubmitEditing = {this.handleSubmit}
                />
              </Item>
              <Item style={{ paddingVertical: 10 }}>
                <Icon active name="ios-globe" />
                <Input
                  placeholder="City"
                  onChangeText={(text) => this.setState ({city: text},() => this.handleChange())}
                  value={this.state.city}
                  //onSubmitEditing = {this.handleSubmit}
                />
              </Item>
            </Form>
          );
        }}
     