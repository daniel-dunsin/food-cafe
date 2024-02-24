import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { getMealsByCategory } from "../../services";
import Masonry from "@react-native-seoul/masonry-list";
import { Meal } from "../../types";
import SingleMeal from "../ui/meal";

const Meals = () => {
  const category = useSelector((state: RootState) => state.category?.activeCategory);
  const meals = useSelector((state: RootState) => state.meal?.meals);
  const loading = useSelector((state: RootState) => state.meal?.handlers?.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealsByCategory(category?.strCategory));
  }, [category]);

  return (
    <View className="mt-4">
      <Text className="font-semibold" style={{ fontSize: hp(2) }}>
        {meals?.length || 0} meals
      </Text>

      <View className="mt-4">
        {loading ? (
          <ActivityIndicator size={"large"} color={"#f64e32"} />
        ) : (
          <>
            <Masonry
              data={meals}
              renderItem={({ item, i }) => <SingleMeal {...(item as Meal)} index={i} />}
              keyExtractor={(item: Meal) => item.idMeal}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Meals;
