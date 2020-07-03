import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import AgentNewAppointmentCard from "../components/AgentNewAppointmentCard"
export default class AgentAppointmentScreen extends Component {
    render() {
        return (
            <View style={styles.screen}>
                 <AgentNewAppointmentCard />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
      flex: 1
    }
  });