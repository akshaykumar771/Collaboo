import React, { Component } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity, Platform, TextInput, Button, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Icon,
  Right,
  Body,
  Label
} from "native-base";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import DateTimePicker from "react-native-modal-datetime-picker";
 class AppointmentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isDateTimePickerVisible: false,
      crafconfirmation:"NO",
      appointmentid: "",
      date: ""
    };
  }
  
  openModal =  (item) => {
    this.setState({ isModalOpen: true, crafconfirmation: "YES", appointmentid: item._id });
    //console.log("state in open modal", this.state);
   
  };

  closeModal() {
    this.setState({ isModalOpen: false });
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    console.log("A date has been picked: ", date);
    let formattedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.setState({
      date: date,
    });
    console.log("state date", this.state.date);
    this.hideDateTimePicker();
  };

  sendInvitation = () => {
    const url = `http://81.89.193.99:3001/api/${this.props.role}/appointments/${this.state.appointmentid}`;
    console.log("url", url)
    const bearer = "Bearer " + this.props.token;
    console.log("bearer", bearer)
    const data = {
        crafconfirmation: this.state.crafconfirmation,
        apntdatime: this.state.date
    };
    console.log("data", data)
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response after update", responseJson);
        this.closeModal();
        this.props.makeRemoteRequest();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cancelAppointment =  async (item) => {
      console.log("item", item)
      await this.setState({
          appointmentid: item._id
      })
      console.log(this.state)
    const url = `http://81.89.193.99:3001/api/${this.props.role}/appointments/${this.state.appointmentid}`;
    console.log("url", url)
    const bearer = "Bearer " + this.props.token;
    const data = {
        crafconfirmation: "NO",
        apntdatime: ""
    };
    console.log("data", data)
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.makeRemoteRequest();
        console.log("response after update", responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
      if(this.props.appointments.length <= 0){
          return (  
            <View style = {{justifyContent:'center', alignItems:'center'}}>
                <Text style = {{color: 'red'}}>No appointmens found! Come back later</Text>
            </View>
          );
      }
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          {this.props.appointments && this.props.appointments.length > 0 &&
             this.props.appointments.map((item) => {
              console.log(item.title);
              return (
                <Card style={styles.card}>
                  <CardItem style={{ backgroundColor: "#f5f5f5" }}>
                    <Body>
                      <Label style={{ color: "grey" }}>Title</Label>
                      <Text style={styles.cardText}>{item.title}</Text>
                      <Label style={{ color: "grey" }}>Customer Name</Label>
                      <Text style={styles.cardText}>
                        {item.customerid.fullname}
                      </Text>
                    </Body>
                    <Right>
                    <View style={{bottom: 30}}>
                    <TouchableOpacity
                    style={styles.acceptBtn}
                    underlayColor="#fff"
                    onPress={() => this.openModal(item)}
                  >
                    <Text style={styles.chooseDateBtnTxt}>Accept</Text>
                  </TouchableOpacity>
                  </View>
                  <View style={{bottom: 20}}>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    underlayColor="#fff"
                    onPress={() => this.cancelAppointment(item)}
                  >
                    <Text style={styles.chooseDateBtnTxt}>Reject</Text>
                  </TouchableOpacity>
                  </View>
                    </Right>
                  </CardItem>
                </Card>
              );
            })}
          <Modal transparent={true} visible={this.state.isModalOpen}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00000080",
              }}
            >
              <View
                style={{
                  width: 300,
                  height: 400,
                  backgroundColor: "#fff",
                  paddingVertical: 40,
                  paddingHorizontal: 10,
                }}
              >
                <MaterialIcons
                  style={styles.modalCloseIcon}
                  name="close"
                  size={24}
                  onPress={() => this.closeModal()}
                />
                <Text style={styles.modalHeader}>Invitation</Text>
                <View>
                <Text style={{color: 'green'}}>**please choose a date and time to make an appointment with the customer**</Text>
                </View>
                
                <View style={styles.dateInput}>
                
                   <TouchableOpacity
                    style={styles.chooseDateBtn}
                    underlayColor="#fff"
                    onPress={() => this.showDateTimePicker()}
                  >
                    <Text style={styles.chooseDateBtnTxt}>Choose Date and Time</Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    mode='datetime'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                  />
                 
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginVertical: 60,
                  }}
                >
                  <TouchableOpacity
                    style={styles.requestButton}
                    underlayColor="#fff"
                    onPress={() => this.sendInvitation()}
                  >
                    <Text style={styles.buttonText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  iconCheck: {
    fontSize: 40,
    color: "green",
  },
  iconCancel: {
    fontSize: 40,
    color: "red",
  },
  cardText: {
    fontSize: 18,
    lineHeight: 40,
    textAlign: "justify",
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
  modalText:{
    ...Platform.select({
      ios: {
        //marginTop: -55,
        bottom: 110
      },
      android:{
        top: 15
      }
    })
  },
  dateInput:{
    flexDirection: "row",
    ...Platform.select({
      ios:{
        bottom: 70
      },
      android:{
        top: 30
      }
    })
  },
  modalInput: {
    paddingVertical: 20,
    borderBottomColor: Colors.primary,
    backgroundColor: "#ffffff",
  },
  requestButton: {
    ...Platform.select({
      ios:{
        paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 0,
    borderWidth: 1,
    borderColor: "#fff",
    top: 50
      },
      android:{
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    marginTop: 0,
    top: 40,
    borderWidth: 1,
    borderColor: "black",
      }
    }),
  },
  acceptBtn:{
    ...Platform.select({
      ios:{
        paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 50,
    borderWidth: 1,
    borderColor: "#fff",
    width: 80
      },
      android:{
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 0,
    top: 40,
    borderWidth: 1,
    borderColor: "black",
    width: 80
      }
    }),
  },
  rejectBtn:{
    ...Platform.select({
      ios:{
        paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 0,
    borderWidth: 1,
    borderColor: "#fff",
    width: 80
      },
      android:{
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 0,
    top: 40,
    borderWidth: 1,
    borderColor: "black",
    width: 80
      }
    }),
  },
  buttonText: {
    color: Colors.primary,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  chooseDateBtnTxt:{
    color: "white",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalHeader: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  modalCloseIcon: {
    position: "absolute",
    right: 5,
    top: 5,
    color: Colors.primary,
  },
  chooseHoursTxtInput: {
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    borderRadius: 20,
    left: 50,
    width: 80,
    height: 35,
    marginTop: 10,
  },
  chooseDateBtn: {
    ...Platform.select({
      ios:{
        paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    top: 130,
    justifyContent:'center',
    alignItems:'center',
    left: 60,
    borderWidth: 1,
    borderColor: "#fff",
      },
      android:{
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 0,
    top: 40,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent:'center',
    alignItems:'center',
    left: 60
      }
    }),
  },
});
export default connect(mapStateToProps, null)(AppointmentCard)