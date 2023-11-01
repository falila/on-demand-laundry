import { StyleSheet, Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import React from "react";
const mainPlan =  require("../assets/plan-icon.png");
const faltShop =  require("../assets/flat-shop-image.jpeg");
const carossol1 =  require("../assets/carossol1.jpeg");
const flyer =  require("../assets/flyer-page.jpeg");

const  ImageSlider = () => {
  const images = [
    flyer,
    carossol1,
    faltShop,
    mainPlan
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
