import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Body } from 'native-base';
import Colors from '../constants/Colors';
import Picker from 'react-native-picker-select';
export default class AgentNewAppointmentCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            accepted: false
        }
    }
    render() {
        return (
     <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                  <Text style={styles.cardText}>
                      Title of the Request
                  </Text>
                  <Text style={styles.cardText}>
                      Customer Name
                  </Text>
                  <Picker
                  items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
                />
              </Body>
              <Right>
                <Icon style={styles.icon} name="ios-checkmark" />
                <Icon style={styles.icon} name="ios-close" />
              </Right>
             </CardItem>
           </Card>
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