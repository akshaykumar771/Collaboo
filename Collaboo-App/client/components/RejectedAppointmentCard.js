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
} from "native-base";

export default class RejectedAppointmentCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text style={styles.cardText}>Title of the Request</Text>
                <Text style={styles.cardText}>Customer Name</Text>
              </Body>
            </CardItem>
          </Card>
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