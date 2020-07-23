
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

export default class RejectedAppointmentCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
         <Content style={{padding: 10}}>
         {this.props.rejectedAppointments && this.props.rejectedAppointments.map((item) => {
             console.log(item.title)
             return (
             <Card style={styles.card}>
             <CardItem style = {{backgroundColor:'#f5f5f5'}}>
               <Body>
               <Label style={{color: 'grey'}}>Title of the Request</Label>
                   <Text style={styles.cardText}>
                       {item.title}
                   </Text>
                   <Label style={{color: 'grey'}}>Customer Name</Label>
                   <Text style={styles.cardText}>
                       {item.customerid.fullname}
                   </Text>
                   <Label style={{color: 'grey'}}>Craftsmen Name</Label>
                   <Text style={styles.cardText}>
                       {item.customerid.fullname}
                   </Text>
               </Body>
              </CardItem>
            </Card>);
         })}
           
         </Content>
       </Container>
         )
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
      padding: 10,
      backgroundColor: "#f5f5f5",
      marginBottom: 10
    
    },
})