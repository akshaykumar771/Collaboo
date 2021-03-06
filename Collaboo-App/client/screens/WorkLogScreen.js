import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  Picker,
} from "react-native";
import { Icon, Button } from "native-base";
import Colors from "../constants/Colors";
import WorkLogCard from "../components/WorkLogCard";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
class WorkLogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isDateTimePickerVisible: false,
      appointmentId: "",
      dataSource: [],
      date: "",
      time: "",
      worklogCard: "",
      selected: "",
    };
  }

  saveWorklog = () => {
    const url = "http://81.89.193.99:3001/api/craftsmen/worklogs";
    const bearer = "Bearer " + this.props.token;
    const data = {
      appointmentid: this.state.selected,
      logs: [{ date: this.state.date, time: this.state.time }],
    };
    fetch(url, {
      method: "POST",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response from post", JSON.stringify(responseJson));
        this.setState({
          worklogCard: Date.now(),
        });
        Alert.alert(
          "Successfully added the worklog",
          "To update the worklog, please click the add icon on your worklogs",
          [{ text: "OK", onPress: () => this.closeModal() }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
      date: formattedDate,
    });
    console.log("state date", this.state.date);
    this.hideDateTimePicker();
  };
  openModal = () => {
    this.setState({ isModalOpen: true });
    this.handleAppointments();
  };
  handleAppointments = () => {
    const url = "http://81.89.193.99:3001/api/craftsmen/appointments";
    const bearer = "Bearer " + this.props.token;
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
      .then((response) => {
        console.log("Response 1", response);
        const status = response.status;
        if (status === 200) {
          console.log("Response in 200", response);
          return response.json();
        } else if (status === 204) {
          console.log("Response in 204", response);
          Alert.alert(
            "Keine Arbeitsprotokoll gefunden",
            "Bitte fügen Sie Ihre Arbeit hinzu, um die Arbeitsprotokoll zu sehen",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      })
      .then((responseJson) => {
        console.log("response from add work pop up :", responseJson);
        this.setState({
          dataSource: responseJson,
        });
        console.log("data source state", this.state.dataSource);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  render() {
    console.log("datasource state", this.state.dataSource);
    return (
      <View style={{ flex: 1 }}>
        <WorkLogCard key={this.state.worklogCard} />
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
              <Text style={styles.modalHeader}>Arbeitsprotokoll</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Picker
                  style={styles.picker}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ selected: itemValue });
                  }}
                  selectedValue={this.state.selected}
                >
                  <Picker.Item
                    style={{ paddingVertical: 10 }}
                    label="Wählen Sie Ihre Aufgabe"
                    value={null}
                    key={0}
                  />
                  {this.state.dataSource &&
                    this.state.dataSource.map((item, index) => (
                      <Picker.Item
                        label={item.title}
                        value={item._id}
                        key={item._id}
                      />
                    ))}
                </Picker>
              </View>
              <View style={styles.dateInput}>
                <TextInput
                  placeholder="YYYY-MM-DD"
                  maxLength={10}
                  value={this.state.date}
                  onChange={(text) => {
                    this.setState({
                      date: text,
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
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                />
                <View style={styles.chooseHoursTxtInput}>
                  <TextInput
                    style={{ textAlign: "center" }}
                    placeholder="HH:MM"
                    maxLength={5}
                    onChangeText={(text) => {
                      console.log("time text", text);
                      this.setState({
                        time: text,
                      });
                      console.log("time state", this.state.time);
                    }}
                    value={this.state.time}
                  />
                </View>
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
                  onPress={() => this.saveWorklog()}
                >
                  <Text style={styles.buttonText}>Arbeit protokollieren</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <TouchableOpacity
            style={styles.workLogButton}
            underlayColor="#fff"
            onPress={() => this.openModal()}
          >
            <Text style={styles.buttonText}>Füge Arbeit hinzu</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    ...Platform.select({
      ios: {
        bottom: 110,
      },
      android: {
        top: 15,
      },
    }),
  },
  dateInput: {
    flexDirection: "row",
    ...Platform.select({
      ios: {
        bottom: 60,
      },
      android: {
        top: 30,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        bottom: 70,
        width: 190,
      },
      android: {
        width: 250,
      },
    }),
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
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginTop: 0,
        borderWidth: 1,
        borderColor: "#fff",
        bottom: 85,
      },
      android: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginTop: 0,
        top: 40,
        borderWidth: 1,
        borderColor: "#fff",
      },
    }),
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
  chooseHoursTxtInput: {
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    left: 50,
    width: 80,
    height: 35,
    marginTop: 10,
  },
  chooseDateBtn: {
    width: 60,
  },
});

export default connect(mapStateToProps, null)(WorkLogScreen);
