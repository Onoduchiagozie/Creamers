import React, { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../Services/Context/UserContext";
import useLocation from "../../../Location";

export default function HomeHeader() {
    const navigation = useNavigation();
    const { myCurrentUserObject,cartItems } = useContext(UserContext);
const {address,loadingLocation}=useLocation();
    return (
        <View style={{ paddingHorizontal: 10, paddingTop: 30 }}>
            {/* Location & Notification Row */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 15,
                }}
            >
                {/* Location */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="location" size={20} color="#FF6B35" />
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: "300",
                            marginLeft: 5,
                            color: "#333",
                        }}
                    >
                        <Text style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
                            {loadingLocation ? "Loading location..." : address}
                        </Text>
                     </Text>

                </View>

                {/* Notification Bell */}
                <TouchableOpacity
                    style={{
                        backgroundColor: "#FFF",
                        padding: 8,
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                    onPress={()=>{
                        navigation.navigate("Notification");
                    }}
                >
                    <Ionicons name="notifications-outline" size={24} color="#FF6B35" />
                    {/* Optional notification badge */}

                </TouchableOpacity>
            </View>

            {/* Search Bar & Cart Row */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                {/* Search Bar */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        backgroundColor: "#F5F5F5",
                        borderRadius: 25,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        alignItems: "center",
                        marginRight: 10,

                    }}
                >
                    <Ionicons name="search" size={20} color="#999" />
                    <TextInput
                        placeholder="Search "
                        placeholderTextColor="#999"
                        style={{
                            flex: 1,
                            fontSize: 15,
                            marginLeft: 10,
                            color: "#333",
                        }}
                    />

                </View>

                {/* Cart Button */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("Cart")}
                    style={{
                        backgroundColor: "#FFF",
                        padding: 12,
                        borderRadius: 15,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >
                    <Ionicons name="cart-outline" size={24} color="#FF6B35" />
                    {/* Optional cart badge */}
                    <View
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "#FF6B35",
                            borderRadius: 8,
                            minWidth: 16,
                            height: 16,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "#FFF", fontSize: 10, fontWeight: "bold" }}>
                            {cartItems.length}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}