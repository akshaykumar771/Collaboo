import React from "react";
import { View, Text, AsyncStorage, KeyboardAvoidingView, Alert, StyleSheet } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import {Button,Icon } from 'native-base'
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";


class ChatConversationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!",
  });
  constructor(props) {
    //console.log("socket", props.socket);
    super(props);
    this.state = {
      messages: [],
      userId: props.userId,
      socket: props.socket,
      toUserID: this.props.navigation.getParam("userId"),
      
    };
    this.postUserChats = this.postUserChats.bind(this);
    // this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.receiveSockets = this.receiveSockets.bind(this);
    props.socket.on('action', this.receiveSockets);
    props.socket.on("error", (error) => {
      console.log("from chat conv", error);
    });
  }
  componentDidMount() {
    this.getUserChats();
  }
  
   receiveSockets(action) {

    //const toUserId = this.props.navigation.getParam("userId");
    //console.log("toUserID in recieve", this.state.toUserID)
    // return await socket.on("action", (action) => {
      //console.log("recieve sockets", action);
      switch (action.type) {
        case "messages": {
          if(action.data.status == 204){
            console.log("action 204")
            Alert.alert(
              "No Chats Found",
              "Please start a conversation to make your life easier",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          }
          else{
          const gcmMessages = action.data.data.messages.map((chatMessage) => {
            let gcm = {
              _id: chatMessage._id,
              text: chatMessage.msgtext,
              createdAt: chatMessage.createdAt,
              user: {
                _id: chatMessage.senderid,
              },
            };
            return gcm;
          });
          this.setState({
            messages: gcmMessages.reverse(),
          });
          //console.log("from messages state:", this.state.messages)
        }
          break;
        }
      
        case "messageSent": {
          //console.log("from message sent: ", action.data)
          if (action.data != undefined)
            // this._storeMessages(messages);
            //console.log("data in msg sent: ", action.data)
            this._storeMessages([{ _id:action.data._id , createdAt: action.data.createdAt,text: action.data.message,user:{_id: action.data.from}}]);
            this.state.socket.messageSent = action.data.data;
          break;
        }
        case "sendMessage": {
          if (action.data.from === this.state.toUserID) {
            //console.log("from case sendmesg", action.data);
            this._storeMessages([{ _id:action.data._id , createdAt: action.data.createdAt,text: action.data.message,user:{_id: action.data.from}}]);
          }
        }
      }
    // });
  }
  getUserChats() {
    const userId = this.state.toUserID;
    //console.log("toUserID in get", userId)
    const data = { toUserId: userId };
    const action = { type: "chat:chat/messages/get", data: data };
    this.state.socket.emit("action", action);
    //this.receiveSockets(this.state.socket);
  }
  async postUserChats(message, image) {
    const userId = this.state.toUserID;
    //console.log("userid: ", userId);
    if(image != undefined){
      message.text = ""
    }
    const data = {
      toUserId: userId,
      messageInfo: { text: message.text, file: image },
    };
    const action = { type: "chat:chat/message/post", data: data };
    this.state.socket.emit("action", action);
  }


  /**
   * ss(this.state.socket).emit('profile-image', stream, {name: filename});
      
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  async onSend(messages = [], image) {
    console.log("message", messages[0]);
     await this.postUserChats(messages[0], image);
    //  console.log("from on send function: ", messages[0]);
    // if (socket.messageSent) {
    //   this._storeMessages(messages);
    // } else {
    //   console.log("error");
    // }
  }
choosePicture = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
   
    let filename = result.uri.replace(/^.*[\\\/]/, '')
    let file = 
    {
        uri: result.uri,
        originalname: filename,
        mimetype: "image/jpg",
      };
      console.log("formdata chat", result)
    this.setState({ image: file});
  }
  //console.log("chat state", this.state.image)
  //console.log("result chat", result)
}
  render() {
    const userId = { _id: this.state.userId || -1 };
    return (
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages, this.state.image)}
          alwaysShowSend = {true}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: "white",
                  },
                  left: {
                    color: "black",
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: "#D6D6D6",
                  },
                  right: {
                    backgroundColor: Colors.primary,
                  },
                }}
              />
            );
          }}
          renderSend = {(props) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
      {/* <Button icon="camera" iconColor={Colors.primaryBlue} size={40} style={{  }} onPress={() => this.choosePicture()} /> */}
      <Button
                      transparent
                      style={{marginHorizontal: 5}}
                      onPress={() => this.choosePicture()}
                    >
                      <Icon
                        active
                        name="md-attach"
                        style={{ fontSize: 16, color: "black" }}
                      />
                    </Button>
      <Send {...props}>
        <View style={styles.btnSend}>
          <Icon name="ios-send" size={24} color="#ffffff" />
        </View>
      </Send>
    </View>
          )}
          user={userId}
          // inverted={false}
        />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    //console.log("previousState", this.state.messages);
    //console.log("store messages", messages);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

const styles =  StyleSheet.create({
  btnSend: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: Colors.primary,
    borderRadius: 50
  }
})
const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
  userId: state.userReducer.userId,
});

export default connect(mapStateToProps, null)(ChatConversationScreen);
