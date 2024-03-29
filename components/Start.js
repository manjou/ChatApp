import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const auth = getAuth();

  const signInUser = async () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name,
          backgroundColor,
        });
        Alert.alert("You have successfully signed in!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in. Please try again.");
      });
  };

  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#8A95A5");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background-image.png")}
        style={styles.imageBackground}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>Chat App</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              accessibilityLabel="Input for your name."
              style={styles.textInput}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />
            <Icon name="user" size={20} color="grey" style={styles.icon} />
          </View>

          <Text style={styles.chooseColorText}>Choose Background Color:</Text>
          <View style={styles.colorOptions}>
            <TouchableOpacity
              accessibilityLabel="Choose black as the background color."
              accessibilityRole="button"
              style={[styles.colorCircle, { backgroundColor: "#090C08" }]}
              onPress={() => setBackgroundColor("#090C08")}
            />
            <TouchableOpacity
              accessibilityLabel="Choose purple as the background color."
              accessibilityRole="button"
              style={[styles.colorCircle, { backgroundColor: "#474056" }]}
              onPress={() => setBackgroundColor("#474056")}
            />
            <TouchableOpacity
              accessibilityLabel="Choose grey as the background color."
              accessibilityRole="button"
              style={[styles.colorCircle, { backgroundColor: "#8A95A5" }]}
              onPress={() => setBackgroundColor("#8A95A5")}
            />
            <TouchableOpacity
              accessibilityLabel="Choose green as the background color."
              accessibilityRole="button"
              style={[styles.colorCircle, { backgroundColor: "#B9C6AE" }]}
              onPress={() => setBackgroundColor("#B9C6AE")}
            />
          </View>
          <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel="Start chatting button."
                  accessibilityHint="When pressed, you will be taken to the chat screen."
                  accessibilityRole="button"
                  style={styles.startChatButton} onPress={signInUser}>
            <Text style={styles.startChatButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "15%",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  innerContainer: {
    flex: 1,
    height: "44%",
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    marginBottom: "6%",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    width: "88%",
    color: "#757083",
    opacity: 50,
    fontWeight: "300",
    paddingLeft: "20%",
    padding: 15,
    borderWidth: 1,
    marginBottom: 15,
  },
  icon: {
    position: "absolute",
    left: "10%",
    top: 15,
  },
  startChatButton: {
    backgroundColor: "#757083",
    width: "88%",
    padding: 15,
    marginTop: 20,
  },
  startChatButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    marginBottom: 15,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    marginBottom: 15,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default Start;
