import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import AppointmentCard from "../components/AppointmentCard";
import AcceptedAppointmentCard from "../components/AcceptedAppointmentCard";
import RejectedAppointmentCard from "../components/RejectedAppointmentCard";
import { connect } from "react-redux";
class CraftsmenAppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      appointments: [],
      acceptedAppointments: [],
      rejectedAppointments: []
    };
  }
  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/craftsmen/appointments";
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
        let newAppointments = [];
        let acceptedAppointments = [];
        let rejectedAppointments = []
        const defaultResponse = await responseJson.map((item) => {
          if (item.status === "OPEN" &&
            item.crafconfirmation === "DEFAULT" &&
            item.custconfirmation === "DEFAULT"
          ) {
            newAppointments.push(item);
            this.setState({
              appointments: newAppointments,
            });
          } else if (
            item.crafconfirmation === "YES" &&
            item.custconfirmation === "DEFAULT"
          ) {
            acceptedAppointments.push(item);
            this.setState({
              acceptedAppointments: acceptedAppointments,
            });
          }
          else if ( item.crafconfirmation === 'NO' && item.custconfirmation === 'DEFAULT'){
            rejectedAppointments.push(item);
            this.setState({
              rejectedAppointments: rejectedAppointments
            })
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
              <AppointmentCard appointments={this.state.appointments} />
            </Tab>
            <Tab heading="Accepted">
                      <AcceptedAppointmentCard
                        acceptedAppoinments={this.state.acceptedAppointments}
                      />
            </Tab>
            <Tab heading="Rejected">
              <RejectedAppointmentCard rejectedAppointments = {this.state.rejectedAppointments}/>
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

export default connect(mapStateToProps, null)(CraftsmenAppointmentScreen);
