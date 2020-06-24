import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import AppointmetCard from './AppointmetCard';
import AcceptedAppointmentCard from './AcceptedAppointmentCard';
import RejectedAppointmentCard from './RejectedAppointmentCard';
export default class AppointmentTabs extends Component {
    render() {
        return (
            <Container>
            <Tabs style = {{backgroundColor: 'white'}}>
              <Tab heading="New">
            <AppointmetCard />
              </Tab>
              <Tab heading="Accepted">
              <AcceptedAppointmentCard />
              </Tab>
              <Tab heading="Rejected">
             <RejectedAppointmentCard />
              </Tab>
            </Tabs>
          </Container>
        )
    }
}
