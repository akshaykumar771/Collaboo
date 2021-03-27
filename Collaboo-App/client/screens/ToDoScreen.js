import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { connect } from "react-redux";
import InProcessAppointments from "../components/InProcessAppointments";
import ClosedAppointments from "../components/ClosedAppointments";
import { NavigationEvents } from "react-navigation";
class ToDoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAppointments: [],
      inProcessAppointments: [],
      closedAppointments: [],
    };
  }
  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  makeRemoteRequest = () => {
    console.log("test");
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
          console.log(response);
          Alert.alert(
            "Sorry",
            "Keine Termine gefunden",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
          );
        }
      })
      .then(async (responseJson) => {
        let inProcessAppointments = [];
        let closedAppointments = [];
        const defaultResponse =
          (await responseJson) &&
          responseJson.map((item) => {
            if (item.status === "INPROCESS" || item.status === "REOPENED") {
              inProcessAppointments.push(item);
            } else if (item.status === "COMPLETED") {
              closedAppointments.push(item);
            }
          });
        this.setState({
          inProcessAppointments: inProcessAppointments,
          closedAppointments: closedAppointments,
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
          <Tabs>
            <Tab heading="In Bearbeitung">
              <InProcessAppointments
                inProcessAppointments={this.state.inProcessAppointments}
                makeRemoteRequest={this.makeRemoteRequest}
              />
            </Tab>
            <Tab heading="Abgeschlossen">
              <ClosedAppointments
                closedAppointments={this.state.closedAppointments}
                makeRemoteRequest={this.makeRemoteRequest}
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

ToDoScreen.navigationOptions = (navData) => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Kalender"
          iconName="ios-calendar"
          onPress={() => {
            navData.navigation.navigate("Kalendar");
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default connect(mapStateToProps, null)(ToDoScreen);
