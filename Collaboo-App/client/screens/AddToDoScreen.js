import React, { Component } from "react";
import { View, StyleSheet, Button} from "react-native";
import DatePicker from "../components/DatePicker";
import StatusPicker from "../components/StatusPicker";
import CustomerPicker from "../components/CustomerPicker";
import SearchLocation from "../components/SearchLocation";
import EmployeePicker from "../components/EmployeePicker";
import { Container, Content, Form, Item, Input, Label } from "native-base";
import Colors from '../constants/Colors';
class AddToDoScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content scrollEnabled={false}>
          <Form>
            <Item stackedLabel>
              <Label>Title of the Task</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Description</Label>
              <Input/>
            </Item>
          </Form>
          <View style={styles.beginDate}>
            <Label>Beginning of Task</Label>
            <DatePicker />
          </View>
          <View style={styles.beginDate}>
            <Label>End of Task</Label>
            <DatePicker />
          </View>
          <View style={styles.statusPicker}>
          <StatusPicker />
          </View>
          <View style={styles.statusPicker}>
          <CustomerPicker />
          </View>
          <View style={styles.statusPicker}>
          <EmployeePicker />
          </View>
          <SearchLocation />
        </Content>
        <View style={styles.buttonContainer}>
        <Button title="Add Task" />
        </View>
      </Container>
    );
  }
}

AddToDoScreen.navigationOptions = {
  headerTitle: "Add To Do"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  beginDate: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  statusPicker: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  buttonContainer:{
    backgroundColor: Colors.primary
  }
});

export default AddToDoScreen;
