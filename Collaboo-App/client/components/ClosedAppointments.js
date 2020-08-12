import React, { Component } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { Container, Header, Content, Card, CardItem,Label, Thumbnail, Text, Icon, Left, Body, Right } from 'native-base';
import Colors from "../constants/Colors";
import moment from "moment";
import 'moment-timezone';
import { connect } from "react-redux";
class ClosedAppointments extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    //console.log(nextProps.token, this.props.token);
    if (nextProps.token != this.props.token) {
      this.makeRemoteRequest();
    }
    return true;
  }
  reOpenTask = async (item) => {
    await this.setState({
      appointmentid: item._id
    })
    const url = `http://81.89.193.99:3001/api/${this.props.role}/appointments/${this.state.appointmentid}`;
    console.log("url", url)
    const bearer = "Bearer " + this.props.token;
    console.log("bearer", bearer)
    const data = {
        status: 'REOPENED'
    };
    console.log("data", data)
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response after update", responseJson);
        Alert.alert(
          "Success",
          "Check your task in the Inprocess tab",
          [{ text: "OK", onPress: () => console.log("OK") }],
          { cancelable: true }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
    <Container>
        <Content style={{padding: 10}}>
        {this.props.closedAppointments && this.props.closedAppointments.map((item) => {
            {console.log("props inprocess", item)}
            const formatedStartDate = moment(item.apntdatime).format(
                "dddd, MMM DD at HH:mm a"
              );
              const startDate = moment(formatedStartDate)
              startDate.tz('Europe/Berlin').format('ha z')
              console.log("startdate", startDate)
            return(
            <Card style={styles.card}>
            <CardItem style = {{backgroundColor:'#f5f5f5'}}>
              <Left>
                <Body>
                  <Text>{item.title}</Text>
                  <Text note>{item.customerid.fullname}</Text>
                </Body>
              </Left>
              <Right>
                        <Body style={{left: 40}}>
                        <Button title="Re-Open" onPress={() => this.reOpenTask(item)}/>
                        </Body>
                    </Right>
            </CardItem>
            <CardItem cardBody style = {{backgroundColor:'#f5f5f5'}}>
              <Text style={{left: 23 , flexWrap: 'wrap'}}>{item.description}</Text>
            </CardItem>
            <CardItem style = {{backgroundColor:'#f5f5f5'}}>
              <Left>
                  <Icon active name="md-calendar" />
                  <Text>{formatedStartDate}</Text>
              </Left>
            </CardItem>
          </Card>);
        })}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  role: state.userReducer.userRole,
});
const styles = StyleSheet.create({
    cardText:{
       fontSize: 18, 
       lineHeight: 40,
       textAlign: 'justify'
    },
    card: {
      top: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      borderRadius: 12,
      borderColor: "black",
      padding: 20,
      backgroundColor: "#f5f5f5",
      marginBottom: 10
    
    },
})
export default connect(mapStateToProps, null)(ClosedAppointments)