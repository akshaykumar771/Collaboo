import React, { Component } from "react";
import { Container, Tab, Tabs } from "native-base";
import AppointmetCard from "./AppointmetCard";
import AcceptedAppointmentCard from "./AcceptedAppointmentCard";
import RejectedAppointmentCard from "./RejectedAppointmentCard";
export default class AppointmentTabs extends Component {
  render() {
    return (
      <Container>
        <Tabs style={{ backgroundColor: "white" }}>
          <Tab heading="Neu">
            <AppointmetCard />
          </Tab>
          <Tab heading="Akzeptiert">
            <AcceptedAppointmentCard />
          </Tab>
          <Tab heading="Abgelehnt">
            <RejectedAppointmentCard />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
