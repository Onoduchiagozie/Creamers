import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

function MenuScreen() {
    const [activeTab, setActiveTab] = useState("Meals");

    const menuData = {
        Meals: [
            { id: 1, title: "Spicy Noodles", price: "₦1,500", img: "https://i.ibb.co/YT0gnsc/noodles.png" },
            { id: 2, title: "Shrimp Pasta", price: "₦1,800", img: "https://i.ibb.co/bsQbpVh/pasta.png" },
            { id: 3, title: "Vegetable Curry", price: "₦1,200", img: "https://i.ibb.co/y8y3bNC/curry.png" },
            { id: 4, title: "Mixed Salad", price: "₦1,500", img: "https://i.ibb.co/PzCq7H1/salad.png" },
            { id: 5, title: "Chicken Pasta Salad", price: "₦1,500", img: "https://i.ibb.co/4S0V2bJ/chicken-salad.png" },
            { id: 6, title: "Beef Salad", price: "₦1,200", img: "https://i.ibb.co/JxJjxqX/beef-salad.png" },
        ],
        Sides: [],
        Snacks: [],
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>

            {/* HEADER */}
            <View style={{
                paddingTop: 50,
                paddingBottom: 15,
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
            }}>
                <TouchableOpacity style={{ position: "absolute", left: 20 }}>
                    <Text style={{ fontSize: 22 }}>←</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 20, fontWeight: "700" }}>Our Menu</Text>

                <TouchableOpacity style={{ position: "absolute", right: 20 }}>
                    <Text style={{ fontSize: 22 }}>🛒</Text>
                </TouchableOpacity>
            </View>

            {/* CATEGORY TABS */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: "#fff",
                paddingVertical: 12,
                elevation: 3
            }}>
                {["Meals", "Sides", "Snacks"].map(tab => (
                    <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={{ alignItems: "center" }}>
                        <Text style={{
                            fontSize: 16,
                            color: activeTab === tab ? "#e67e22" : "#555",
                            fontWeight: activeTab === tab ? "700" : "500",
                            borderBottomWidth: activeTab === tab ? 3 : 0,
                            borderColor: "#e67e22",
                            paddingBottom: 5
                        }}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* PRODUCT GRID */}
            <ScrollView style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between"
                }}>
                    {menuData[activeTab].map(item => (
                        <View key={item.id} style={{
                            width: "48%",
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            padding: 10,
                            marginBottom: 15,
                            elevation: 3
                        }}>
                            {/* Favorite */}
                            <TouchableOpacity style={{ position: "absolute", right: 10, top: 10 }}>
                                <Text style={{ fontSize: 20, color: "#e67e22" }}>♡</Text>
                            </TouchableOpacity>

                            {/* Image */}
                            <Image
                                source={{ uri: item.img }}
                                style={{
                                    width: "100%",
                                    height: 120,
                                    borderRadius: 10,
                                    marginBottom: 10
                                }}
                                resizeMode="cover"
                            />

                            {/* Name */}
                            <Text style={{ fontWeight: "700", fontSize: 14 }}>{item.title}</Text>
                            {/* Price */}
                            <Text style={{
                                marginTop: 5,
                                fontSize: 15,
                                fontWeight: "700",
                                color: "#333"
                            }}>
                                {item.price}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* BOTTOM NAV */}
            <View style={{
                height: 65,
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                borderTopWidth: 1,
                borderColor: "#ddd"
            }}>
                {["Live Chat", "Profile", "Home", "Menu", "Favorites"].map((nav, i) => (
                    <TouchableOpacity key={i} style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 22 }}>⬤</Text>
                        <Text style={{ marginTop: 3, fontSize: 12 }}>{nav}</Text>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    );
}
export  default MenuScreen