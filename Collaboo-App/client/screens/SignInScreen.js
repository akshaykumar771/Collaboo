import React, {Component} from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { Button } from "react-native-elements";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { Formik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(4, "Password must have at least 4 characters "),
});
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  onLogin = async () => {
    const { email, password } = this.state;
    try {
      if (email.length > 0 && password.length > 0) {
        this.props.navigation.navigate("App");
      }
    } catch (error) {
      alert(error);
    }
  };
  handleSubmit = (values) => {
    if (values.email.length > 0 && values.password.length > 0) {
      setTimeout(() => {
        this.props.navigation.navigate("App");
      }, 3000);
    }
  };
  goToSignup = () => {
    this.props.navigation.navigate("Signup")
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            isSubmitting,
            touched,
            handleBlur,
          }) => (
            <View>
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur("email")}
              />
              <Text style={{ color: "red" }}>
                {touched.email && errors.email}
              </Text>
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="Enter password"
                secureTextEntry
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur("password")}
              />
              <Text style={{ color: "red" }}>
                {touched.password && errors.password}
              </Text>
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="LOGIN"
                  buttonColor="#039BE5"
                  disabled={!isValid}
                  loading={isSubmitting}
                />
              </View>
            </View>
          )}
          
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: "#F57C00",
          }}
          type="clear"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    margin: 25,
  },
});
