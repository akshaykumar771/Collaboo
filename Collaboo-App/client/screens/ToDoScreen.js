import React, { Component } from "react";
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";
import { connect } from "react-redux";
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
              item.status === "OPEN"
            ) {
              newAppointments.push(item);
              console.log("arr", newAppointments)
              this.setState({
                appointments: newAppointments,
              });
              console.log("new appointments", this.state.appointments)
            } else if (
              item.status === "INPROCESS"
            ) {
              inProcessAppointments.push(item);
              this.setState({
                inProcessAppointments: inProcessAppointments,
              });
            } else if (
              item.status === "CLOSED"
            ) {
              closedAppointments.push(item);
              this.setState({
                closedAppointments: closedAppointments,
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
        console.log("response todoScreen", responseJson);
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
        <Tabs>
        <Tab heading="Open Tasks">
            
            </Tab>
          <Tab heading="In Process">
           
          </Tab>
         
          <Tab heading="Closed">
            
          </Tab>
        </Tabs>
      </Container>
      </View>
    );
  }
}

renderAddToDo = () => {
  this.setState({
    showComponent: true
  });
};

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

ToDoScreen.navigationOptions = navData => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add ToDo"
          iconName="ios-add"
          onPress={() => {
            navData.navigation.navigate("AddToDo");
          }}
        />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(mapStateToProps, null) (ToDoScreen);
