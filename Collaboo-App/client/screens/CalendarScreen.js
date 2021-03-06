import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { connect } from "react-redux";
import moment from "moment";
import Colors from "../constants/Colors";
class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      response: [],
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
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
        const res = responseJson;
        this.setState({
          response: res,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  onDayPress(day) {
    this.setState({
      selected: day.dateString,
    });
    this.props.navigation.navigate("Slot", { bookingDate: day });
  }
  _onPressBack() {
    const { goBack } = this.props.navigation;
    goBack();
  }
  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() =>
          Alert.alert(item.name, item.street + "," + item.city + item.pcode)
        }
      >
        <View style={{ flex: 1 }}>
          <View>
            <Text style={{ fontSize: 18, color: Colors.primary }}>
              {item.name}
            </Text>
          </View>
          <View style={{ top: 10 }}>
            <Text style={{ fontSize: 18, color: Colors.primary }}>
              {item.cname}
            </Text>
          </View>
          <View style={{ top: 20 }}>
            {item.status === "OPEN" ? (
              <Text style={{ color: "green", fontSize: 16, fontWeight: "700" }}>
                ÖFFNEN
              </Text>
            ) : item.status === "COMPLETED" ? (
              <Text style={{ color: "red", fontSize: 16, fontWeight: "700" }}>
                VOLLSTÄNDIG
              </Text>
            ) : item.status === "INPROCESS" ? (
              <Text
                style={{ color: "orange", fontSize: 16, fontWeight: "700" }}
              >
                IN BEARBEITUNG
              </Text>
            ) : item.status === "REOPENED" ? (
              <Text
                style={{ color: "#63264a", fontSize: 16, fontWeight: "700" }}
              >
                WIEDERERÖFFNET
              </Text>
            ) : (
              []
            )}
          </View>
          <View style={{ top: 30, fontSize: 18 }}>
            <Text>{item.dateTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  loadItems(day) {
    setTimeout(() => {
      if (this.state.response) {
        const newItems = {};
        this.state.response.forEach((item) => {
          console.log("foreach", item);
          if (item.status) {
            let startDate = item.apntdatime;
            console.log("start date", startDate);
            let formatedStartDate = moment(startDate).format("YYYY-MM-D");
            if (!newItems[formatedStartDate]) {
              newItems[formatedStartDate] = [];
            }
            let numItems = Math.floor(Math.random() * 3 + 1);
            let formattedDateTime = moment(item.apntdatime).format("LT");
            newItems[formatedStartDate].push({
              name: item.title,
              status: item.status,
              cname: item.customerid.fname + item.customerid.lname,
              dateTime: formattedDateTime,
              street: item.customerid.address.street,
              city: item.customerid.address.city,
              pcode: item.customerid.address.pcode,
              height: Math.max(140, Math.floor(Math.random() * 150)),
            });
          }
        });
        this.setState({
          items: newItems,
        });
        console.log("newItems", newItems);
      }
    }, 1000);
  }
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View>
          <TouchableOpacity
            onPress={() => this._onPressBack()}
          ></TouchableOpacity>
        </View>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={new Date()}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  role: state.userReducer.userRole,
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
export default connect(mapStateToProps, null)(Calc);
