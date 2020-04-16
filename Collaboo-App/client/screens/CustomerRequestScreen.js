import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, TextInput } from "react-native";
import SearchCraftsmen from "../components/SearchCraftsmen";

export default class CustomerRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return( 
    <View style = {{flex: 1}}>
    <SearchCraftsmen />
    </View>
    );
  }
}

const styles = StyleSheet.create({});
