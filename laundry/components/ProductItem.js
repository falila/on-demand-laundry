import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { incrementQuantity, decrementQuantity } from "../CartReducer";

const ProductItem = ({ item }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(incrementQty(item)); 
    dispatch(addToCart(item)); // for cart
  }
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "",
          borderRadius: 7,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Image
            source={item.image}
            style={{ width: 65, height: 65 }}
            
          />
        </View>
        <View>
          <Text style={{width:75, fontSize:16, fontWeight:"500", marginBottom:5}}>{item.name}</Text>
          <Text style={{width:75, color:"gray", fontSize:15}}>${item.price}</Text>
        </View>
        { cart.some((i) => i.id === item.id)?
         (<Pressable
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
      )  : (
          <Pressable style={{ width: 75 }} onPress={addItemToCart}>
          <Text
            style={{
              borderColor: "gray",
              borderWidth: 0.3,
              borderRadius:2,
              color: "#088F8F",
              textAlign: "center",
              padding: 10,
            }}
          >
            Add
          </Text>
        </Pressable> )
      }
      
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ProductItem;
