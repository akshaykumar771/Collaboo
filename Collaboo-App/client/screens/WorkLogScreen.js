import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { Form, Item, Label, Picker } from "native-base";
import Colors from "../constants/Colors";
import WorkLogCard from "../components/WorkLogCard";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import DateTimePicker from "react-native-modal-datetime-picker";
class WorkLogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isDateTimePickerVisible: false
    };
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
  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal() {
    this.setState({ isModalOpen: false });
  }
  render() {
    return (
      <View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          // enableAutomaticScroll={Platform.OS === "ios"}
        >
          <WorkLogCard />
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
                    <Label style={{ paddingVertical: 20 }}>Select Task</Label>
                    <Picker
                      Label="Select Task"
                      // selectedValue={this.state.selectedValue}
                      // onValueChange={(value) => {
                      //   this.handleChange(value);
                      // }}
                    ></Picker>
                  </Item>
                </View>
                <View style = {{marginTop: 20}}>
                  <Text>Start Date & Time</Text>
                </View>
                <View style = {{marginTop: 30}}>
                <Text>End Date & Time</Text>
                </View>
                <View style = {{marginTop: 15}}>
                <Button
                  title="Choose Date and Time"
                  onPress={this.showDateTimePicker}
                />
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  mode={'datetime'}
                  is24Hour={true}
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
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <TouchableOpacity
            style={styles.workLogButton}
            underlayColor="#fff"
            onPress={() => this.openModal()}
          >
            <Text style={styles.buttonText}>Add Work</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: -35,
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
});

export default WorkLogScreen;
