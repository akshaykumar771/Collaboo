import React, { Component } from "react";
import {View, StyleSheet} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton"
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import InProcessAppointments from "../components/InProcessAppointments";
import ClosedAppointments from "../components/ClosedAppointments";
import { NavigationEvents } from "react-navigation";
class ToDoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAppointments:[],
      inProcessAppointments:[],
      closedAppointments:[]
    };
  }
  componentDidMount(){
    if(this.props.token){
      this.makeRemoteRequest()
    }
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
        let inProcessAppointments = [];
        let closedAppointments = [];
        const defaultResponse =
          (await responseJson) &&
          responseJson.map((item) => {
         if (
              item.status === "INPROCESS" || item.status === 'REOPENED'
            ) {
              inProcessAppointments.push(item);
              
            } else if (
              item.status === "COMPLETED"
            ) {
              closedAppointments.push(item);
             
            }
            //  else {
            //   this.setState({
            //     appointments: [],
            //     acceptedAppoinments: [],
            //     rejectedAppointments: [],
            //   });
            // }
          });
          this.setState({
            inProcessAppointments: inProcessAppointments,
            closedAppointments: closedAppointments,
          });
        console.log("response todoScreen", responseJson);
        console.log("appointment state", this.state.inProcessAppointments);
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
          <Tab heading="In Process">
           <InProcessAppointments inProcessAppointments = {this.state.inProcessAppointments}/>
          </Tab>
          <Tab heading="Closed">
            <ClosedAppointments closedAppointments = {this.state.closedAppointments}/>
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

ToDoScreen.navigationOptions = navData => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Calendar"
          iconName="ios-calendar"
          onPress={() => {
            navData.navigation.navigate("Calendar");
          }}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default connect(mapStateToProps, null) (ToDoScreen);
