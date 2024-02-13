import { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { query, orderBy, collection, addDoc, onSnapshot } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { userID, name, backgroundColor } = route.params;

  let unsubMessages;

  useEffect(() => {
    // set user name as the title of the chat screen
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
            user: {...doc.data().user, avatar: 'https://placeimg.com/140/140/any' },
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
     } else {
      loadCachedMessages();
    }
      // clean up code
      return () => {
        if (unsubMessages) unsubMessages();
      }
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  // const onSend = (newMessages) => {
  //   addDoc(collection(db, "messages"), { _id: newMessages[0]._id, ...newMessages })
  // }
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }


 return (
  <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <GiftedChat
        messages={messages}
        renderInputToolbar={(props) => renderInputToolbar(props, isConnected)}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
        renderBubble={renderBubble}
      />  

{ Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
  </View>
 )
}

  // changing the color of the right bubble˚
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