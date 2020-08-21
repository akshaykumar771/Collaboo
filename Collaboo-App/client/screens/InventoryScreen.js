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
import { NavigationEvents } from "react-navigation";
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
    if(this.props.token){
    this.fetchImagesFromServer();
    }
  }
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
      const status = response.status;
      console.log("agent status", status);
      if (status === 200) {
        return response.json();
      } else if (status === 204) {
        console.log("agent 204");
        Alert.alert(
          "Sorry",
          "No Images Found",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }
    })
      .then((responseJson) => {
        console.log("INVENTORY RESPONSE", responseJson);
        if(responseJson === undefined){
          Alert.alert(
            "No Images",
            "Please add images from your galley",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
        else{
        Promise.all(
          responseJson && responseJson.map((item) => {
            return new Promise((resolve, reject) => {
              let inventoryid = item._id;
              this.fetchInventory(resolve, reject,item)
              //console.log("inventoryid", inventoryid);
              // fetch(
              //   `http://81.89.193.99:3001/api/inventory/file/${inventoryid}`,
              //   {
              //     method: "GET",
              //     headers: { Authorization: bearer },
              //   }
              // )
              //   .then((response) => {
              //     return response.json();
              //   })
              //   .then((response) => {
              //     let inventory = {
              //       buffer: response.bufferBase64,
              //       ...item,
              //     };
              //     console.log("inventory res", inventory)
              //     resolve(inventory);
              //   })
              //   .catch((err) => {
              //     reject(err);
              //   });
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  fetchInventory = (resolve, reject, item) => {
    const bearer = "Bearer " + this.props.token;
    //console.log("inventory id", inventoryid)
    fetch(
      `http://81.89.193.99:3001/api/inventory/file/${item._id}`,
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
        console.log("inventory res", inventory)
        resolve(inventory);
      })
      .catch((err) => {
        reject(err);
      });
    
  }
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
        .then((response) => response.json())
        .then(async (response) => {
        new Promise((resolve, reject) => {
            this.fetchInventory(resolve, reject, response)
         })
         .then((res) => {
           console.log("res", res)
          //  this.setState({
          //    ...this.state.inventory,
          //     inventory: res
          //  })
          this.state.inventory.push(res);
          this.setState({
            inventory: this.state.inventory.reverse()
          })
           console.log("state", this.state.inventory)
         })
         .catch((e) => {console.log(e)})
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
        <NavigationEvents onDidFocus={() => this.fetchImagesFromServer()} />
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
        <View style={{flexDirection: 'row',justifyContent:'space-around', alignItems:'center', flexWrap:"wrap", paddingTop: 30, paddingHorizontal:15}}>
        {this.state.inventory.map((item) => {
          return (
            <View>
              <Image
                source={{
                  uri:
                    "data:" +
                    item.fileid.contentType +
                    ";base64," +
                    item.buffer,
                }}
                
                
                resizeMode = "cover"
                style = {{width:170,
                  height: 220,
                  marginTop:10,
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  overflow: "hidden",
                  borderBottomRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius:10,
                  borderTopRightRadius:10
                  }}
              />
           </View>
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
