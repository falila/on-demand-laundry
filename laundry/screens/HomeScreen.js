import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as location from "expo-location";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ImageSlider from "../components/ImageSlider";
import Services from "../components/Services";
import products from "../data/products";
import Product from "../components/Product";

const HomeScreen = () => {
  const [showCurrentAddress, setShowCurrentAddress] = useState(
    "loading current location"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    //checkIfLocationEnabled();
    //getCurrentLocation();
    setShowCurrentAddress("Paris ile de france");
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location service not enabled",
        "Please enable location service",
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
      setLocationServiceEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = location.requestForegroundPermissionsAsync(); //await location.requestBackgroundPermissionsAsync();
    if (status != "granted") {
      Alert.alert(
        "Pernmission denied",
        " Allow this app to use your location",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    const { coords } = await location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let res = await location.reverseGeocodeAsync({ latitude, longitude });
      console.log(res);
      for (let item of res) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setShowCurrentAddress(address);
      }
    }
  };

  return (
    <ScrollView
    style={{ backgroundColor: "#FFFFFF", marginTop:20 }}>
      {/** address */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <MaterialIcons name="add-location" size={24} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text> {showCurrentAddress}</Text>
        </View>
        <Pressable style={{ marginLeft: "auto", marginRight: "2%" }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri:
                "https://lh3.googleusercontent.com/ogw/AKPQZvxOlIHWLMqc8ypzqU01tL5aujbfKL7Llp_2zLXq9Jc=s32-c-mo",
            }}
          />
        </Pressable>
      </View>
      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          margin: 10,
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#C0C0C0",
          borderRadius: 8,
        }}
      >
        <TextInput placeholder="search for items..." />
        <MaterialIcons name="search" size={24} color="#fd5c63" />
      </View>
      {/* image slider  */}
      <ImageSlider />

      {/* Services  <Services /> */}
      <Services />

       {/*  */}
       {products.map((product, i) => (
        <Product item={product} key={i}/>
       ))}
    </ScrollView>

   
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
