import { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { query, orderBy, collection, addDoc, onSnapshot } from 'firebase/firestore';


const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  const { userID, name, backgroundColor } = route.params;

  useEffect(() => {
   
    // set user name as the title of the chat screen
    navigation.setOptions({ title: name });

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
          user: {...doc.data().user, avatar: 'https://placeimg.com/140/140/any' },
        })
        });

      setMessages(newMessages);
    });

    // clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

 return (
  <View style={[styles.container, {backgroundColor: backgroundColor}]}>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          id: userID,
          name,
        }}
        renderBubble={renderBubble}
      />  

{ Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
  </View>
 )
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

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;