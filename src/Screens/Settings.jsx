// SettingsScreen.js
import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Button} from "react-native-paper";



export default function SettingsScreen() {
    const navigation = useNavigation();
    function AddProduct() {
        navigation.navigate("AddProduct")
    }
    return (
        <ScrollView style={{ flex: 1,                    marginBottom: 20,

        }}>

            <TouchableOpacity style={{ flexDirection:"column",marginLeft:20,justifyContent:"flex-start" }}
                              onPress={()=>navigation.goBack()}>
                <Text style={{ color: "#492700", fontSize: 22 }}>⇦</Text>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "700",
                        paddingHorizontal: 10,
                        marginVertical: 20,
                        padding: 15
                    }}
                >
                    Settings
                </Text>
            </TouchableOpacity>


            {/* Settings block */}
            <View
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    marginHorizontal: 20,
                    marginBottom: 50,
                    overflow: "hidden"
                }}
            >
                         <View>
                             <TouchableOpacity
                                 onPress={AddProduct}
                                 style={{
                                 paddingVertical: 18,
                                 paddingHorizontal: 15,
                                 borderBottomWidth: 0.2,
                                 flexDirection: "row",
                                 justifyContent: "space-between",
                                 alignItems: "center",
                                 // backgroundColor: "#9c9191",
                             }}>
                                 <Text style={{ fontSize: 16 }}>Add Product</Text>
                                 <Text style={{ fontSize: 18 }}>›</Text>
                             </TouchableOpacity>

                        </View>
                <View
                    style={{
                        paddingVertical: 18,
                        paddingHorizontal: 15,
                        borderBottomWidth: 0.2,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Text onPress={AddProduct} style={{ fontSize: 16 }}>View Inventory</Text>
                    <Text style={{ fontSize: 18 }}>›</Text>
                </View>



             </View>

            {/* Premium Status */}
            <View
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    marginHorizontal: 20,
                    padding: 18,
                    marginBottom: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Text style={{ fontSize: 16, color: "#444" }}>Premium Status</Text>
                <Text style={{ fontSize: 16, color: "#ff8c42" }}>Inactive</Text>
             </View>

            {/* Refer a friend */}
            <View
                style={{
                    backgroundColor: "#ff8c42",
                    borderRadius: 15,
                    marginHorizontal: 20,
                    padding: 20,
                    marginBottom: 20
                }}
            >
                <Text style={{ fontSize: 17, color: "#fff", fontWeight: "600" }}>
                    Refer a friend
                </Text>
                <Text style={{ fontSize: 14, color: "#ffe", marginTop: 5 }}>
                    50/referral
                </Text>

                <Image
                    source={{
                        uri: "https://i.imgur.com/1X9aZQp.png"
                    }}
                    style={{
                        width: "100%",
                        height: 120,
                        marginTop: 10,
                        resizeMode: "contain"
                    }}
                />
            </View>

            {/* App Icon + Widget */}
            <View
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    marginHorizontal: 20,
                    marginBottom: 40,
                    overflow: "hidden"
                }}
            >
                {["App Icon", "Widget"].map((label, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={{
                            paddingVertical: 18,
                            paddingHorizontal: 15,
                            borderBottomWidth: idx === 1 ? 0 : 1,
                            borderColor: "#eee",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>{label}</Text>
                        <Text style={{ fontSize: 18 }}>›</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}
