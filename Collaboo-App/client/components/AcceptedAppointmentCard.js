import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Body,
  Label
} from "native-base";
import Colors from "../constants/Colors";

export default class AcceptedAppointmentCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content>
        {this.props.acceptedAppoinments.map((item) => {
          return(
            <Card>
            <CardItem>
              <Body>
                <Label style ={{color: 'grey'}}>Title</Label>
                <Text style={styles.cardText}>{item.title}</Text>
                <Label style ={{color: 'grey'}}>Customer Name</Label>
                <Text style={styles.cardText}>{item.customerid.fullname}</Text>
                <Label style ={{color: 'grey'}}>Customer Address</Label>
                <Text style={styles.cardText}>Customer Address</Text>
              </Body>
            </CardItem>
          </Card>
          )
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
    }
})