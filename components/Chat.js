import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { query, orderBy, collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { userID, name, backgroundColor } = route.params;
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  useEffect(() => {
   
    // set user name as the title of the chat screen
    navigation.setOptions({ title: name });

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (documentSnapshot) => {
      let newMessages = [];
      documentSnapshot.forEach((doc) => {
        newMessages.push({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        });
        });
      setMessages(newMessages);
    });

    // clean up code
    return () => {
      if (unsubscribe) unsubscribe();
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
          _id: userID, 
          name
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