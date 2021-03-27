import React from "react";
import { View, Button } from "react-native";
import { Container, Content, Form, Item, Input, Label } from "native-base";
const AddCustomerDetail = (props) => {
  return (
    <Container>
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Straße</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Stadt</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>PLZ</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Bundesland</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Land</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Beschreibung</Label>
            <Input />
          </Item>
        </Form>
      </Content>
      <View>
        <Button title="Füge Kunden hinzu" />
      </View>
    </Container>
  );
};

export default AddCustomerDetail;
