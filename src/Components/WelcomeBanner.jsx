import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WelcomeBanner = () => {
    const foodItems = [
        { name: "Nuts", icon: "peanut" },
        { name: "Pastries", icon: "cupcake" },
        { name: "Drinks", icon: "coffee" },
        { name: "Smoothies", icon: "cup-water" },
        { name: "Cake", icon: "cake" },
        { name: "Burger", icon: "hamburger" },
        { name: "Pizza", icon: "pizza" },
        { name: "Fruit", icon: "fruit-cherries" },
    ];

    return (
        <View
            style={{
                paddingTop: 20,
                paddingHorizontal: 20,
                marginTop: 10,
                flexDirection: 'column',
            }}
        >
             <View
                style={{
                    width: "100%",
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: "space-between",
                }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                         color: "red",
                        maxWidth: "95%",
                        textAlign: "left",
                    }}
                >
                    Welcome
                </Text>
                <EvilIcons name="bell" size={25} color="red" />
            </View>

             <TextInput
                placeholder="Search Workout by target muscles"
                style={{
                    height: 50,
                    borderWidth: 4,
                    borderRadius: 15,
                    paddingHorizontal: 10,
                    backgroundColor: "transparent",
                    borderBottomWidth: 7,
                    marginBottom: 20,
                }}
            />

             <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {foodItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: "25%",
                            alignItems: "center",
                            marginVertical: 12,
                        }}
                    >
                        <MaterialCommunityIcons
                            name={item.icon}
                            size={36}
                            color="#ff6f61"
                        />
                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 12,
                                fontWeight: "600",
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default WelcomeBanner;
