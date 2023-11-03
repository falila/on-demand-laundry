import { StyleSheet, Text, ScrollView, View, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, clearCart } from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const CartScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const route = useRoute();
  const placeOrder = async() => {
    navigation.navigate("Order");
    dispatch(clearCart());
  }

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((current, prev) => current + prev, 0);
  return (
    <>
    <ScrollView style={{ marginTop: 60 }}>
      {total === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginTop: 40, padding: 10 }}>Your cart is empty</Text>
        </View>
      ) : (
        <View>
          <Ionicons
            name="arrow-back"
            onPress={() => navigation.navigate("Pickup")}
            size={24}
            color="black"
          />
          <Text style={{ marginBottom: 20 }}>Your Cart</Text>
          <Pressable
            style={{
              backgroundColor: "white",
              borderRadius: 13,
              marginLeft: 13,
              marginRight: 13,
              padding: 13,
            }}
          >
            {cart.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: "500" }}>
                  {item.name}
                </Text>
                {/** + - button  */}
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      dispatch(decrementQuantity(item)); // cart
                      dispatch(decrementQty(item)); // product
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderColor: "#BEBEBE",
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      -
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 19,
                        color: "#088F8F",
                        paddingHorizontal: 8,
                        fontWeight: "600",
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      dispatch(incrementQuantity(item)); // cart
                      dispatch(incrementQty(item)); //product
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderColor: "#BEBEBE",
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>

                <Text style={{ fontWeight: "500" }}>
                  {" "}
                  {item.price * item.quantity}
                </Text>
              </View>
            ))}
          </Pressable>

          <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    $ {total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {/*route.params.pickUpDate*/}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    $ {total + 25}
                  </Text>
                </View>
              </View>
           </View>
           </View>
      )}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});
export default CartScreen;
