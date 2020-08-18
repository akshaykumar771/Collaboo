import React, { Component } from "react";
import { StyleSheet, Button, View, ScrollView, Alert } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Item,
  Label,
} from "native-base";
import { connect } from "react-redux";
import moment from "moment";
class ACWorkLogScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "WorkLog!",
  });
  constructor(props) {
    super(props);
    (this.state = {
      isLoading: true,
      title: "",
      startDate: null,
      endDate: null,
      response: [],
      craftsmenId: this.props.navigation.getParam("userId"),
    }),
      (this.arrayholder = []);
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.makeRemoteRequest();
    // }, 3000);
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  makeRemoteRequest() {
    console.log("token in worklog", this.props.token);
    //console.log("state craftsmen id:", this.state.craftsmenId);
    const url = `http://81.89.193.99:3001/api/agent/craftsmen/${this.state.craftsmenId}/worklogs`;
    console.log("url", url);
    const bearer = "Bearer " + this.props.token;
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
    .then((response) => {
      const status = response.status;
      console.log("agent worklog status", status);
      if (status === 200) {
        return response.json();
      } else if (status === 204) {
        console.log("agent 204");
        Alert.alert(
          "Sorry",
          "No Worklogs Found",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }
    })
      .then((responseJson) => {
        //console.log("response from worklog :", responseJson);
        const response = responseJson;
        this.setState({
          response: response,
        });
        // responseJson.map((item) => {
        //   const title = item.appointmentid.title;
        //   const startDate = item.starttime;
        //   const formatedStartDate = moment(startDate).format("dddd, MMM DD at HH:mm a")
        //   const endDate = item.endtime
        //   const formatedEndDate = moment(endDate).format("dddd, MMM DD at HH:mm a")
        //   this.setState({
        //     title: title,
        //     startDate: formatedStartDate,
        //     endDate: formatedEndDate
        //   })
        // })
        //console.log("state", this.state);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <Container>
        <ScrollView style={{ flex: 1 }}>
          <Content style={{ padding: 10 }}>
            {this.state.response.map((item, index) => {
              const startDate = item.appointmentid.apntdatime;
              const formatedStartDate = moment(startDate).format(
                "dddd,MMM DD at HH:mma"
              );
              return (
                <Card key={index} style={styles.card}>
                  <CardItem bordered style={{ backgroundColor: "#f5f5f5" }}>
                    <Body>
                      {/* <Button title="Click" onPress={() => this.handleTaskName()} /> */}
                      <Item stackedLabel>
                        <Label>Title</Label>
                        <Text style={styles.cardText}>
                          {item.appointmentid.title}
                        </Text>
                      </Item>
                      
                      <Item stackedLabel>
                        <Label>Start Date</Label>
                        <Text style={styles.cardText}>
                          {formatedStartDate}
                        </Text>
                      </Item>
                      <Item stackedLabel>
                        <Label>Total Working Hours</Label>
                        <Text style={styles.cardText}>
                          {item.totalWorkingTime}
                        </Text>
                      </Item>
                    </Body>
                  </CardItem>
                </Card>
              );
            })}
          </Content>
        </ScrollView>
      </Container>
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
  },
});

export default connect(mapStateToProps, null)(ACWorkLogScreen);
