import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Header, Content, Tab, Tabs, Label } from "native-base";
import AgentNewAppointmentCard from "../components/AgentNewAppointmentCard";
import AgentRejectedAppointment from "../components/AgentRejectedAppointment";
import { connect } from "react-redux";
class AgentAppointmentScreen extends Component {
  constructor(props) {
    super(props);
    console.log("token", props.token);
    this.state = {
      isLoading: false,
      appointments: [],
      acceptedAppointments: [],
      rejectedAppointments: [],
    };
  }
  componentDidMount() {
    // if (this.props.token) {
    //   //console.log(props.token)
    //   this.makeRemoteRequest();
    // }
    setTimeout(() => {
          this.makeRemoteRequest();
        }, 3000);
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/agent/appointments";
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
        console.log("AGENT RESPONSE", responseJson);
        let newAppointments = [];
        let rejectedAppointments = [];
        const defaultResponse = await responseJson.map((item) => {
          if (
            item.status === "OPEN" &&
            item.crafconfirmation === "DEFAULT" &&
            item.custconfirmation === "DEFAULT"
          ) {
            newAppointments.push(item);
            this.setState({
              appointments: newAppointments,
            });
          } else if (
            item.status === "CANCELLED" &&
            item.crafconfirmation === "NO" &&
            item.custconfirmation === "DEFAULT"
          ) {
            rejectedAppointments.push(item);
            this.setState({
              rejectedAppointments: rejectedAppointments,
            });
            console.log("rejected agent appt", this.state.rejectedAppointments)
          }
        });
        console.log("appointment state", this.state.appointments);
        console.log(
          "accepted appointment state",
          this.state.acceptedAppointments
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <View style={styles.screen}>
        <Container>
          <Tabs style={{ backgroundColor: "white" }}>
            <Tab heading="New">
              <AgentNewAppointmentCard appointments={this.state.appointments} />
            </Tab>
            <Tab heading="Rejected">
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
