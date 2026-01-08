import React, {useContext} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {UserContext} from "../Services/Context/UserContext";

const CATEGORIES = [
    { label: "Pizza", emoji: "🍕" },
    { label: "Burger", emoji: "🍔" },
    { label: "Chicken", emoji: "🍗" },
    { label: "Drink", emoji: "🥤" },
];

export default function HomeCategory({readyMeals}) {
    const navigation = useNavigation();
    const {setShared}=useContext(UserContext);
    let layoutRef = null;


    return (


        <View style={{ flex: 1, padding: 10, paddingTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 10 }}>
                Choose Category
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                {CATEGORIES.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onLayout={e => {
                            layoutRef = e.nativeEvent.layout;
                        }}
                        onPress={() => {

                            navigation.navigate("Menu", {
                                selectedIndex: index,
                                shared: {
                                    emoji: item.emoji,
                                    x: layoutRef.x,
                                    y: layoutRef.y,
                                },meal:readyMeals
                            });


                        }}

                        activeOpacity={0.8}

                        style={{ alignItems: "center" }}
                    >
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 15,
                                borderWidth: 2,
                                borderColor: "red",
                                backgroundColor: "transparent",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 6,
                            }}
                        >
                            <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
                        </View>

                        <Text style={{ fontSize: 12 }}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
