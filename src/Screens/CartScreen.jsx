import React, {useContext, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import {UserContext} from "../UserContext";

export default function CartScreen({}) {
  //  const {payload}=route.params;
    const { cartItems, updateQty, deleteItem } = useContext(UserContext);

console.log("cart screen ", cartItems);
    const renderDeleteAction = (item) => (
        <View
            style={{
                backgroundColor: "#FF5A5F",
                justifyContent: "center",
                alignItems: "center",
                width: 80,
                height: "100%",
                borderRadius: 12,
            }}
        >
            <Ionicons name="trash-outline" size={30} color="#fff" />
        </View>
    );

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const discount = 25;
    const total = subtotal - discount;

    return (
        <View style={{ flex: 1, backgroundColor: "#F9F9F9", padding: 16 }}>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text
                    style={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                    }}
                >
                    My Cart
                </Text>
                <Ionicons name="cart-outline" size={28} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {cartItems.map((item) => (
                    <Swipeable
                        key={item.productId}
                        renderRightActions={() => (
                            <TouchableOpacity
                                onPress={() => deleteItem(item.productId)}
                                activeOpacity={0.9}
                            >
                                {renderDeleteAction(item)}
                            </TouchableOpacity>
                        )}
                    >
                        <View
                            style={{
                                backgroundColor: "#fff",
                                flexDirection: "row",
                                padding: 12,
                                marginBottom: 14,
                                borderRadius: 12,
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 10,
                                    marginRight: 14,
                                }}
                            />

                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>
                                    {item.name}
                                </Text>
                                <Text style={{ color: "#666" }}>Size: {item.totalPrice}</Text>
                                <Text style={{ fontWeight: "600", marginTop: 4 }}>
                                    ${item.totalPrice}
                                </Text>
                            </View>

                            {/* Quantity Controls */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: "#F1F2F6",
                                    paddingHorizontal: 8,
                                    paddingVertical: 4,
                                    borderRadius: 50,
                                }}
                            >
                                <TouchableOpacity onPress={() => updateQty(item.uid, -1)}>
                                    <Ionicons name="remove-circle-outline" size={24} />
                                </TouchableOpacity>

                                <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
                                    {item.qty}
                                </Text>

                                <TouchableOpacity onPress={() => updateQty(item.uid, +1)}>
                                    <Ionicons name="add-circle-outline" size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Swipeable>
                ))}

                {/* Summary */}
                <View
                    style={{
                        marginTop: 20,
                        padding: 16,
                        borderRadius: 12,
                        backgroundColor: "#fff",
                    }}
                >
                    <Text style={{ marginBottom: 10 }}>Enter Discount Code</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            marginBottom: 20,
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: "#ddd",
                                padding: 10,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: "#aaa" }}>DISCOUNT2025</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor: "#FF914D",
                                marginLeft: 10,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: "#fff" }}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 8,
                        }}
                    >
                        <Text>Sub total:</Text>
                        <Text>${subtotal}</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 8,
                        }}
                    >
                        <Text>Discount:</Text>
                        <Text>${discount}</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ fontWeight: "700" }}>Total:</Text>
                        <Text style={{ fontWeight: "700" }}>${total}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#FF914D",
                        padding: 18,
                        borderRadius: 12,
                        marginTop: 20,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
                        Checkout
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
