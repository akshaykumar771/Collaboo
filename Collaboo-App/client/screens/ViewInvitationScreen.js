import React, { Component } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Right,
  Body,
  Label,
} from "native-base";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import moment from "moment";
class ViewInvitationScreen extends Component {
  constructor(props) {
    super(props);
    console.log("token", props.token);
    this.state = {
      isLoading: false,
      customerAppointments: [],
      addDate: null,
      appointmentid: "",
    };
  }
  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  shouldComponentUpdate(nextProps) {
    console.log(nextProps.token, this.props.token);
    if (nextProps.token != this.props.token) {
      this.makeRemoteRequest();
    }
    return true;
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/customer/appointments";
    const bearer = "Bearer " + this.props.token;
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
            "Sorry",
            "No appointments found",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      })
      .then(async (responseJson) => {
        console.log("CUSTOMER RESPONSE", responseJson);
        let newInvitation = [];
        const response =
          (await responseJson) &&
          responseJson.map((item) => {
            if (
              item.status === "OPEN" &&
              item.crafconfirmation === "YES" &&
              item.custconfirmation === "DEFAULT"
            ) {
              newInvitation.push(item);
              this.setState({
                customerAppointments: newInvitation,
              });
            }
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  acceptAppointment = async (item) => {
    await this.setState({
      appointmentid: item._id,
    });
    console.log("appointmentid", this.state.appointmentid);
    const url = `http://81.89.193.99:3001/api/${this.props.role}/appointments/${this.state.appointmentid}`;
    console.log("url", url);
    const bearer = "Bearer " + this.props.token;
    console.log("bearer", bearer);
    const data = {
      custconfirmation: "YES",
    };
    console.log("data", data);
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response after update", responseJson);
        Alert.alert(
          "Success",
          "Contact craftsmen via chat to know more details",
          [{ text: "OK", onPress: () => this.makeRemoteRequest() }],
          { cancelable: true }
        );
        this.makeRemoteRequest();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  rejectAppointment = async (item) => {
    await this.setState({
      appointmentid: item._id,
    });
    const url = `http://81.89.193.99:3001/api/${this.props.role}/appointments/${this.state.appointmentid}`;
    console.log("url", url);
    const bearer = "Bearer " + this.props.token;
    console.log("bearer", bearer);
    const data = {
      custconfirmation: "NO",
    };
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(
          "Appointment Rejected",
          "Contact other craftsmen according to your requirement",
          [{ text: "OK", onPress: () => this.makeRemoteRequest() }],
          { cancelable: true }
        );
        this.makeRemoteRequest();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  rescheduleAppointment = async (item) => {
    await this.setState({
      appointmentid: item._id,
    });
    const url = `http://81.89.193.99:3001/api/${this.props.role}/appointments/${this.state.appointmentid}`;
    console.log("url", url);
    const bearer = "Bearer " + this.props.token;
    console.log("bearer", bearer);
    const data = {
      custconfirmation: "REQUEST_DATE_CHANGE",
    };
    console.log("data", data);
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response after update", responseJson);
        Alert.alert(
          "Success",
          "Please communicate with the craftsmen via chat for the suitable time"[
            { text: "OK", onPress: () => this.makeRemoteRequest() }
          ],
          { cancelable: false }
        );
        this.makeRemoteRequest();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          {this.state.customerAppointments &&
            this.state.customerAppointments.map((item) => {
              const formatedStartDate = moment(item.apntdatime).format(
                "dddd, MMM DD at HH:mm a"
              );
              const startDate = moment(formatedStartDate);
              startDate.tz("Europe/Berlin").format("ha z");
              console.log("inporces startdate", startDate);
              return (
                <Card style={styles.card}>
                  <CardItem style={{ backgroundColor: "#f5f5f5" }}>
                    <Body>
                      <Label style={{ color: "grey" }}>Titel</Label>
                      <Text style={styles.cardText}>{item.title}</Text>
                      {item.craftsmenid ? (
                        <View>
                          <Label style={{ color: "grey" }}>Handwerker</Label>
                          <Text style={styles.cardText}>
                            {item.craftsmenid.fullname}
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Label style={{ color: "grey" }}>Verwaltung</Label>
                          <Text style={styles.cardText}>
                            {item.agentid.fullname}
                          </Text>
                        </View>
                      )}
                      <Label style={{ color: "grey" }}>Status</Label>
                      <Text style={styles.cardText}>{item.status}</Text>
                      <Label style={{ color: "grey" }}>Datum und Zeit</Label>
                      <Text style={styles.cardText}>{formatedStartDate}</Text>
                    </Body>
                    <Right>
                      <View>
                        <TouchableOpacity
                          style={styles.closeBtn}
                          underlayColor="#fff"
                          onPress={() => this.acceptAppointment(item)}
                        >
                          <Text style={styles.closeBtnTxt}>Akzeptieren</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ top: 20 }}>
                        <TouchableOpacity
                          style={styles.closeBtn}
                          underlayColor="#fff"
                          onPress={() => this.rejectAppointment(item)}
                        >
                          <Text style={styles.closeBtnTxt}>Anlehnen</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ top: 40 }}>
                        <TouchableOpacity
                          style={styles.closeBtn}
                          underlayColor="#fff"
                          onPress={() => this.rescheduleAppointment(item)}
                        >
                          <Text style={styles.closeBtnTxt}>Verlegen</Text>
                        </TouchableOpacity>
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
  role: state.userReducer.userRole,
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
    fontSize: 40,
    color: "red",
    textAlign: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    lineHeight: 40,
    textAlign: "justify",
    fontWeight: "500",
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
  closeBtn: {
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginTop: 0,
        borderWidth: 1,
        borderColor: "black",
        width: 110,
        height: 50,
      },
      android: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginTop: 0,
        top: 0,
        borderWidth: 1,
        borderColor: "black",
        width: 110,
        height: 50,
      },
    }),
  },
  closeBtnTxt: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default connect(mapStateToProps, null)(ViewInvitationScreen);
