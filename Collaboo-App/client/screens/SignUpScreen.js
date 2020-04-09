import React, { Component } from "react";
import { View, StyleSheet, TextInput, Button, Picker } from "react-native";
import { Formik } from "formik";

export default class SignUpScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            fullname: '',
            email: '',
            address: '',
            PLZ: '',
            city: '',
            role: '',
            mobilenumber: '',
            password: '',
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {(props) => {
            <View>
            {console.log(props)}
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={props.handleChange('fullname')}
                value={props.values.fullname}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                onChangeText={props.handleChange("address")}
                value={props.values.address}
              />
              <TextInput
                style={styles.input}
                placeholder="Postal Code"
                onChangeText={props.handleChange("PLZ")}
                value={props.values.PLZ}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                onChangeText={props.handleChange("city")}
                value={props.values.city}
              />
              <Picker
                style={{ height: 40, width: 400 }}
                mode="dropdown"
                prompt={"Who are you"}
                itemStyle={{ backgroundColor: "grey" }}
                //selectedValue={this.state.selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  //this.setState({ selectedLanguage: itemValue })
                  console.log("test")
                }
              >
                <Picker.Item
                  label="Choose your role"
                  value={null}
                  key={0}
                />
                <Picker.Item label="Customer" value={1} key={1} />
                <Picker.Item label="Craftsmen" value={2} key={2} />
                <Picker.Item label="Agent" value={3} key={3} />
              </Picker>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                onChangeText={props.handleChange("mobilenumber")}
                value={props.values.mobilenumber}
              />
                <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
              />
              <Button title="Sign up"  color="maroon" onPress={props.handleSubmit}/>
            </View>;
          }}
        </Formik>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
