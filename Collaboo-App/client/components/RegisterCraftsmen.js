import React, { Component } from "react";
import { StyleSheet, View, Text, CheckBox } from "react-native";
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
import Categories from "./Categories";
import RegisterAddress from "./RegisterAddress";
import Company from "../components/CompanyAC";
export default class RegisterCraftsmen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      category: "",
      checked: false,
      street:"",
      pcode:"",
      city:""
    };
  }
  CheckBoxText() {
    this.setState({
      check: !this.state.check,
    });
  }
  // showCategories = (name) => {
  //   this.setState(
  //     {
  //       category: name.category,
  //     }, () =>
  //     this.props.showCategory(this.state)
  //   );
  // };
  showCompanies = (name) => {
    this.setState(
      {
        company: name.company,
      },
      () => this.props.showCompany(this.state)
    );
  };
  showCategories = (cat) => {
    this.setState(
      {
        category: cat.category,
      },
      () => this.props.showCompany(this.state)
    );
  };
  addAddress = (add) => {
    this.setState({
      street: add.street,
      pcode: add.pcode,
      city: add.city
    }, () => this.props.showCompany(this.state))
  }
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
          <Company showCompanies={this.showCompanies} />
        </Item>
        {/* <Item>
          <Icon active name="ios-close-circle" /> */}
        <View style={styles.category}>
          <Categories showCategories={this.showCategories} />
        </View>
        {/* </Item> */}
        <RegisterAddress addAddress = {this.addAddress}/>
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
  category: {
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 0.25,
  },

});
