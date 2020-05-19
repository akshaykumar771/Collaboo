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
import { Formik } from "formik";
import Colors from "../constants/Colors";
import Categories from '../components/CatgoriesAC';
import RegisterAddress from "./RegisterAddress";
export default class RegisterCraftsmen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company:"",
      category:""
    };
  }
  render() {
    return (
            <Form>
              <Item>
                <Icon active name="ios-business" />
                <Categories />
              </Item>
              <Item>
                <Icon active name="ios-circle" />
                <Categories />
              </Item>
              <RegisterAddress />
            </Form>
          );
  }
}
