import React, { Component } from "react";
import { Form, Item, Input, Icon } from "native-base";
export default class RegisterAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      pcode: "",
      city: "",
    };
  }
  handleChange = () => {
    this.props.addAddress(this.state);
  };

  render() {
    return (
      <Form>
        <Item style={{ paddingVertical: 10 }}>
          <Icon active name="home" />
          <Input
            placeholder="Adresse"
            onChangeText={(text) =>
              this.setState({ street: text }, () => this.handleChange())
            }
            value={this.state.street}
          />
        </Item>
        <Item style={{ paddingVertical: 10 }}>
          <Icon active name="ios-pin" />
          <Input
            placeholder="Postalzeit"
            keyboardType="numeric"
            onChangeText={(text) =>
              this.setState({ pcode: text }, () => this.handleChange())
            }
            value={this.state.pcode}
          />
        </Item>
        <Item style={{ paddingVertical: 10 }}>
          <Icon active name="ios-globe" />
          <Input
            placeholder="Stadt"
            onChangeText={(text) =>
              this.setState({ city: text }, () => this.handleChange())
            }
            value={this.state.city}
          />
        </Item>
      </Form>
    );
  }
}
