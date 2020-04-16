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
} from "native-base";
import { Formik } from "formik";
import Colors from "../constants/Colors";
import RegisterCraftsmen from "../components/RegisterCraftsmen";
import * as yup from 'yup';

const signUpSchema = yup.object({
  fullname: yup.string()
  .required('Please enter your Full Name')
  .min(3),
  email: yup.string()
  .required('Please enter your valid email address')
  .email('Enter valid email'),
  address:yup.string()
  .min(3),
  PLZ: yup.string()
  .min(5, 'Postalzeit must be atleast 5 digits')
  .test('isNumber', 'Postalzeit must be a number', (val) => {
    return parseInt(val)
  }),
  city:yup.string(),
  role: yup.string()
  .required('Please choose your role'),
  company: yup.string()
  .required('Please enter your company name'),
  mobilenumber: yup.string()
  .required('Please enter your valid phone number')
  .test('isMobile', 'Mobile number must be a number', (val) => {
    return parseInt(val)
  }),
  password: yup.string()
  .required()
  .min(6, 'Password must have atleast 6 characters')
})
export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[],
      selectedRole: "",
      selectedCraftsmen: false,
    };
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }

  handleRoleSelect = (itemValue) => {
    this.setState({
      selectedRole: itemValue,
    });
    if (this.state.selectedRole === "Craftsmen") {
      this.setState({
        selectedCraftsmen: true,
      });
    }
  };
  render() {
    return (
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          address: "",
          PLZ: "",
          city: "",
          role: "",
          company:"",
          mobilenumber: "",
          password: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {(props) => {
          return (
            <Container>
              <Content>
                <Form>
                  <Item stackedLabel>
                    <Label>Full Name</Label>
                    <Input
                      placeholder="FullName"
                      value={props.values.fullname}
                      onChangeText={props.handleChange("fullname")}
                    />
                  </Item>
                  {props.touched.fullname && props.errors.fullname &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.fullname}</Text> }
                  <Item stackedLabel>
                    <Label>Email</Label>
                    <Input
                      placeholder="Email"
                      value={props.values.email}
                      onChangeText={props.handleChange("email")}
                    />
                  </Item>
                  {props.touched.email && props.errors.email &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.email}</Text> }
                  <Item stackedLabel>
                    <Label>Address</Label>
                    <Input
                      placeholder="Address"
                      value={props.values.address}
                      onChangeText={props.handleChange("address")}
                    />
                  </Item>
                  {props.touched.address && props.errors.address &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.address}</Text> }
                  <Item stackedLabel>
                    <Label>Postalzeit</Label>
                    <Input
                      placeholder="Postalzeit"
                      value={props.values.PLZ}
                      onChangeText={props.handleChange("PLZ")}
                    />
                  </Item>
                  {props.touched.PLZ && props.errors.PLZ &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.PLZ}</Text> }
                  <Item stackedLabel>
                    <Label>City</Label>
                    <Input
                      placeholder="City"
                      value={props.values.city}
                      onChangeText={props.handleChange("city")}
                    />
                  </Item>
                  {props.touched.city && props.errors.city &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.city}</Text> }
                  <Item stackedLabel>
                    <Label>Who are you</Label>
                    <Picker
                      style={{ height: 40, width: 400 }}
                      mode="dropdown"
                      prompt={"Who are you"}
                      itemStyle={{ backgroundColor: "grey" }}
                      selectedValue={this.state.selectedRole}
                      onValueChange={(itemValue, itemIndex) =>
                        //this.setState({ selectedRole: itemValue })
                        this.handleRoleSelect(itemValue)
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
                  </Item>
                  
                  {this.state.selectedRole === 2 && <RegisterCraftsmen />}
                  {this.state.selectedRole === 3 && <RegisterCraftsmen />}
                  {props.touched.role && props.errors.role &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.role}</Text> }
                  <Item stackedLabel>
                    <Label>Mobile Number</Label>
                    <Input
                      placeholder="Mobile Number"
                      value={props.values.mobilenumber}
                      onChangeText={props.handleChange("mobilenumber")}
                    />
                  </Item>
                  {props.touched.mobilenumber && props.errors.mobilenumber &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.mobilenumber}</Text> }
                  <Item stackedLabel last>
                    <Label>Password</Label>
                    <Input
                      placeholder="Enter Password"
                      value={props.values.password}
                      secureTextEntry={true}
                      onChangeText={props.handleChange("password")}
                    />
                  </Item>
                  {props.touched.password && props.errors.password &&
                  <Text style = {{fontSize:10, color:'red'}}>{props.errors.password}</Text> }
                </Form>
                <View style={styles.buttonContainer}>
                  <Button title="Sign up" onPress={props.handleSubmit}/>
                </View>
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
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
