import * as React from "react";
import {
  Button,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import FitImage from 'react-native-fit-image';
class InventoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imagesData: "",
      inventory: [],
    };
  }
  componentDidMount() {
    this.fetchImagesFromServer();
  }
  // shouldComponentUpdate(nextProps) {
  //   console.log(nextProps.token, this.props.token);
  //   if (nextProps.token == this.props.token) {
  //     this.fetchImagesFromServer();
  //   }
  //   return true;
  // }
 

  fetchImagesFromServer = () => {
    console.log("fetch image");
    const url = "http://81.89.193.99:3001/api/inventory?inventorytype=OTHER";
    const bearer = "Bearer " + this.props.token;
    console.log("bearer", bearer);
    fetch(url, {
      method: "GET",
      headers: { Authorization: bearer },
    })
      .then((response) => {
        //console.log("1st res", response);
        const status = response.status;
        if (status === 200) {
          return response.json();
        }
        // } else if (status === 204) {
        //   Alert.alert(
        //     "No Images Found",
        //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        //     { cancelable: false }
        //   );
        // }
      })
      .then((responseJson) => {
        //console.log("INVENTORY RESPONSE", responseJson);
        Promise.all(
          responseJson.map((item) => {
            return new Promise((resolve, reject) => {
              let inventoryid = item._id;
              //console.log("inventoryid", inventoryid);
              fetch(
                `http://81.89.193.99:3001/api/inventory/file/${inventoryid}`,
                {
                  method: "GET",
                  headers: { Authorization: bearer },
                }
              )
                .then((response) => {
                  return response.json();
                })
                .then((response) => {
                  let inventory = {
                    buffer: response.bufferBase64,
                    ...item,
                  };
                  //console.log("inventory res", response)
                  resolve(inventory);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          })
        )
          .then((result) => {
            //console.log("------------", result);
            this.setState({
              inventory: result,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  _pickImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    let filename = result.uri.replace(/^.*[\\\/]/, '')
    console.log("result", result, filename)
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      let apiUrl = "http://81.89.193.99:3001/api/inventory";
      const bearer = "Bearer " + this.props.token;
      let uriParts = result.uri.split(".");
      let fileType = uriParts[uriParts.length - 1];

      let formData = new FormData();
      formData.append("file", {
        uri: this.state.image,
        name: filename,
        type: "image/jpg",
      });
      console.log("formData", formData)
      await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        //.then((response) => response.json())
        .then(async (response) => {
          await this.fetchImagesFromServer()
        })
        .catch((E) => {
          console.log(E);
        });
    }
  };

  render() {
    
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <TouchableOpacity
            style={styles.requestButton}
            underlayColor="#fff"
            onPress={this._pickImage}
          >
            <Text style={{ fontSize: 22, color: "white", fontWeight: "600" }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <View style = {{flex:1}}>
        <ScrollView>
        <View style={{flexDirection: 'row',justifyContent:'space-around', alignItems:'center', flexWrap:"wrap", paddingTop: 30,}}>
        {this.state.inventory.map((item) => {
          return (
            
              <Image
                source={{
                  uri:
                    "data:" +
                    item.fileid.contentType +
                    ";base64," +
                    item.buffer,
                }}
                resizeMode = "contain"
                style={{
                  width: 140,
                  height:100,
                  marginTop:10,
                  borderColor:'red',
                  borderRadius: 20
                }}
              />
            
          );
        })}
        </View>
        </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  requestButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default connect(mapStateToProps, null)(InventoryScreen);
