import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import AppointmentCard from "../components/AppointmentCard";
import AcceptedAppointmentCard from "../components/AcceptedAppointmentCard";
import RejectedAppointmentCard from "../components/RejectedAppointmentCard";
import { HeaderButton,HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
class CraftsmenAppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      appointments: [],
      acceptedAppointments: [],
      rejectedAppointments: [],
    };
  }
  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
    // setTimeout(() => {
    //   this.makeRemoteRequest();
    // }, 3000);
  }

  shouldComponentUpdate(nextProps) {
    //console.log(nextProps.token, this.props.token);
    if (nextProps.token != this.props.token) {
      this.makeRemoteRequest();
    }
    return true;
  }
  makeRemoteRequest = () => {
    console.log("test");
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
          console.log(response);
          Alert.alert(
            "Sorry",
            "No Appointments Found",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
          );
        }
      })
      .then(async (responseJson) => {
        let newAppointments = [];
        let acceptedAppointments = [];
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
              console.log("arr", newAppointments)
              this.setState({
                appointments: newAppointments,
              });
              console.log("new appointments", this.state.appointments)
            } else if (
              item.status === "OPEN" &&
              item.crafconfirmation === "YES" &&
              item.custconfirmation === "DEFAULT"
            ) {
              acceptedAppointments.push(item);
              this.setState({
                acceptedAppointments: acceptedAppointments,
              });
            } else if (
              item.status === "CANCELLED" &&
              item.crafconfirmation === "NO" || item.crafconfirmation === "YES" &&
              item.custconfirmation === "DEFAULT" || item.custconfirmation === 'NO'
            ) {
              rejectedAppointments.push(item);
              this.setState({
                rejectedAppointments: rejectedAppointments,
              });
            }
            //  else {
            //   this.setState({
            //     appointments: [],
            //     acceptedAppoinments: [],
            //     rejectedAppointments: [],
            //   });
            // }
          });
        console.log("response crfatsmenapptscreen", responseJson);
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
              <AppointmentCard
                appointments={this.state.appointments}
                makeRemoteRequest={this.makeRemoteRequest}
              />
            </Tab>
            <Tab heading="Accepted">
              <AcceptedAppointmentCard
                acceptedAppoinments={this.state.acceptedAppointments}
              />
            </Tab>
            <Tab heading="Rejected">
              <RejectedAppointmentCard
                rejectedAppointments={this.state.rejectedAppointments}
              />
            </Tab>
          </Tabs>
        </Container>
      </View>
    );
  }
}
const MaterialCommunityIconsHeader = (props) => (
  <HeaderButton {...props} IconComponent={MaterialCommunityIcons} iconSize={23} color="white" />
);
CraftsmenAppointmentScreen.navigationOptions = navData => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={MaterialCommunityIconsHeader}>
        <Item
          title="Change Requests"
          iconName="history"
          onPress={() => {
            navData.navigation.navigate("ChangeRequests");
          }}
        />
      </HeaderButtons>
    )
  };
};
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default connect(mapStateToProps, null)(CraftsmenAppointmentScreen);
