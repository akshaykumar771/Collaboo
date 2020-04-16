import React, { Component } from "react";
import { StyleSheet, View, Button, Text} from "react-native";
import { Container, Content, Form, Item, Input, Label, Picker } from "native-base";
import { Formik } from "formik";
import Colors from "../constants/Colors";
export default class RegisterCraftsmen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
  return (
    <Formik
      initialValues={{
        company:"",
      }}
    >
      {(props) => {
        return (

          <Form>
            <Item stackedLabel>
              <Label>Company</Label>
              <Input  placeholder="Enter your Company name"
                value={props.values.company}
                onChangeText={props.handleChange("company")}/>
            </Item>
            {props.touched.company && props.errors.company &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.company}</Text> }
            </Form>
       
        );
      }}
    </Formik>
  );
    }
}
