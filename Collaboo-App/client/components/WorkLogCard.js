import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
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
      totalWorkingHours: null,
      isModalOpen: false,
      logs: [],
      worklogId: "",
      newLogs: [],
      time: null,
      date: null,
      selectedItem: "",
      WorkLogCard: "",
      dataRefresh: "",
    }),
      (this.arrayholder = []);
  }

  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  shouldComponentUpdate(nextProps) {
    //console.log(nextProps.token, this.props.token);
    if (nextProps.token != this.props.token) {
      this.makeRemoteRequest();
    }
    return true;
  }
 
  makeRemoteRequest() {
    //console.log("token in worklog", this.props.token);
    const url = "http://81.89.193.99:3001/api/craftsmen/worklogs";
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
            "No Worklogs Found",
            "Please add your work to see the worklogs",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      })
      .then(async (responseJson) => {
        console.log("response from worklog :", responseJson);
        let arrayOfLogs = [];
        responseJson &&
          responseJson.length > 0 &&
          (await responseJson.map(async (item) => {
            const title = item.appointmentid.title;
            const startDate = item.appointmentid.apntdatime;
            const formatedStartDate = moment(startDate).format(
              "dddd, MMM DD at HH:mm a"
            );
            const totalWorkingHours = item.totalWorkingTime;
            const logs = await item.logs.map((item) => {
              return {
                date: item.date,
                time: item.noOfMins,
              };
            });
            const newObj = {
              worklogId: item._id,
              appointmentid: item.appointmentid._id,
              title: title,
              startDate: formatedStartDate,
              totalWorkingHours: totalWorkingHours,
              logs: logs,
            };
            arrayOfLogs.push(newObj);
          }));
        this.setState({
          newLogs: arrayOfLogs,
        });
        console.log("new logs state", this.state.newLogs);
        // return this.state.newLogs
      })
      .catch((error) => {
        console.error(error);
      });
  }

  openModal = (item) => {
    this.setState({ isModalOpen: true, selectedItem: item, logs: item.logs });
    console.log("state in open modal", this.state);
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
    let formattedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.setState({
      addDate: formattedDate,
    });
    console.log("A date has been picked: ", formattedDate);
    this.hideDateTimePicker();
  };

  updateWorkLog = () => {
    //console.log("token in worklog", this.props.token);
    const url = `http://81.89.193.99:3001/api/craftsmen/worklogs/${this.state.selectedItem.worklogId}`;
    const bearer = "Bearer " + this.props.token;
    //console.log("bearer", bearer);
    const transformedLogs = this.state.selectedItem.logs.map((item) => ({
      date: item.date,
      time: item.time,
    }));
    console.log("transformed logs", transformedLogs)
    const data = {
      appointmentid: this.state.selectedItem.appointmentid,
      logs: transformedLogs,
    };
    console.log("data", data);
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response after update", responseJson);
        this.closeModal();
        this.makeRemoteRequest();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDateAndTime = (text, time, myIndex) => {
    console.log("Time", time);
    const newLogs = [...this.state.selectedItem.logs];
    newLogs[myIndex] = { ...newLogs[myIndex], date: text, time };
    // let obj = { date: "", time: "" };
    // obj.date = text;
    // obj.time = time;
    // console.log("obj", obj);
    // let logs = this.state.logs;
    // logs[myIndex] = obj;
    // console.log("Logs", logs);
    this.setState({
      selectedItem: { ...this.state.selectedItem, logs: newLogs },
    });
  };

  addWorkLog = () => {
    console.log("inside add work log", this.state.addDate);
    let obj = { date: "", time: "" };
    obj.date = this.state.addDate;
    obj.time = this.state.addTime;
    let item = this.state.selectedItem;
    if(obj.date && obj.time){
      item.logs.push(obj);
      this.setState({
      selectedItem: item
    }, () => this.updateWorkLog() )
    }
    // this.textInput.clear();
    else{
      this.updateWorkLog();
    }
    
  };
  render() {
    console.log("this.state", this.state);
    return (
      <View key={this.state.worklogCard}>
        <Container>
          <Content style={{padding: 10}}>
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
                      width: 400,
                      height: 700,
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
                        <Label
                          style={{
                            paddingVertical: 10,
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          {this.state.selectedItem.title}
                        </Label>
                      </Item>
                    </View>
                    {this.state.selectedItem.logs &&
                    this.state.selectedItem.logs.length
                      ? this.state.selectedItem.logs.map((item, myIndex) => {
                          console.log("map item", item);
                          return (
                            <View
                              style={{ flexDirection: "row", marginTop: 15 }}
                              key={myIndex}
                            >
                              <TextInput
                                style={styles.dateInput}
                                placeholder="DD.MM.YYYY"
                                maxLength={10}
                                value={item.date}
                                onChangeText={(text) => {
                                  this.handleDateAndTime(
                                    text,
                                    item.time,
                                    myIndex
                                  );
                                }}
                              />
                              <View style={styles.textInput}>
                                <TextInput
                                  placeholder="HH MM"
                                  maxLength={6}
                                  value={item.time}
                                  onChangeText={(time) => {
                                    //console.log("change", time)
                                    this.setState({
                                      time: time,
                                    });
                                    this.handleDateAndTime(
                                      item.date,
                                      time,
                                      myIndex
                                    );
                                  }}
                                />
                              </View>
                            </View>
                          );
                        })
                      : null}

                    <View style={{ flexDirection: "row", marginTop: 30 }}>
                      <TextInput
                        style={styles.dateInput}
                        ref={(input) => {
                          this.textInput = input;
                        }}
                        placeholder="YYYY-MM-DD"
                        maxLength={10}
                        value={this.state.addDate}
                        onChangeText={(text) => {
                          this.setState({
                            addDate: text,
                          });
                        }}
                      />
                      <Button
                        transparent
                        style={styles.chooseDateBtn}
                        onPress={() => this.showDateTimePicker()}
                      >
                        <Icon
                          active
                          name="calendar"
                          style={{ fontSize: 30, color: "black" }}
                        />
                      </Button>
                      <View style={styles.chooseHoursTxtInput}>
                        <TextInput
                          ref={(input) => {
                            this.textInput = input;
                          }}
                          placeholder="HH MM"
                          maxLength={5}
                          value={this.state.addTime}
                          onChangeText={(time) => {
                            this.setState({
                              addTime: time,
                            });
                          }}
                        ></TextInput>
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
                        onPress={() => this.addWorkLog()}
                      >
                        <Text style={styles.buttonText}>Log Work</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </KeyboardAwareScrollView>
            {this.state.newLogs.map((item, index) => {
              {
                console.log("item inside card", item);
              }
              return (
                <Card key={index} style={styles.card}>
                  <CardItem bordered style = {{backgroundColor:'#f5f5f5'}}>
                    <Body>
                      <Item stackedLabel>
                        <Label>Title</Label>
                        <Text style={styles.cardText}>test title</Text>
                      </Item>
                      <Item stackedLabel>
                        <Label>Start Date</Label>
                        <Text style={styles.cardText}>{item.startDate}</Text>
                      </Item>
                      <Item stackedLabel>
                        <Label>Number of Hours</Label>
                        <Text style={styles.hoursCardText}>
                          {item.totalWorkingHours}
                        </Text>
                      </Item>
                      <Right>
                        <Button
                          rounded
                          style={styles.addButton}
                          onPress={() => this.openModal(item)}
                        >
                          <Icon
                            active
                            name="ios-add"
                            style={{ fontSize: 30 }}
                          />
                        </Button>
                      </Right>
                    </Body>
                  </CardItem>
                </Card>
              );
            })}
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
  textInput: {
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    width: 80,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    borderRadius: 25,
    left: 184,
  },
  dateInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    width: 110,
    borderRadius: 20,
    textAlign: "center",
  },
  dateBtnTxt: {
    color: "#fff",
    textAlign: "center",
    padding: 10,
  },
  chooseHoursTxtInput: {
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    borderRadius: 20,
    left: 127,
    width: 80,
    height: 35,
    marginTop: 10,
  },
  chooseDateBtn: {
    width: 60,
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
    backgroundColor: "#f5f5f5"
  
  },
});

export default connect(mapStateToProps, null)(WorkLogCard);
