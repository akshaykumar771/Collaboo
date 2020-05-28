import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { Picker } from "native-base";
export default class AppointmentPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      catagoryValues: [],
      selectedValue: "",
    };
  }
  componentDidMount = () => {
      this.fetchCategory();
  }
    //First method to be called after components mount
    //fetch the data from the server for the suggestion
  fetchCategory = () => {
    fetch("http://81.89.193.99:3001/api/category", {
        method: "GET",
        "Content-Type": "application/json",
        Accept: "application/json",
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
            },
            function () {
              // In this block you can do something with new state.
            }
          );
        })
        .catch((error) => {
          console.error(error);
        });
  }
  handleChange = (value) => {
    this.setState({ selectedValue: value, categoryValues: value }, () => {
      this.props.showPicker(this.state.categoryValues);
    });
  };
  render() {
    // let myCategories = this.state.dataSource.map((myValue, myIndex) => {
      
    // });
    // console.log("cat",myCategories)
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Picker
        selectedValue={this.state.selectedValue}
        onValueChange={(value) => {
          this.handleChange;
        }}
      >
      {this.state.dataSource && this.state.dataSource.length ? this.state.dataSource.map((item, myIndex) => {
        return (
        <Picker.Item label={item.catname} value={myIndex} key={myIndex} />
      );
      }) : null}
        {/* {myCategories} */}
      </Picker>
    );
  }
}
