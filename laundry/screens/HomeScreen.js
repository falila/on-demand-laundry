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
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((current, prev) => current + prev, 0);

  const [showCurrentAddress, setShowCurrentAddress] = useState(
    "loading current location"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    //checkIfLocationEnabled();
    //getCurrentLocation();
    setShowCurrentAddress("Toronto 2nd Floor");
  }, []);

  useEffect(() => {
    if (product && product.length > 0) return;
    const fetchProduct = () => {
      products.map((product) => dispatch(getProducts(product)));
    };
    fetchProduct();
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
    <>
      <ScrollView style={{ backgroundColor: "#FFFFFF", marginTop: 40 }}>
        {/** address */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
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
        {product &&
          product.map((product, i) => <ProductItem item={product} key={i} />)}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
              {cart.length} items | $ {total}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "white" }}>
              extra charges migth apply
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("Pickup")}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
              {" "}
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
