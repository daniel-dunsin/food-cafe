import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "../hooks/useNavigation";

const Welcome = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();

  return (
    <View className="bg-primary flex-1 h-screen justify-center items-center">
      <LottieView
        source={require("../assets/animation/animation.json")}
        style={{ width: 300, height: 300 }}
        autoPlay
        loop
      />
      <Text className="text-white font-bold" style={{ fontSize: hp(5) }}>
        Food Cafe
      </Text>
      <Text className="text-white font-semibold" style={{ fontSize: hp(2.5) }}>
        Explore Some Delicious Food
      </Text>

      <Pressable
        className="py-4 px-3 mt-8 bg-white rounded-md cursor-pointer"
        style={{ minWidth: hp(25) }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text
          className="text-primary text-center font-bold"
          style={{ fontSize: hp(2.2) }}
        >
          Go Home
        </Text>
      </Pressable>
    </View>
  );
};

export default Welcome;
