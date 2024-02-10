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
    apiKey: "AIzaSyDkd3DVIg-By9zupOJ5U1T9PBZL_UDSOM0",
    authDomain: "shopping-list-demo-5a740.firebaseapp.com",
    projectId: "shopping-list-demo-5a740",
    storageBucket: "shopping-list-demo-5a740.appspot.com",
    messagingSenderId: "550250686696",
    appId: "1:550250686696:web:a7ea55253a87defe1c015d",
    measurementId: "G-D6XY59CEKM"
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
