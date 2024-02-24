import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import HomeHeader from "../components/home/header";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/home/categories";
import Meals from "../components/home/meals";

const Home = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView>
        <StatusBar style="auto" />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: hp(8.5),
            paddingTop: hp(4.5),
            marginLeft: hp(3.5),
            marginRight: hp(3.5),
          }}
        >
          <HomeHeader />
          <Categories />
          <Meals />
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
