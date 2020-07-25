import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Picker } from "react-native";
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
  Label,
  Button,
} from "native-base";
import Colors from "../constants/Colors";
import { connect } from "react-redux";
//import Picker from 'react-native-picker-select';
class AgentNewAppointmentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false,
      dataSource: [],
      selectedCraftsmen: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.makeRemoteRequest();
    }, 4000);
  }
  shouldComponentUpdate(nextProps) {
    console.log(nextProps.token, this.props.token);
    if (nextProps.token == this.props.token) {
      this.makeRemoteRequest();
    }
    return true;
  }

  makeRemoteRequest = () => {
    console.log("makeremoterequest");
    const url = "http://81.89.193.99:3001/api/company/search/craftsmen";
    const bearer = "Bearer " + this.props.token;
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
      .then((response) => response.json())
      .then((responseJson) => {
    
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
        console.log("checkkk craftsmen name", this.state.dataSource);
      })

      .catch((error) => {
        console.error(error);
      });
  };
  selectedValue = (itemValue, index) => {
    console.log("item", itemValue, index);
    let selectedItem = this.state.selectedCraftsmen;
    selectedItem[index] = itemValue;
    // console.log("this.state", selectedItem)
    this.setState({
      selectedCraftsmen: selectedItem,
    });
    console.log("this.state", this.state.selectedCraftsmen)
  };
  assignTask = (item,index) => {
    console.log("button item", item.appointmentid);
    const url = `http://81.89.193.99:3001/api/${this.props.role}/appointments/${item._id}`;
    const bearer = "Bearer " + this.props.token;
    const data = {
      craftsmenid: this.state.selectedCraftsmen[index]
    };
    console.log("url", url)
    console.log("data agent", data)
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response after update", responseJson);
        this.props.makeRemoteRequest();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    //console.log("props", this.state.selectedCraftsmen.length);
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          {this.props.appointments &&
            this.props.appointments.map((item, index) => {
              console.log("appointments", item);
              return (
                <Card style={styles.card} key={index}>
                  <CardItem style={{ backgroundColor: "#f5f5f5" }}>
                    <Body>
                      <Label style={{ color: "grey" }}>Title</Label>
                      <Text style={styles.cardText}>{item.title}</Text>
                      <Label style={{ color: "grey" }}>Customer Name</Label>
                      <Text style={styles.cardText}>
                        {item.customerid.fullname}
                      </Text>
                      {item.craftsmenid !=undefined ?
                      (
                        (<View>
                        <Text style={{color:'orange'}}>Waiting for craftsmen confirmation</Text>
                      </View>)
                      ) : (
                        <Picker
                        style={styles.picker}
                        mode="dropdown"
                        placeholder="Select Craftsmen"
                        selectedValue={this.state.selectedCraftsmen[index]}
                        onValueChange={(itemValue) => {
                          this.setState({
                            craftsmen: itemValue,
                          });
                          this.selectedValue(itemValue, index);
                        }}
                      >
                        <Picker.Item label="Select Craftsmen" />
                        {this.state.dataSource &&
                          this.state.dataSource.length > 0 &&
                          this.state.dataSource.map((item, key) => (
                            <Picker.Item
                              label={item.fullname}
                              value={item._id}
                              key={item._id}
                            />
                          ))}
                      </Picker>
                      ) }
                      
                    </Body>
                    <Right>
                      <Button
                        rounded
                        style={styles.addButton}
                        onPress={() => {
                         this.assignTask(item,index)
                        }}
                      >
                      
                        <Icon style={styles.iconCheck} name="ios-checkmark"/>
                      </Button>
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
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  role: state.userReducer.userRole,
});
const styles = StyleSheet.create({
  picker: {
    flex: 1,
    width: 190,
  },
  addButton: {
    backgroundColor: "#f5f5f5",
    borderColor: "black",
  },
  iconCheck: {
    fontSize: 60,
    color: "green",
    textAlign: "center",
    alignItems: "center",
  },
  iconClose: {
    fontSize: 40,
    color: "red",
  },
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
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
  },
});
export default connect(mapStateToProps, null)(AgentNewAppointmentCard);
