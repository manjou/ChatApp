import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor } = route.params;
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  // changing the color of the right bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#ccd9ff',
          },
        }}
        textStyle={{
          right: {
            color: 'black',
          },
        }}
      />
    )
  }

  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      }
    ]);
  }, []);

 return (
  <View style={[styles.container, {backgroundColor: backgroundColor}]}>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
        renderBubble={renderBubble}
      />  

{ Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;