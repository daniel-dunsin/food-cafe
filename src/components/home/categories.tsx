import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { getCategories } from "../../services";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { selectActiveCategory } from "../../store/category.store";

const Categories = () => {
  const { categories, activeCategory } = useSelector((state: RootState) => state.category);
  const loading = useSelector((state: RootState) => state.category?.handlers?.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginTop: 20 }}
      className="gap-4 pb-2"
    >
      {categories?.map((category) => {
        const isActive = activeCategory?.idCategory === category?.idCategory;

        return (
          <View key={category?.idCategory} className="">
            <TouchableOpacity
              activeOpacity={0.6}
              className={`${
                isActive ? "bg-primary" : "bg-black/10"
              } p-2 rounded-xl w-[60px] h-[60px] items-center justify-center`}
              onPress={() => {
                dispatch(selectActiveCategory(category));
              }}
            >
              <Image source={{ uri: category?.strCategoryThumb }} className="w-[45px] h-[45px] rounded-full" />
            </TouchableOpacity>
            <Text className="mt-1 text-center font-[500]" style={{ fontSize: hp(1.7) }}>
              {category?.strCategory}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Categories;
