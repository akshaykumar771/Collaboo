import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Label,
  Thumbnail,
  Text,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import Colors from "../constants/Colors";
import moment from "moment";
export default class InProcessAppointments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          {this.props.inProcessAppointments &&
            this.props.inProcessAppointments.map((item) => {
              {
                console.log("props inprocess", item);
              }
              const formatedStartDate = moment(item.apntdatime).format(
                "dddd, MMM DD at HH:mm a"
              );
              return (
                <Card style={styles.card}>
                  <CardItem style={{ backgroundColor: "#f5f5f5" }}>
                    <Left>
                      <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.customerid.fullname}</Text>
                      </Body>
                    </Left>
                    <Right>
                        <Body style={{left: 40}}>
                        <Button title="Close"/>
                        </Body>
                    </Right>
                  </CardItem>
                  <CardItem cardBody style={{ backgroundColor: "#f5f5f5" }}>
                    <Text style={{ left: 23, flexWrap: "wrap" }}>
                      {item.description}
                    </Text>
                  </CardItem>
                  <CardItem style={{ backgroundColor: "#f5f5f5"}}>
                    <Left>
                      <Icon active name="md-calendar" />
                      <Text style={{color: 'orange'}}>{formatedStartDate}</Text>
                    </Left>
                    <Right>
                    <Text style={{color: 'orange'}}>{item.service.catname}</Text>
                    </Right>
                  </CardItem>
                </Card>
              );
            })}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardText: {
    fontSize: 18,
    lineHeight: 40,
    textAlign: "justify",
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
    marginBottom: 10,
  },
});
