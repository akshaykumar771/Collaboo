import React, { Component } from "react";
import { StyleSheet, View, Modal, TouchableOpacity, TextInput } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Item,
  Label,
  Right,
  Icon,
  Button,
  Input,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import moment from "moment";
import Colors from "../constants/Colors";
import DateTimePicker from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
class WorkLogCard extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      isLoading: true,
      title: "",
      startDate: null,
      endDate: null,
      isModalOpen: false,
    }),
      (this.arrayholder = []);
  }

  componentDidMount() {
    setTimeout(() => {
      this.makeRemoteRequest();
    }, 3000);
  }
  makeRemoteRequest() {
    console.log("token in worklog", this.props.token);
    const url = "http://81.89.193.99:3001/api/craftsmen/worklogs";
    const bearer = "Bearer " + this.props.token;
    console.log("bearer", bearer);
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response from worklog :", responseJson);
        responseJson.map((item) => {
          const title = item.appointmentid.title;
          const startDate = item.starttime;
          const formatedStartDate = moment(startDate).format(
            "dddd, MMM DD at HH:mm a"
          );
          const endDate = item.endtime;
          const formatedEndDate = moment(endDate).format(
            "dddd, MMM DD at HH:mm a"
          );
          this.setState({
            title: title,
            startDate: formatedStartDate,
            endDate: formatedEndDate,
          });
        });
        console.log("state", this.state);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  openModal = () => {
    this.setState({ isModalOpen: true });
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
 
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
  render() {
    return (
      <View>
        <Container>
          <Content>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              // enableAutomaticScroll={Platform.OS === "ios"}
            >
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
                    <Text style={styles.modalHeader}>Work Log</Text>
                    <View>
                      <Item>
                        <Label style={{ paddingVertical: 10 }}>
                          Select Task
                        </Label>
                      </Item>
                    </View>
                    <View style={{ flexDirection:'row', marginTop: 15 }}>
                    <TextInput placeholder = "DD.MM.YYYY" maxLength={10} />
                      <View style={styles.textInput}>
                     <TextInput placeholder = "HH MM" maxLength={4}>
                     </TextInput>
                     </View>
                    </View>
                    <View style={{ flexDirection:'row', marginTop: 15 }}>
                    <TextInput placeholder = "DD.MM.YYYY" maxLength={10} />
                      <Button
                      transparent
                      style={styles.chooseDateBtn}
                      onPress={() => this.showDateTimePicker()}
                    >
                      <Icon active name="calendar" style={{ fontSize: 30, color: 'black' }} />
                    </Button>
                    <View style={styles.chooseHoursTxtInput}>
                     <TextInput placeholder = "HH MM" maxLength={4}>
                     </TextInput>
                     </View>
                      <DateTimePicker
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
                        // onPress={this.handleRequestAppointment}
                      >
                        <Text style={styles.buttonText}>Log Work</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </KeyboardAwareScrollView>
            <Card>
              <CardItem bordered>
                <Body>
                  {/* <Button title="Click" onPress={() => this.handleTaskName()} /> */}
                  <Item stackedLabel>
                    <Label>Title</Label>
                    <Text style={styles.cardText}>{this.state.title}</Text>
                  </Item>
                  <Item stackedLabel>
                    <Label>Start Date</Label>
                    <Text style={styles.cardText}>{this.state.startDate}</Text>
                  </Item>
                  <Item stackedLabel>
                    <Label>Number of Hours</Label>
                    <Text style={styles.hoursCardText}>20 Hours</Text>
                  </Item>
                  <Right>
                    <Button
                      rounded
                      style={styles.addButton}
                      onPress={() => this.openModal()}
                    >
                      <Icon active name="ios-add" style={{ fontSize: 30 }} />
                    </Button>
                  </Right>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});
const styles = StyleSheet.create({
  cardText: {
    fontSize: 18,
    lineHeight: 40,
    textAlign: "justify",
  },
  hoursCardText: {
    fontSize: 20,
    textAlign: "auto",
    lineHeight: 40,
  },
  addButton: {
    marginLeft: 280,
    backgroundColor: Colors.primary,
  },
  textStyle: {
    padding: 10,
  },
  modalInput: {
    paddingVertical: 20,
    borderBottomColor: Colors.primary,
    backgroundColor: "#ffffff",
  },
  requestButton: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  workLogButton: {
    position: "absolute",
    bottom: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
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
  textInput:{
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor:'black',
    width:80,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize:15,
    borderRadius: 25,
    left: 110
  },
  dateBtnTxt:{
    color: "#fff",
    textAlign: "center",
    padding: 10
  },
  chooseHoursTxtInput:{
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor:'black',
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize:15,
    borderRadius: 20,
    left: 50,
    width: 80,
    height: 35,
    marginTop: 10
  },
  chooseDateBtn: {
    width: 60,
  }
});

export default connect(mapStateToProps, null)(WorkLogCard);
