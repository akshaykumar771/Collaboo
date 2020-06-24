import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import AppointmentTabs from '../components/AppointmentTabs';
import AppointmetCard from '../components/AppointmetCard';
export default class CraftsmenAppointmentScreen extends Component {
    render() {
        return (
            <View style={styles.screen}>
                <AppointmentTabs />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
      flex: 1
    }
  });