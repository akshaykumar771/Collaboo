import React, { Component } from "react";
import { View, StyleSheet, Picker } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Body,
  Label,
  Button,
} from "native-base";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
class AgentNewAppointmentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false,
      dataSource: [],
      selectedCraftsmen: [],
    };
  }
  componentDidMount() {
    if (this.props.token) {
      this.makeRemoteRequest();
    }
  }
  makeRemoteRequest = () => {
    const url = "http://81.89.193.99:3001/api/company/search/craftsmen";
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
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })

      .catch((error) => {
        console.error(error);
      });
  };
  selectedValue = (itemValue, index) => {
    let selectedItem = this.state.selectedCraftsmen;
    selectedItem[index] = itemValue;
    this.setState({
      selectedCraftsmen: selectedItem,
    });
  };
  assignTask = (item, index) => {
    const url = `http://81.89.193.99:3001/api/${this.props.role}/appointments/${item._id}`;
    const bearer = "Bearer " + this.props.token;
    const data = {
      craftsmenid: this.state.selectedCraftsmen[index],
    };
    fetch(url, {
      method: "PUT",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.makeRemoteRequest();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Container>
        <NavigationEvents onDidFocus={() => this.makeRemoteRequest()} />
        <Content style={{ padding: 10 }}>
          {this.props.appointments &&
            this.props.appointments.map((item, index) => {
              return (
                <Card style={styles.card} key={index}>
                  <CardItem style={{ backgroundColor: "#f5f5f5" }}>
                    <Body>
                      <Label style={{ color: "grey" }}>Titel</Label>
                      <Text style={styles.cardText}>{item.title}</Text>
                      <Label style={{ color: "grey" }}>Kunde Name</Label>
                      <Text style={styles.cardText}>
                        {item.customerid.fullname}
                      </Text>
                      {item.craftsmenid != undefined ? (
                        <View>
                          <Text style={{ color: "orange" }}>
                            Warte auf die Bestätigung des Handwerkers
                          </Text>
                        </View>
                      ) : (
                        <Picker
                          style={styles.picker}
                          mode="dropdown"
                          placeholder="Wähle einen Handwerker aus"
                          selectedValue={this.state.selectedCraftsmen[index]}
                          onValueChange={(itemValue) => {
                            this.setState({
                              craftsmen: itemValue,
                            });
                            this.selectedValue(itemValue, index);
                          }}
                        >
                          <Picker.Item label="Wähle einen Handwerker aus" />
                          {this.state.dataSource &&
                            this.state.dataSource.length > 0 &&
                            this.state.dataSource.map((item, key) => (
                              <Picker.Item
                                label={item.fullname}
                                value={item._id}
                                key={item._id}
                              />
                            ))}
                        </Picker>
                      )}
                    </Body>
                    <Right>
                      <Button
                        rounded
                        style={styles.addButton}
                        onPress={() => {
                          this.assignTask(item, index);
                        }}
                      >
                        <Icon style={styles.iconCheck} name="ios-checkmark" />
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              );
            })}
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
  picker: {
    flex: 1,
    width: 190,
  },
  addButton: {
    ...Platform.select({
      ios: {
        backgroundColor: "#f5f5f5",
        borderColor: "black",
        height: 100,
      },
      android: {
        backgroundColor: "#f5f5f5",
        borderColor: "black",
      },
    }),
  },
  iconCheck: {
    fontSize: 60,
    color: "green",
    textAlign: "center",
    alignItems: "center",
  },
  iconClose: {
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
});
export default connect(mapStateToProps, null)(AgentNewAppointmentCard);
