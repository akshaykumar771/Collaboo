import React, { Component } from "react";
import { StyleSheet, Button, View } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Item,
  Label
} from "native-base";
import { connect } from "react-redux";
import moment from 'moment';
class ACWorkLogScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || "WorkLog!",
      });
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      title: "",
      startDate: null,
      endDate: null,
      craftsmenId: this.props.navigation.getParam("userId")
    },
    this.arrayholder = [];
  }

   componentDidMount(){
    setTimeout(() => {
      this.makeRemoteRequest();
    }, 3000);
  }
   makeRemoteRequest(){
    
    console.log("token in worklog", this.props.token)
    console.log("state craftsmen id:", this.state.craftsmenId);
    const url = `http://81.89.193.99:3001/api/agent/craftsmen/${this.state.craftsmenId}/worklogs`;
    console.log("url", url)
   const bearer = "Bearer " + this.props.token;
     fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
    .then((response) => response.json())
      .then((responseJson) => {
        console.log("response from worklog :", responseJson)
        responseJson.map((item) => {
          const title = item.appointmentid.title;
          const startDate = item.starttime;
          const formatedStartDate = moment(startDate).format("dddd, MMM DD at HH:mm a")
          const endDate = item.endtime
          const formatedEndDate = moment(endDate).format("dddd, MMM DD at HH:mm a")
          this.setState({
            title: title,
            startDate: formatedStartDate,
            endDate: formatedEndDate
          })
        })
        console.log("state", this.state)
      })
    .catch((error) => {
      console.error(error);
    })
  };

  render() {
    return (
      <Container>
        <Content>
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
                <Label>End Date</Label>
                <Text style={styles.cardText}>{this.state.endDate}</Text>
                </Item>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});
const styles = StyleSheet.create({
    cardText:{
       fontSize: 18, 
       lineHeight: 40,
       textAlign: 'justify'
    }
})

export default connect(mapStateToProps, null)(ACWorkLogScreen)