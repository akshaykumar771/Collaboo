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
  Label,
  Button,
} from "native-base";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
class ViewAppointmentsScreen extends Component {
  constructor(props) {
    super(props);
    console.log("token", props.token);
    this.state = {
      isLoading: false,
      customerAppointments: [],
    };
  }
  componentDidMount() {
    if (this.props.token) {
      //console.log(props.token)
      this.makeRemoteRequest();
    }
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/customer/appointments";
    const bearer = "Bearer " + this.props.token;
    // console.log("bearer", bearer);
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          return response.json();
        } else if (status === 204) {
          Alert.alert(
            "No Appointments Found",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      })
      .then(async (responseJson) => {
        console.log("CUSTOMER RESPONSE", responseJson);
        this.setState({
          customerAppointments: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  navigateToChat = (item) => {
    console.log("item naviagte", item)
    if(item.craftsmenid != undefined){
      console.log("user details", item.craftsmenid, item.agentid)
    this.props.navigation.navigate("SingleChat", {
      name: item.craftsmenid.fname,
      userId: item.craftsmenid._id,
    })
  }
  else if (item.agentid != undefined)
  {
    this.props.navigation.navigate("SingleChat", {
    name: item.agentid.fname,
    userId: item.agentid._id,
  })

  }
  };
  render() {
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          {this.state.customerAppointments &&
            this.state.customerAppointments.map((item) => {
              {
                console.log("inside render", item);
              }
              return (
                <Card style={styles.card}>
                  <CardItem style={{ backgroundColor: "#f5f5f5" }}>
                    <Body>
                      <Label style={{ color: "grey" }}>Title</Label>
                      <Text style={styles.cardText}>{item.title}</Text>
                      {item.craftsmenid ? (
                        <View>
                          <Label style={{ color: "grey" }}>Craftsmen</Label>
                          <Text style={styles.cardText}>
                            {item.craftsmenid.fullname}
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Label style={{ color: "grey" }}>Agent</Label>
                          <Text style={styles.cardText}>
                            {item.agentid.fullname}
                          </Text>
                        </View>
                      )}

                      <Label style={{ color: "grey" }}>Status</Label>
                      <Text style={styles.cardText}>{item.status}</Text>
                    </Body>
                    <Right>
                      <View>
                        <Icon
                          style={styles.chatIcon}
                          name="ios-chatboxes"
                          onPress={() => this.navigateToChat(item)}
                        />
                      </View>
                      <View style={{ top: 40 }}>
                        {item.status === "CANCELLED" ? (
                          <Icon style={styles.iconClose} name="ios-close" />
                        ) : (
                          []
                        )}
                      </View>
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
});
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  iconCheck: {
    fontSize: 60,
    color: "green",
    textAlign: "center",
    alignItems: "center",
  },
  iconClose: {
    fontSize: 60,
    color: "red",
    textAlign: "center",
    alignItems: "center",
  },
  chatIcon: {
    fontSize: 40,
    color: Colors.primary,
    textAlign: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    lineHeight: 40,
    textAlign: "justify",
    // color: Colors.primary,
    fontWeight: "900",
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

export default connect(mapStateToProps, null)(ViewAppointmentsScreen);
