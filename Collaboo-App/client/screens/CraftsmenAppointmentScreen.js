import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import AppointmentCard from "../components/AppointmentCard";
import AcceptedAppointmentCard from "../components/AcceptedAppointmentCard";
import RejectedAppointmentCard from "../components/RejectedAppointmentCard";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
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
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.token != this.props.token) {
      this.makeRemoteRequest();
    }
    return true;
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/craftsmen/appointments";
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
            "No Appointments Found",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
          );
        }
      })
      .then(async (responseJson) => {
        console.log("CRAFTSMEN RESPONSE", responseJson);
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
            } else if (
              item.status === "OPEN" &&
              item.crafconfirmation === "YES" &&
              item.custconfirmation === "DEFAULT"
            ) {
              acceptedAppointments.push(item);
            } else if (
              (item.status === "CANCELLED" && item.crafconfirmation === "NO") ||
              (item.crafconfirmation === "YES" &&
                item.custconfirmation === "DEFAULT") ||
              item.custconfirmation === "NO"
            ) {
              rejectedAppointments.push(item);
            }
          });
        this.setState({
          appointments: newAppointments,
          acceptedAppointments: acceptedAppointments,
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
              <AppointmentCard
                appointments={this.state.appointments}
                makeRemoteRequest={this.makeRemoteRequest}
              />
            </Tab>
            <Tab heading="Angenommen">
              <AcceptedAppointmentCard
                acceptedAppoinments={this.state.acceptedAppointments}
              />
            </Tab>
            <Tab heading="Abgelehnt">
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
  <HeaderButton
    {...props}
    IconComponent={MaterialCommunityIcons}
    iconSize={23}
    color="#f68ba7"
  />
);
CraftsmenAppointmentScreen.navigationOptions = (navData) => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={MaterialCommunityIconsHeader}>
        <Item
          title="Ändere Anfrage"
          iconName="history"
          onPress={() => {
            navData.navigation.navigate("ÄndereAnfrage");
          }}
        />
      </HeaderButtons>
    ),
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
