import { StyleSheet, Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import React from "react";

const  ImageSlider = () => {
  const images = [
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-and-minimalist-laundry-services-poster-design-template-3e810ec960d185552089f377e564586e_screen.jpg?ts=1687069953",
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://miro.medium.com/v2/resize:fit:600/1*PZEFyNdH-6ky3PSlEIG4LA.jpeg",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoplay
        circleloop
        dotColor={"#13274F"}
        inactiveDotColor={"#90A4AE"}
        imageComponentStyle={{
          borderRadius: 6,
          width: "95%",
        }}
      />
    </View>
  );
}
export default ImageSlider;
const styles = StyleSheet.create({});
