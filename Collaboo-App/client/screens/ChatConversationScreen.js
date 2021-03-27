import React from "react";
import { View, Alert, StyleSheet, Image } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { Button, Icon } from "native-base";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Buffer } from "buffer";

class ChatConversationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!",
  });
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: props.userId,
      socket: props.socket,
      toUserID: this.props.navigation.getParam("userId"),
    };
    this.postUserChats = this.postUserChats.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.receiveSockets = this.receiveSockets.bind(this);
    props.socket.on("action", this.receiveSockets);
    props.socket.on("error", (error) => {
      console.log("from chat conv", error);
    });
  }
  componentDidMount() {
    this.getUserChats();
  }

  receiveSockets(action) {
    switch (action.type) {
      case "messages": {
        if (action.data.status == 204) {
          console.log("action 204");
          Alert.alert(
            "No Chats Found",
            "Please start a conversation to make your life easier",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        } else {
          const gcmMessages = action.data.data.messages.map((chatMessage) => {
            let gcm = {
              _id: chatMessage._id,
              text: chatMessage.msgtext,
              createdAt: chatMessage.createdAt,
              user: {
                _id: chatMessage.senderid,
              },
            };
            if (chatMessage.msgtype === "TEXT") {
              gcm.text = chatMessage.msgtext;
            } else if (chatMessage.msgtype === "FILE") {
              let base64 = new Buffer(chatMessage.fileid.data).toString(
                "base64"
              );

              gcm.image =
                "data:" + chatMessage.fileid.contentType + ";base64," + base64;
            }
            return gcm;
          });
          this.setState({
            messages: gcmMessages.reverse(),
          });
        }
        break;
      }

      case "messageSent": {
        if (action.data != undefined) {
          let msg = {
            _id: action.data._id,
            createdAt: action.data.createdAt,
            user: { _id: action.data.from },
          };
          if (action.data.msgtype === "TEXT") {
            msg.text = action.data.text;
          } else if (action.data.msgtype === "FILE") {
            let base64 = new Buffer(action.data.fileinfo.data).toString(
              "base64"
            );
            msg.image =
              "data:" + action.data.fileinfo.contentType + ";base64," + base64;
          }
          this._storeMessages([msg]);
        }
        this.state.socket.messageSent = action.data.data;
        break;
      }
      case "sendMessage": {
        if (action.data.from === this.state.toUserID) {
          let msg = {
            _id: action.data._id,
            createdAt: action.data.createdAt,
            user: { _id: action.data.from },
          };
          if (action.data.msgtype === "TEXT") {
            msg.text = action.data.text;
          } else if (action.data.msgtype === "FILE") {
            let base64 = new Buffer(action.data.fileinfo.data).toString(
              "base64"
            );
            msg.image =
              "data:" + action.data.fileinfo.contentType + ";base64," + base64;
          }
          this._storeMessages([msg]);
        }
      }
    }
  }
  getUserChats() {
    const userId = this.state.toUserID;
    const data = { toUserId: userId };
    const action = { type: "chat:chat/messages/get", data: data };
    this.state.socket.emit("action", action);
  }
  async postUserChats(message, image) {
    const userId = this.state.toUserID;
    if (image != undefined) {
      message.text = "";
    }
    const data = {
      toUserId: userId,
      messageInfo: { text: message.text, file: image },
    };

    const action = { type: "chat:chat/message/post", data: data };
    this.state.socket.emit("action", action);
  }

  async onSend(messages = [], image) {
    await this.postUserChats(messages[0], image);
  }
  choosePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    let bufferVal = Buffer.from(result.base64, "base64");
    if (!result.cancelled) {
      let filename = result.uri.replace(/^.*[\\\/]/, "");
      let file = {
        buffer: bufferVal,
        originalname: filename,
        mimetype: "image/png",
      };
      this.setState({ image: file });
    }
  };
  renderMessageImage = (props) => {
    const { currentMessage } = props;
    return (
      <View>
        <Image
          source={{
            uri: currentMessage.image,
          }}
          resizeMode="cover"
          style={{
            width: 170,
            height: 220,
            marginTop: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
            overflow: "hidden",
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>
    );
  };
  render() {
    const userId = { _id: this.state.userId || -1 };
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages, this.state.image)}
        alwaysShowSend={true}
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
        renderSend={(props) => (
          <View
            style={{ flexDirection: "row", alignItems: "center", height: 50 }}
          >
            <Button
              transparent
              style={{ marginHorizontal: 5 }}
              onPress={() => this.choosePicture()}
            >
              <Icon
                active
                name="md-attach"
                style={{ fontSize: 18, color: "black" }}
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
      />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

const styles = StyleSheet.create({
  btnSend: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 50,
  },
});
const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
  userId: state.userReducer.userId,
});

export default connect(mapStateToProps, null)(ChatConversationScreen);
