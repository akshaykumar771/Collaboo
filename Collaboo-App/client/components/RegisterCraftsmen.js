import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Form, Item, Icon, CheckBox } from "native-base";
import Categories from "./Categories";
import RegisterAddress from "./RegisterAddress";
import Company from "../components/CompanyAC";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default class RegisterCraftsmen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selfEmployed: false,
      company: "",
      categories: [],
      street: "",
      pcode: "",
      city: "",
    };
  }

  showCompanies = (name) => {
    this.setState(
      {
        company: name && name,
      },
      () => {
        this.props.showCompany(
          this.state.selfEmployed,
          this.state.street,
          this.state.pcode,
          this.state.city,
          this.state.company,
          this.state.categories
        );
      }
    );
  };
  showCategories = (categories, selfEmployed) => {
    this.setState(
      {
        categories: categories && categories,
      },
      () => {}
    );
    this.props.showCompany(
      this.state.selfEmployed,
      this.state.street,
      this.state.pcode,
      this.state.city,
      this.state.company,
      this.state.categories
    );
  };
  addAddress = (add) => {
    this.setState(
      {
        street: add.street && add.street,
        pcode: add.pcode && add.pcode,
        city: add.city && add.city,
      },
      () =>
        this.props.showCompany(
          this.state.selfEmployed,
          this.state.street,
          this.state.pcode,
          this.state.city,
          this.state.company,
          this.state.categories
        )
    );
  };
  onChangeCheck = () => {
    this.setState({ selfEmployed: !this.state.selfEmployed });
  };
  render() {
    return (
      <Form>
        <CheckBox
          style={styles.selfEmployed}
          checked={this.state.selfEmployed}
          onPress={() => this.onChangeCheck()}
        />
        <View style={{ top: 20, left: 35 }}>
          <Text style={styles.checkText}>Selbständig</Text>
        </View>
        {this.state.selfEmployed === true ? (
          <View style={styles.category}>
            <MaterialCommunityIcons
              style={styles.categoryIcon}
              name="briefcase-plus"
              size={24}
              color="black"
            />
            <Categories showCategories={this.showCategories} />
          </View>
        ) : (
          <Item>
            <Icon active name="ios-business" />
            <Company showCompanies={this.showCompanies} />
          </Item>
        )}
        {this.state.selfEmployed === true ? (
          <RegisterAddress addAddress={this.addAddress} />
        ) : (
          []
        )}
      </Form>
    );
  }
}
const styles = StyleSheet.create({
  selfEmployed: {
    marginLeft: 10,
  },
  checkText: {
    position: "relative",
    marginTop: -38,
    paddingHorizontal: 50,
  },
  category: {
    ...Platform.select({
      ios: {
        top: 10,
        padding: 30,
        borderBottomColor: "black",
        borderBottomWidth: 0.25,
      },
      android: {
        top: 10,
        padding: 10,
        borderBottomColor: "black",
        borderBottomWidth: 0.25,
      },
    }),
  },

  categoryIcon: {
    position: "absolute",
    top: 15,
    paddingLeft: 13.5,
  },
});
