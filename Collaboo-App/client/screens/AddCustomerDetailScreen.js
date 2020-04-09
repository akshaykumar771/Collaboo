import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
const AddCustomerDetail = props => {
    return (
        <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Street</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>City</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Pin Code</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>State</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Country</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Description</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        <View>
        <Button title="Add Customer" />
        </View>
      </Container>
    )
};

const styles = StyleSheet.create({

});

export default AddCustomerDetail;