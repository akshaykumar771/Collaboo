import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Colors from '../constants/Colors';
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
// import Tab3 from './tabThree';
export default class ToDoTabs extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="In Process">
           
          </Tab>
          <Tab heading="Open Tasks">
            
          </Tab>
          <Tab heading="Completed">
            
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  Tabs: {
    backgroundColor: Colors.primary
  }
})