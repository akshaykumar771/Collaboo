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
        <Content>
        {this.props.appointments && this.props.appointments.map((item) => {
            console.log(item.title)
            return (
            <Card>
            <CardItem>
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
                <Icon style={styles.icon} name="ios-checkmark" />
                <Icon style={styles.icon} name="ios-close" />
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
    icon:{
        fontSize: 40,
        color: Colors.primary
    },
    cardText:{
       fontSize: 18, 
       lineHeight: 40,
       textAlign: 'justify'
    }
})