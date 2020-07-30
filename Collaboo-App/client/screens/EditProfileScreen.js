import React, { Component } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Picker,
  Icon,
  Label
} from "native-base";
import { connect } from "react-redux";
import FormButton from "../components/FormButton";
class EditProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            response: "",
            fname: "",
            lname: "",
            email: "",
            phno: "", 
            city:"",
            street:"",
            pcode:""
        }
    }
    componentDidMount(){
        if(this.props.token){
            this.makeRemoteRequest()
        }
    }
    makeRemoteRequest = () => {
        const url = "http://81.89.193.99:3001/api/user/me";
    const bearer = "Bearer " + this.props.token;
    // console.log("bearer", bearer);
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
      .then((response) => {
        console.log("Response 1", response);
        const status = response.status;
        if (status === 200) {
          console.log("Response in 200", response);
          return response.json();
        } else if (status === 204) {
          console.log("Response in 204", response);
          Alert.alert(
            "Error",
            "Could not read your profile",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      })
      .then((responseJson) => {
        console.log("response from edit profile :", responseJson);
        this.setState({
            response: responseJson,
            fname: responseJson.fname,
            lname: responseJson.lname,
            email: responseJson.email,
            phno: responseJson.phno,
        })
        if(responseJson.role === "CUSTOMER" || responseJson.selfemployed === true ){
            this.setState({
                city: responseJson.address.city,
                street: responseJson.address.street,
                pcode: responseJson.address.pcode
            })
        }
        console.log("data source state", this.state.dataSource);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    render(){
        return(
        <Container>
        <Content style={{ paddingVertical: 15 }}>
          <Form>
            <Item stackedLabel>
            <Label>First Name</Label>
              <Input
                placeholder="First Name"
                value={this.state.fname}
                autoCapitalize="none"
              />
            </Item>
            <Item stackedLabel>
            <Label>Last Name</Label>
              <Input
                placeholder="Last Name"
                value={this.state.lname}
              />
            </Item>
            <Item stackedLabel>
            <Label>Email</Label>
              <Input
              style={{color:"grey"}}
                disabled={true}
                placeholder="Email"
                value={this.state.email}
              />
            </Item>
            <Item stackedLabel>
            <Label>Mobile</Label>
              <Input
              keyboardType="numeric"
                placeholder="Mobile Number"
                value={this.state.phno}
              />
            </Item>
            <Item stackedLabel>
            <Label>Password</Label>
              <Input
                secureTextEntry = {true}
                placeholder="Password"
                value={this.state.phno}
              />
            </Item>
            {this.state.response.role === "CUSTOMER" || this.state.response.selfemployed === true ? (
                <View>
                <Item stackedLabel>
            <Label>Street</Label>
              <Input
                placeholder="Street"
                value={this.state.street}
              />
            </Item>
            <Item stackedLabel>
            <Label>PLZ</Label>
              <Input
                placeholder="Plz"
                keyboardType="numeric"
                value={this.state.pcode}
              />
            </Item>
            <Item stackedLabel>
            <Label>City</Label>
              <Input
                placeholder="City"
                value={this.state.city}
              />
            </Item>
            </View>
            ) : this.state.response.role === "AGENT" ? (
                <View>
                <Item stackedLabel>
            <Label>Street</Label>
              <Input
                placeholder="Street"
                value={this.state.response.compid.address.street}
              />
            </Item>
            <Item stackedLabel>
            <Label>Plz</Label>
              <Input
                placeholder="Plz"
                value={this.state.response.compid.address.pcode}
              />
            </Item>
            <Item stackedLabel>
            <Label>City</Label>
              <Input
                placeholder="City"
                value={this.state.response.compid.address.city}
              />
            </Item>
            </View>
            ) : []}
          </Form>

          <View>
            <FormButton
              buttonType="outline"
              //onPress={this.handleSubmit}
              title="Done"
              buttonColor="#039BE5"
            />
          </View>
        </Content>
      </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    token: state.userReducer.token,
  });

  export default connect(mapStateToProps, null) (EditProfileScreen);