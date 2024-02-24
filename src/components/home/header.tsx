import { View, Text, Image, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const HomeHeader = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"}>
      <View className="flex flex-row justify-between items-center">
        <AdjustmentsHorizontalIcon size={hp(3.5)} color={"black"} />
        <Image
          source={require("../../assets/images/olaolu.jpg")}
          className="rounded-full"
          style={{ width: hp(5), height: hp(5) }}
          resizeMode="cover"
        />
      </View>

      <View className="mt-4">
        <Text className="text-black" style={{ fontSize: hp(3.5), fontWeight: "500" }}>
          Fast & Delicious
        </Text>
        <Text style={{ fontSize: hp(3.5), fontWeight: "500" }}>
          Food You <Text className="text-primary font-bold">Love</Text>
        </Text>

        <View className="relative w-full mt-4 cursor-pointer flex items-center flex-row space-x-2 min-h-[40px] rounded-xl p-3 border-[1.5px]">
          <MagnifyingGlassIcon size={hp(3.2)} color={"black"} />
          <TextInput style={{ fontSize: hp(2.2) }} className="flex-1 w-full h-full" placeholder="Enter Food Name" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeHeader;
