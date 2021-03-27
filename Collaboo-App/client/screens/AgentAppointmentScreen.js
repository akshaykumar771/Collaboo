import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import AgentNewAppointmentCard from "../components/AgentNewAppointmentCard";
import AgentRejectedAppointment from "../components/AgentRejectedAppointment";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
class AgentAppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      test: "",
      appointments: [],
      acceptedAppointments: [],
      rejectedAppointments: [],
    };
  }
  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.token != this.props.token) {
      this.makeRemoteRequest();
    }
    return true;
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/agent/appointments";
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
            "Keine Termine gefunden",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          return;
        }
      })
      .then(async (responseJson) => {
        let newAppointments = [];
        let rejectedAppointments = [];
        const defaultResponse =
          (await responseJson) &&
          responseJson.map((item) => {
            if (
              item.status === "OPEN" &&
              item.crafconfirmation === "DEFAULT" &&
              item.custconfirmation === "DEFAULT"
            ) {
              newAppointments.push(item);
            } else if (
              item.status === "CANCELLED" &&
              item.crafconfirmation === "NO" &&
              item.custconfirmation === "DEFAULT"
            ) {
              rejectedAppointments.push(item);
            } else if (item.craftsmenid) {
              this.setState({});
            }
          });
        this.setState({
          appointments: newAppointments,
          rejectedAppointments: rejectedAppointments,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <View style={styles.screen}>
        <NavigationEvents onDidFocus={() => this.makeRemoteRequest()} />
        <Container>
          <Tabs style={{ backgroundColor: "white" }}>
            <Tab heading="Neu">
              <AgentNewAppointmentCard
                appointments={this.state.appointments}
                makeRemoteRequest={this.makeRemoteRequest}
              />
            </Tab>
            <Tab heading="Abgelehnt">
              <AgentRejectedAppointment
                rejectedAppointments={this.state.rejectedAppointments}
              />
            </Tab>
          </Tabs>
        </Container>
      </View>
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
});

export default connect(mapStateToProps, null)(AgentAppointmentScreen);
