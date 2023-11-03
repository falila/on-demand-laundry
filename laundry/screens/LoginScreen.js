import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useState } from "react";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const subcribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
        setIsLoading(false);
      }
      if (authUser) {
        navigation.navigate("Home");
      }
    });
    return subcribe;
  }, []);
  const login = () => {
    if (email === "" && password === "") {
      Alert.alert(
        "Invalid login information",
        "Please fill the form",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
        }
      ).catch((error) => {
        console.log("error", error);
      });
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
       {isLoading ? (
        <View style={{alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
          <Text style={{fontSize:22, fontWeight:"500"}}> Loading </Text>
          <ActivityIndicator size="large" color="bleu"/>
        </View>
       ): 
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign In</Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Sign In to your account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Fontisto name="email" size={24} color="black" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={{
                fontSize: password ? 19 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 250,
                marginVertical: 10,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="form-textbox-password"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              placeholderTextColor="black"
              style={{
                fontSize: password ? 19 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 250,
                marginVertical: 10,
              }}
            />
          </View>
          <Pressable
            onPress={() => login()}
            style={{
              width: 200,
              backgroundColor: "#318CEF",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Login
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 3 }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "gray",
                fontWeight: "500",
                padding: 10,
              }}
            >
              Don't have an account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default LoginScreen;
