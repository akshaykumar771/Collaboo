import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from "native-base";

export default class WorkLogCard extends Component {
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
                <Text style={styles.cardText}>Name of the Task</Text>
                <Text style={styles.cardText}>Number of Hours worked</Text>
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