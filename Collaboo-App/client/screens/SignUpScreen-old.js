import React, { Component } from "react";
import { StyleSheet, View, Button, Text, Alert } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from "native-base";
import { Formik } from "formik";
import FormButton from "../components/FormButton";
import Colors from "../constants/Colors";
import RegisterCraftsmen from "../components/RegisterCraftsmen";
import * as Yup from "yup";
import { Card } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import RegisterAddress from "../components/RegisterAddress";
const signUpSchema = Yup.object().shape({
  firstname: Yup.string().label("First Name").required("Please enter your First Name").min(3),
  lastname: Yup.string().label("Last Name").required("Please enter your Last Name").min(3),
  email: Yup
    .string()
    .label("Email")
    .required("Please enter your valid email address")
    .email("Enter valid email"),

  role: Yup.string().label("Role").required("Please choose your role"),

  mobilenumber: Yup
    .string()
    .label("Mobile Number")
    .required("Please enter your valid phone number")
    .test("isMobile", "Mobile number must be a number", (val) => {
      return parseInt(val);
    }),
  password: Yup
    .string()
    .label("Password")
    .required()
    .min(6, "Password must have atleast 6 characters"),
});
export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      selfemployed: false,
      company: "",
      category: "",
      street: "",
      city: "",
      pcode: "",
      phno: "",
      password: "",
    };
  }

  makeRemoteRequest = () => {
    const url =
      // Platform.OS === "android"
      //   ? "http://10.0.2.2:3000/craftsmen"
      //   : "http://192.168.0.213:3000/craftsmen";
      "http://81.89.193.99:3001/api/user/register";
    const data = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      email: this.state.email,
      role: this.state.role,
      selfEmployed: this.state.selfemployed,
      company: this.state.company,
      category: this.state.category,
      street: this.state.street,
      city: this.state.city,
      pcode: this.state.pcode,
      phno: this.state.phno,
      password: this.state.password,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //console.log("Success:", response)
  addAddress = (address) => {
    this.setState({
      street: address.street,
      city: address.city,
      pcode: address.pcode,
    });
  };

  handleSubmit = (values) => {
    if (values.firstname.length > 0 && values.lastname.length > 0  && values.email.length > 0 && values.password.length > 0 && values.mobilenumber.length > 0) {
      setTimeout(() => {
       console.log(this.state)
      }, 3000);
    }
    // if (values.role === 1) {
    //   setTimeout(() => {
    //     this.props.navigation.navigate("Customer");
    //   }, 3000);
    // } else if (values.role === 2) {
    //   setTimeout(() => {
    //     this.props.navigation.navigate("App");
    //   }, 3000);
    // } else if (values.role === 3) {
    //   setTimeout(() => {
    //     this.props.navigation.navigate("Agent");
    //   }, 3000);
    // }
  };
  render() {
    return (
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          role: "",
          company: "",
          mobilenumber: "",
          password: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          console.log("test");
          this.handleSubmit(values);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
          isValid,
        }) => {
          return (
            <Container>
              <Content style={{ paddingVertical: 15 }}>
                <KeyboardAwareScrollView
                  enableOnAndroid={true}
                  enableAutomaticScroll={Platform.OS === "ios"}
                >
                  <Form>
                    <Item>
                      <Icon active name="person" />
                      <Input
                        placeholder="Enter your FirstName"
                        onChangeText={(text) => {
                          this.setState({ firstname: text });
                        }}
                        value={this.state.firstname}
                      />
                      <Text style={{ color: "red" }}>
                        {touched.firstname && errors.firstname}
                      </Text>
                    </Item>
                    <Item>
                      <Icon active name="person" />
                      <Input
                        placeholder="Enter your LastName"
                        onChangeText={(text) => {
                          this.setState({ lastname: text });
                        }}
                        value={this.state.lastname}
                      />
                      <Text style={{ color: "red" }}>
                        {touched.lastname && errors.lastname}
                      </Text>
                    </Item>
                    <Item style={{ paddingVertical: 10 }}>
                      <Icon active name="ios-mail" />
                      <Input
                        placeholder="Email"
                        onChangeText={(text) => {
                          this.setState({ email: text });
                        }}
                        value={this.state.email}
                      />
                      {touched.email && errors.email && (
                        <Text style={{ fontSize: 10, color: "red" }}>
                          {errors.email}
                        </Text>
                      )}
                    </Item>
                    <Item style={{ paddingVertical: 10 }}>
                      <Icon active name="ios-people" />
                      <Picker
                        style={{ height: 40, width: 400 }}
                        mode="dropdown"
                        placeholder="Choose your role"
                        prompt={"Who are you"}
                        itemStyle={{ backgroundColor: "grey" }}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({ role: itemValue });
                        }}
                        selectedValue={this.state.role}
                      >
                        <Picker.Item
                          style={{ paddingVertical: 10 }}
                          label="Choose your role"
                          value={null}
                          key={0}
                        />
                        <Picker.Item label="Customer" value={1} key={1} />
                        <Picker.Item label="Craftsmen" value={2} key={2} />
                        <Picker.Item label="Agent" value={3} key={3} />
                      </Picker>
                    </Item>
                    {this.state.role === 1 ? (
                      <RegisterAddress addAddress={this.addAddress} />
                    ) : (
                      []
                    )}
                    {this.state.role === 2 ? <RegisterCraftsmen /> : []}
                    {this.state.role === 3 ? <RegisterCraftsmen /> : []}
                    {touched.role && errors.role && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.role}
                      </Text>
                    )}
                    <Item style={{ paddingVertical: 10 }}>
                      <Icon active name="ios-phone-portrait" />
                      <Input
                        placeholder=" Enter your Mobile Number"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          this.setState({ phno: text });
                        }}
                        value={this.state.phno}
                      />
                    </Item>
                    {touched.mobilenumber && errors.mobilenumber && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.mobilenumber}
                      </Text>
                    )}
                    <Item style={{ paddingVertical: 10 }}>
                      <Icon active name="ios-lock" />
                      <Input
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                          this.setState({ password: text });
                        }}
                        value={this.state.password}
                      />
                    </Item>
                    {touched.password && errors.password && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.password}
                      </Text>
                    )}
                  </Form>
                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonType="outline"
                      onPress={this.handleSubmit}
                      title="SIGN UP"
                      buttonColor="#039BE5"
                      // disabled={!isValid}
                      loading={isSubmitting}
                    />
                  </View>
                </KeyboardAwareScrollView>
              </Content>
            </Container>
          );
        }}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  inputStyle: {
    padding: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  buttonContainer: {
    margin: 25,
  },
});
