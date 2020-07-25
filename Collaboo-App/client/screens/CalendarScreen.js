import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { connect } from "react-redux";
import moment from "moment"; 
class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:{},
      response:[]
    };
    this.onDayPress = this.onDayPress.bind(this);
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
        const res = responseJson;
        console.log("cal res", responseJson)
        this.setState({
          response: res
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    this.props.navigation.navigate('Slot', { bookingDate : day })
  }
  _onPressBack(){
    const {goBack} = this.props.navigation
      goBack()
  }
  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]} 
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }
  loadItems(day) {
    console.log("inside loaditems")
    setTimeout(() => {
      this.state.response && this.state.response.map((item) => {
        const startDate = item.appointmentid.apntdatime;
        const formatedStartDate = moment(startDate).format(
          "YYYY-MM-D"
        );
        console.log("day", day)
        const timestamp = moment(startDate).format("x")
        console.log("timestamp", timestamp)
        if(formatedStartDate !== day.dateString)
        for (let i = -15; i < 85; i++) {
          console.log("inside for loop")
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          //const time = timestamp;
          console.log("time", time)
           const strTime = this.timeToString(time);
        //console.log("strtime", strTime)
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            const numItems = Math.floor(Math.random() * 3 + 1);
            for (let j = 0; j < numItems; j++) {
              this.state.items[strTime].push({
                 name: item.title,
                //name: this.state.response,
                height: Math.max(50, Math.floor(Math.random() * 150))
              });
            }
          }
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
        console.log("date", formatedStartDate)
      })
      
    }, 1000);
  }
  timeToString(time) {
    const date = new Date(time);
    console.log("timto", date.toISOString().split('T')[0])
    return date.toISOString().split('T')[0];
  }
  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <View>
        <TouchableOpacity onPress={() => this._onPressBack() }></TouchableOpacity>
                
      </View>
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2020-05-16'}
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
    flex: 1
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
export default connect(mapStateToProps, null) (Calc)