import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const Product = ({ item }) => {
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
            source={{ uri: item.image }}
            style={{ width: 65, height: 65 }}
          />
        </View>
        <View>
          <Text style={{width:75, fontSize:16, fontWeight:"500", marginBottom:5}}>{item.name}</Text>
          <Text style={{width:75, color:"gray", fontSize:15}}>${item.price}</Text>
        </View>
        <Pressable style={{ width: 75 }}>
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
        </Pressable>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Product;
