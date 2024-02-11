// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import the necessary components from react-native
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

//importing Initailization for the Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDbQAiQYQtUb4XwMP_8q_CRihLSmRG2fh8",
    authDomain: "chatapp-8fc26.firebaseapp.com",
    projectId: "chatapp-8fc26",
    storageBucket: "chatapp-8fc26.appspot.com",
    messagingSenderId: "308982341384",
    appId: "1:308982341384:web:7262920f681b888d2396bd",
    measurementId: "G-N64X3TEVQ2"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
