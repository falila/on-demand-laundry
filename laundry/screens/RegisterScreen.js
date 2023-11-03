import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../firebase";
import {setDoc, doc} from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const navigation = useNavigation();
  const register = () => {
    if (password === "" && email === "" && phone === "") {
      Alert.alert(
        "Invalid information",
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
        console.log("register");
        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log(userCredentials);
            const UserUuid = auth.currentUser.uid;
            const userEmail = userCredentials._tokenResponse.email;
            //set user
            setDoc(doc(db, "users",`${UserUuid}`), {
                email: userEmail,
                phone: phone,

            })
        }
        );
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
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
            Register
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Create an new account
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
              secureTextEntry={true}
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
            <MaterialIcons name="phone-android" size={24} color="black" />
            <TextInput
              placeholder="Phone No"
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
              placeholderTextColor="black"
              style={{
                fontSize: phone ? 19 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 250,
                marginVertical: 10,
              }}
            />
          </View>
          <Pressable
            onPress={register}
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
              Register
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 3 }}
            onPress={() => navigation.navigate("Login")}
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
              Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default RegisterScreen;
