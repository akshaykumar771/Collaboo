import * as React from "react";
import { Button, Image, View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import Colors from "../constants/Colors"
class InventoryScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image : null
    }
  }
 

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1}}>
      <View style = {{padding: 10}}>
        <TouchableOpacity style={styles.requestButton}
                      underlayColor="#fff"
                      onPress={this._pickImage}>
          <Text style = {{fontSize: 22, color:'white', fontWeight:"600"}}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Button title="Pick an image from camera roll" onPress={this._pickImage} /> */}
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
testcheck = async() => {
  await console.log("working")
}
  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        let apiUrl = 'http://81.89.193.99:3001/api/inventory';
        const bearer = "Bearer " + this.props.token;
  let uriParts = result.uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('file', {
   uri: this.state.image,
    name: 'photo',
    type: 'image/jpg',
    
  });
  await fetch(apiUrl, {
    method: 'POST',
    body: formData,
        headers: {
          Authorization: bearer,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
  //.then((response) => response.json())
  .then((response) => {
    console.log("response from inventory", response)
  })
    .catch ((E) => {
      console.log(E);
    })
  };
  }
}

// InventoryScreen.navigationOptions = {
//     headerRight: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="File System"
//           iconName="ios-add"
//           onPress={() => console.log("test")}
//         />
//       </HeaderButtons>
//     )
// }
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
    flexDirection:'row',
    alignItems: 'center', 
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default connect(mapStateToProps, null)(InventoryScreen);
