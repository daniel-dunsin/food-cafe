import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Meal, RootStackParams } from "../../types";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "../../hooks/useNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { FadeIn, BounceInDown } from "react-native-reanimated";

interface Props extends Meal {
  index: number;
}

const SingleMeal = (props: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("SingleMeal", { ...props });
      }}
      style={{ height: props.index % 3 === 0 ? hp(25) : hp(35), marginRight: props.index % 2 === 0 ? 10 : 0, marginBottom: 20 }}
      className="rounded-xl relative overflow-hidden"
    >
      <Animated.View
        entering={BounceInDown.damping(10)
          .springify()
          .delay(props.index * 100 + 100)}
        className="w-full h-full"
      >
        <View className="h-full w-full">
          <Image source={{ uri: props.strMealThumb }} className="w-full h-full rounded-xl" resizeMode="cover" />
        </View>

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 0.5, y: 1 }}
          className="pl-3 absolute top-0 left-0 h-full w-full z-[5] justify-end pb-4"
          style={{ paddingRight: wp(5) }}
        >
          <Text className="text-white font-bold" style={{ fontSize: hp(2.4) }}>
            {props?.strMeal?.length > 20 ? `${props?.strMeal.slice(0, 20)}...` : props?.strMeal}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

export default SingleMeal;
