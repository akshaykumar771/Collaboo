import React, { Component } from "react";
import { StyleSheet, View, Button, Text, CheckBox } from "react-native";
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
import Categories from "../components/CatgoriesAC";
import RegisterAddress from "./RegisterAddress";
export default class RegisterCraftsmen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      category: "",
      checked: false,
    };
  }
  CheckBoxText() {
    this.setState({
      check: !this.state.check,
    });
  }
  showCategories = (name) => {
    this.setState(
      {
        category: name.category,
      },
      () => {}
    );
  };
  render() {
    return (
      <Form>
        <View>
          <CheckBox
            value={this.state.check}
            onChange={() => this.CheckBoxText()}
            style={styles.selfEmployed}
          />
        </View>
        <View>
          <Text style={styles.checkText}>Self Employed</Text>
        </View>
        <Item>
          <Icon active name="ios-business" />
          <Categories showCategories={this.showCategories} />
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
const styles = StyleSheet.create({
  selfEmployed: {
    marginTop: 20,
    marginLeft: 10,
  },
  checkText: {
    position: "relative",
    marginTop: -25,
    paddingHorizontal: 50,
  },
});
