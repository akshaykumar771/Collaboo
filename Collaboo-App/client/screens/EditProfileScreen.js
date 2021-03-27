import React, { Component } from "react";
import { StyleSheet, View, Alert, TextInput } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Picker,
  Icon,
  Label,
} from "native-base";
import { connect } from "react-redux";
import FormButton from "../components/FormButton";
class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      fname: "",
      lname: "",
      email: "",
      phno: "",
      street: "",
      city: "",
      pcode: "",
      password: "",
    };
  }
  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/user/me";
    const bearer = "Bearer " + this.props.token;
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
      .then((response) => {
        console.log("Response 1", response);
        const status = response.status;
        if (status === 200) {
          return response.json();
        } else if (status === 204) {
          Alert.alert(
            "Error",
            "Could not read your profile",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      })
      .then((responseJson) => {
        this.setState({
          response: responseJson,
          fname: responseJson.fname,
          lname: responseJson.lname,
          email: responseJson.email,
          phno: responseJson.phno,
          password: responseJson.password,
        });
        if (
          responseJson.role === "CUSTOMER" ||
          responseJson.selfemployed === true
        ) {
          this.setState({
            city: responseJson.address.city,
            street: responseJson.address.street,
            pcode: responseJson.address.pcode,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  handleUpdate = () => {
    const url = "http://81.89.193.99:3001/api/user/me";
    const bearer = "Bearer " + this.props.token;
    let address = { street: "", city: "", pcode: "" };
    (address.street = this.state.street),
      (address.city = this.state.city),
      (address.pcode = this.state.pcode);
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      phno: this.state.phno,
      password: this.state.password,
      address: address,
    };

    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(
          "Erfolg",
          "Profil erfolgreich aktualisiert",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Container>
        <Content style={{ paddingVertical: 15 }}>
          <Form>
            <Item stackedLabel>
              <Label>Vorname</Label>
              <Input
                placeholder="Vorname"
                value={this.state.fname}
                autoCapitalize="none"
                onChangeText={(text) => {
                  this.setState({ fname: text });
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Nachname</Label>
              <Input
                placeholder="Nachname"
                value={this.state.lname}
                onChangeText={(text) => {
                  this.setState({ lname: text });
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                style={{ color: "grey" }}
                disabled={true}
                placeholder="Email"
                value={this.state.email}
              />
            </Item>
            <Item stackedLabel>
              <Label>Telefon-/Mobilfunknummer</Label>
              <Input
                keyboardType="numeric"
                placeholder="Telefon-/Mobilfunknummer"
                value={this.state.phno}
                onChangeText={(text) => {
                  this.setState({ phno: text });
                }}
              />
            </Item>
            {this.state.response.role === "CUSTOMER" ||
            this.state.response.selfemployed === true ? (
              <View>
                <Item stackedLabel>
                  <Label>Straße</Label>
                  <Input
                    placeholder="Straße"
                    value={this.state.street}
                    onChangeText={(text) => {
                      this.setState({ street: text });
                    }}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>PLZ</Label>
                  <Input
                    textContentType="postalCode"
                    placeholder="Plz"
                    keyboardType="numeric"
                    value={this.state.pcode.toString()}
                    onChangeText={(text) => {
                      this.setState({ pcode: text });
                    }}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Stadt</Label>
                  <Input
                    placeholder="Stadt"
                    value={this.state.city}
                    onChangeText={(text) => {
                      this.setState({ city: text });
                    }}
                  />
                </Item>
              </View>
            ) : this.state.response.role === "AGENT" ? (
              <View>
                <Item stackedLabel>
                  <Label>Straße</Label>
                  <Input
                    placeholder="Straße"
                    value={this.state.response.compid.address.street}
                    onChangeText={(text) => {
                      this.setState({ street: text });
                    }}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Plz</Label>
                  <Input
                    placeholder="Plz"
                    value={this.state.response.compid.address.pcode}
                    onChangeText={(text) => {
                      this.setState({ pcode: text });
                    }}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Stadt</Label>
                  <Input
                    placeholder="Stadt"
                    value={this.state.response.compid.address.city}
                    onChangeText={(text) => {
                      this.setState({ city: text });
                    }}
                  />
                </Item>
              </View>
            ) : (
              []
            )}
          </Form>

          <View>
            <FormButton
              buttonType="outline"
              onPress={this.handleUpdate}
              title="Fertig"
              buttonColor="#039BE5"
            />
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps, null)(EditProfileScreen);
