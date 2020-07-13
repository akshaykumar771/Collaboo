import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Label } from 'native-base';
import Colors from '../constants/Colors';
export default class AppointmentCard extends Component {
    constructor(props){
        super(props);
        console.log("props in new", this.props.appointments)
        this.state = {
            accepted: false
        }
    }
    render() {
        return (
     <Container>
        <Content style={{padding: 10}}>
        {this.props.appointments && this.props.appointments.map((item) => {
            console.log(item.title)
            return (
            <Card style={styles.card}>
            <CardItem style = {{backgroundColor:'#f5f5f5'}}>
              <Body>
              <Label style={{color: 'grey'}}>Title</Label>
                  <Text style={styles.cardText}>
                      {item.title}
                  </Text>
                  <Label style={{color: 'grey'}}>Customer Name</Label>
                  <Text style={styles.cardText}>
                      {item.customerid.fullname}
                  </Text>
              </Body>
              <Right>
                <Icon style={styles.iconCheck} name="ios-checkmark" />
                <Icon style={styles.iconCancel} name="ios-close" />
              </Right>
             </CardItem>
           </Card>);
        })}
          
        </Content>
      </Container>
        )
    }
}

const styles = StyleSheet.create({
    iconCheck:{
        fontSize: 40,
        color: "green"
    },
    iconCancel:{
        fontSize: 40,
        color: "red"
    },
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
        padding: 10,
        backgroundColor: "#f5f5f5",
        marginBottom: 10
      
      },
})