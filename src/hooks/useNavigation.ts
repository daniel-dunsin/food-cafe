import { NavigationProp, useNavigation as useNavigator } from "@react-navigation/native";
import { RootStackParams } from "../types";

export const useNavigation = <T extends RootStackParams = RootStackParams>() => useNavigator<NavigationProp<T>>();
