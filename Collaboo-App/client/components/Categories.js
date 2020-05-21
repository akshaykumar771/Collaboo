import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import PickerCheckBox from "react-native-picker-checkbox";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  handleConfirm(pItems) {
    console.log("pItems =>", pItems);
    this.setState({ categories: pItems });
    this.props.showCategories(this.state);
  }

  render() {
    const items = [
      {
        itemKey: 1,
        itemDescription: "HEATING",
      },
      {
        itemKey: 2,
        itemDescription: "DISH WASHER",
      },
      {
        itemKey: 3,
        itemDescription: "WASHING MACHINE",
      },
      {
        itemKey: 4,
        itemDescription: "PLUMBING",
      },
    ];
    return (
      <PickerCheckBox
        style={styles.picker}
        data={items}
        headerComponent={<Text style={{ fontSize: 25 }}>items</Text>}
        OnConfirm={(pItems) => this.handleConfirm(pItems)}
        ConfirmButtonTitle="OK"
        DescriptionField="itemDescription"
        KeyField="itemKey"
        placeholder="Choose your Specializations"
        arrowColor="#FFD740"
        arrowSize={10}
        placeholderSelectedItems="$count items selected"
      />
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    marginLeft: 20,
  },
});
