import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  View,
  Alert,
} from "react-native";
import React from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useState } from "react";
import deliveryTime, { times } from "../data/deliveryTime";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickupScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [delivery, setDelivery] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();

  const proceedToCart = () => {
    if (!delivery || !selectedDate || !selectedTime) {
      Alert.alert("Invalid value selected", "Select a delivery time and date", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (delivery && selectedDate && selectedTime) {
      navigation.navigate("Cart",{
        pickUpDate: selectedDate.toString(),
        selectedTime:JSON.stringify(selectedTime),
        no_Of_days:delivery,
    })
    }
  };

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((current, prev) => current + prev, 0);
  return (
    <>
      <SafeAreaView>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            marginHorizontal: 10,
            padding: 10,
          }}
        >
          Enter address
        </Text>
        <TextInput
          style={{
            padding: 10,
            borderWidth: 0.8,
            borderRadius: 9,
            paddingVertical: 10,
            margin: 10,
            borderColor: "gray",
          }}
        >
          {" "}
        </TextInput>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            marginHorizontal: 10,
            margin: 10,
          }}
        >
          Pick up Date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-10-1")}
          endDate={new Date("2023-10-29")}
          initialSelectedDate={new Date("2023-11-20")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            marginHorizontal: 10,
            margin: 10,
          }}
        >
          Select Time
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, i) => (
            <Pressable
              onPress={() => setSelectedTime(item.time)}
              key={i}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      borderColor: "red",
                      borderWidth: 0.9,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            marginHorizontal: 10,
            margin: 10,
          }}
        >
          Delivery Date
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((dateItem, index) => (
            <Pressable
              style={
                delivery.includes(dateItem.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      borderColor: "red",
                      borderWidth: 0.9,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
              onPress={() => setDelivery(dateItem.name)}
              key={index}
            >
              <Text> {dateItem.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
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
          <Pressable onPress={ () => proceedToCart()}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({});
export default PickupScreen;
