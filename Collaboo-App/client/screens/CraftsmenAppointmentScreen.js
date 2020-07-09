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
      id: "12345678"
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
        console.log("response from appointments :", responseJson);
        this.setState({
          appointments: responseJson,
        });
        console.log("appointment state", this.state.appointments);
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
            {this.state.appointments && this.state.appointments.map((item) => {
                console.log("item", item.status)
                if(item.status === 'OPEN')
                return (
                <AppointmentCard appointments={this.state.appointments} />
                );
            }) }
            </Tab>
            <Tab heading="Accepted">
            {this.state.appointments && this.state.appointments.map((item) => {
                if(item.custconfirmation && item.crafconfirmation === 'YES')
                return(
                <AcceptedAppointmentCard acceptedAppoinments = {this.state.appointments}/>
                );
            })}
            </Tab>
            <Tab heading="Rejected">
              <RejectedAppointmentCard />
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
