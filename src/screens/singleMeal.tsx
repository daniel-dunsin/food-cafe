import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Meal, RootStackParams } from "../types";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { Image } from "react-native";
import { useNavigation } from "../hooks/useNavigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { getMealById } from "../services";
import Animated, { FadeIn, FadeInDown, BounceInDown } from "react-native-reanimated";

const SingleMeal = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { params } = useRoute<RouteProp<RootStackParams>>();
  const navigation = useNavigation();
  const meal = useSelector((state: RootState) => state.meal.singleMeal);
  const loading = useSelector((state: RootState) => state.meal.handlers.isLoading);
  const dispatch = useDispatch();

  const toggleFav = () => setIsFavourite((prev) => !prev);

  const getIngredientsIndexes = useCallback((): number[] => {
    const indexes = [];

    for (let i = 1; i <= 20; i++) {
      if (meal?.[`strIngredient${i}` as keyof Meal]) {
        indexes.push(i);
      }
    }
    return indexes;
  }, [meal]);

  useEffect(() => {
    if (params?.idMeal) {
      dispatch(getMealById(params.idMeal));
    }
  }, [params?.idMeal]);

  return (
    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
      <StatusBar style="auto" />

      {/* Header */}
      <View
        className="flex-row absolute top-0 left-0 z-[5] justify-between w-full"
        style={{ paddingLeft: wp(4), paddingRight: wp(4), paddingTop: hp(3) }}
      >
        <View className="bg-[#fbfbfb] rounded-full">
          <TouchableOpacity className="p-2" activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={wp(6)} strokeWidth={2} color={"#f64e32"} />
          </TouchableOpacity>
        </View>

        <View className="bg-[#fbfbfb] rounded-full">
          <TouchableOpacity className="p-2" activeOpacity={0.8} onPress={toggleFav}>
            <HeartIcon size={wp(6)} strokeWidth={2} color={isFavourite ? "#f64e32" : "#777"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Container */}
      <View className="" style={{ width: wp(100), height: hp(45) }}>
        <Image source={{ uri: params?.strMealThumb }} className="w-full h-full" resizeMode="cover" />
      </View>

      <Animated.View
        entering={FadeInDown.delay(100).springify().damping(10)}
        className="flex-1 bg-white"
        style={{
          width: wp(100),
          paddingLeft: wp(10),
          paddingRight: wp(10),
          paddingTop: hp(3),
          paddingBottom: hp(1),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          minHeight: hp(65),
          bottom: hp(4),
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#f64e32"} />
        ) : (
          <>
            <Animated.Text
              entering={FadeInDown.delay(200).damping(12).springify()}
              className="font-bold tracking-widest"
              style={{ fontSize: hp(3.2) }}
            >
              {meal?.strMeal}
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(300).springify().damping(12)}
              className="font-semibold text-[#222] mt-2"
              style={{ fontSize: hp(2.2) }}
            >
              {meal?.strArea}
            </Animated.Text>

            {/* Ingredients */}
            <View>
              <Text className="mt-6 font-bold tracking-widest mb-2" style={{ fontSize: hp(2.4) }}>
                Ingredients
              </Text>

              <View className="px-4">
                {getIngredientsIndexes().map((index) => {
                  const ingredient = `strIngredient${index}` as keyof Meal;
                  const measure = `strMeasure${index}` as keyof Meal;

                  return (
                    <Animated.View
                      entering={FadeInDown.damping(12).delay(index * 100 + 400)}
                      key={index}
                      className="mt-3 flex-row space-x-2 items-center"
                    >
                      <View className="w-[15px] h-[15px] rounded-full bg-primary" />
                      <Text className="font-neutral-800" style={{ fontSize: hp(2) }}>
                        {meal?.[ingredient]}
                      </Text>
                      <Text className="font-bold font-neutral-700" style={{ fontSize: hp(2) }}>
                        {meal?.[measure]}
                      </Text>
                    </Animated.View>
                  );
                })}
              </View>
            </View>

            {/* Instructions */}
            <View>
              <Text className="mt-6 font-bold tracking-widest mb-2" style={{ fontSize: hp(2.4) }}>
                Instructions
              </Text>

              <View className="mt-3">
                <Text>{meal?.strInstructions}</Text>
              </View>
            </View>
          </>
        )}
      </Animated.View>
    </ScrollView>
  );
};

export default SingleMeal;
