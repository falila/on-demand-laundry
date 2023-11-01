import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";
const handWatch =  require("../assets/hand-watch-icon.png");
const washIron =  require("../assets/wash-iron-icon.png");
const iron =  require("../assets/iron.png");
const washing =  require("../assets/icon.png");
const cleaning =  require("../assets/cleaning-icon.png");
const laundryIcon =  require("../assets/laundry-icon.png");
const delivery =  require("../assets/bike-driver-icon.png");

export default Services = () => {
  const services = [
    {
      id: "0",
      image: washing,
      name: "Washing",
    },
    {
      id: "14",
      image: delivery,
      name: "Delivery",
    },
    {
      id: "15",
      image: iron,
      name: "Ironning",
    },
    {
      id: "16",
      image: handWatch,
      name: "Hand-Watching",
    },
    {
      id: "11",
      image: laundryIcon,
      name: "Laundry",
    },
    {
      id: "12",
      image: washIron,
      name: "Wash & Iron",
    },
    {
      id: "13",
      image:  cleaning,
      name: "Cleaning",
    },
   
  ];

  return (
    <View style={{padding:10}}>
      <Text style={{fontSize:16, fontWeight:"500", marginBottom:6}}> Our Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable key={index} style={{alignItems:"center", padding:15, backgroundColor:"white", borderRadius:7}}>
            <Image
              style={{ width: 70, height: 70 }}
              source={  service.image }
            />
            <Text style={{textAlign:"center", marginTop:8}}>{service.name}</Text>            
          </Pressable>          
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
