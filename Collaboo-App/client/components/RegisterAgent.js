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
import Categories from "./Categories";
import RegisterAddress from "./RegisterAddress";

export default class RegisterAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      categories: [],
      selfEmployed: false,
      street: "",
      pcode: "",
      city: "",
    };
  }

  showCompanies = (name) => {
    //console.log("---------", name[0].compname)
    this.setState(
      {
        company: name[0].compname,
      },
      //console.log("----", this.state),
      () => this.props.showAgentDetails(this.state.company)
    );
  };
  showCategories = (categories) => {
    this.setState(
      {
        categories: categories && categories,
      },
      //console.log("//////", this.state),
      () => this.props.showAgentDetails(this.state.category)
    );
  };
  addAddress = (add) => {
    this.setState(
      {
        street: add.street,
        pcode: add.pcode,
        city: add.city,
      },
      //console.log("++++++", this.state),
      () =>
        this.props.showAgentDetails(
          this.state.street,
          this.state.pcode,
          this.state.city,
          this.state.company,
          this.state.categories,
        )
    );
  };
  render() {
    return (
      <Form>
       <Item>
            <Icon active name="ios-business" />
            <Input placeholder=" Enter your Company Name"
                    onChangeText={(text) => {
                      this.setState({ company: text });
                    }}
                    value={this.state.company}/>
          </Item> 
        <View style={styles.category}>
          <Categories showCategories={this.showCategories} />
        </View>
        <RegisterAddress addAddress={this.addAddress} />
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
    marginTop: -25,
    paddingHorizontal: 50,
  },
  category: {
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 0.25,
  },
});
