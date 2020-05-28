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
