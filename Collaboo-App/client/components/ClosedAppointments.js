import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Header, Content, Card, CardItem,Label, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Colors from "../constants/Colors";

export default class ClosedAppointments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <Container>
        <Content style={{padding: 10}}>
        {this.props.closedAppointments && this.props.closedAppointments.map((item) => {
            {console.log("props inprocess", item)}
            
            return(
            <Card style={styles.card}>
            <CardItem style = {{backgroundColor:'#f5f5f5'}}>
              <Left>
                <Body>
                  <Text>{item.title}</Text>
                  <Text note>{item.customerid.fullname}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody style = {{backgroundColor:'#f5f5f5'}}>
              <Text style={{left: 23 , flexWrap: 'wrap'}}>{item.description}</Text>
            </CardItem>
            <CardItem style = {{backgroundColor:'#f5f5f5'}}>
              <Left>
                <Button transparent>
                  <Icon active name="md-calendar" />
                  <Text>{item.apntdatime}</Text>
                </Button>
              </Left>
              <Right>
                <Text>{item.service.catname}</Text>
              </Right>
            </CardItem>
          </Card>);
        })}
        </Content>
      </Container>
    );
  }
}

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