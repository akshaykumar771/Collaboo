import React, { Component } from 'react';
import {Platform} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
export default class SearchBarExample extends Component {
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name={Platform.OS === 'android' ? 'md-locate' : 'ios-locate'} />
            <Input placeholder="Standort" />
          </Item>
          <Button transparent>
            <Text>Suche</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}