import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ImageBackground} from "expo-image";

function FoodDetailsScreen({ route }) {
    const [spice, setSpice] = useState("Mild");
    const [qty, setQty] = useState(1);
     // Missing states & sample data (added)
    const [selectedSize, setSelectedSize] = useState("Small");
    const navigation=useNavigation();
    const [toppings, setToppings] = useState([]);
     const {meal}=  route.params

    console.log("food details page",meal)

    const sizeOptions = [
        { label: "Small", price: "$5" },
        { label: "Medium", price: "$7" },
        { label: "Large", price: "$10" }
    ];

    const toppingOptions = [
        { label: "Extra Cheese", price: "$1" },
        { label: "Bacon", price: "$2" },
        { label: "Mushrooms", price: "$1" }
    ];

    const toggleTopping = (label) => {
        setToppings(prev =>
            prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingBottom: 140 }}>

                {/* HEADER */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons onPress={navigation.goBack} name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "red" }}>Menu Item</Text>
                    <TouchableOpacity >
                        <Feather name="heart" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* IMAGE */}
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <View style={{ borderRadius: 20, overflow: "hidden", height: 250}}>
                        <ImageBackground
                            source={{ uri: meal.imageUrl }}
                            style={{ width: "100%", height: "100%",resizeMode: "cover" ,borderWidth:5,overflow:'hidden'}}
                        />

                        {/* Rating Badge */}
                        <View
                            style={{
                                position: "absolute",
                                top: 15,
                                left: 15,
                                backgroundColor: "#fff",
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 8,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Ionicons name="star" size={14} color="#FF914D" />
                            <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 4 }}>{meal.rating}</Text>
                        </View>

                        {/* Out of Stock Label */}
                        <View
                            style={{
                                position: "absolute",
                                top: 15,
                                right: 15,
                                backgroundColor: "#FF4D4D",
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}>Out of Stock</Text>
                        </View>
                    </View>
                </View>

                {/* DESCRIPTION SECTION */}
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{meal.name}</Text>

                    <Text style={{ marginTop: 10, color: "#888", lineHeight: 20 }}>
                        {meal.description}
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>{meal.cost} Naira</Text>
                        {/*<Text style={{ fontSize: 16, color: "#ccc", textDecorationLine: "line-through", marginLeft: 10 }}>$11.00</Text>*/}
                    </View>

                    {/* SPICE LEVEL */}
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 25, marginBottom: 15 }}>
                        Spice Level
                    </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {/*flavour of product*/}
                        {["Mild", "Medium", "Spicy"].map((level) => (
                            <TouchableOpacity
                                key={level}
                                onPress={() => setSpice(level)}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: spice === level ? "#FFF6E0" : "#fff",
                                    borderColor: spice === level ? "#FF914D" : "#eee",
                                    borderWidth: 1,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 10,
                                }}
                            >
                                <Image
                                    source={{
                                        uri: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
                                    }}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        tintColor: "#FF914D",
                                        marginRight: 5,
                                    }}
                                />
                                <Text style={{ fontWeight: spice === level ? "bold" : "400" }}>
                                    {level}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* SIZE OPTIONS */}
                    <View style={{ marginTop: 25 }}>
                        {sizeOptions.map((s, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedSize(s.label)}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingVertical: 12,
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: "#555",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: 12,
                                        }}
                                    >
                                        {selectedSize === s.label && (
                                            <View
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: "#000",
                                                }}
                                            />
                                        )}
                                    </View>
                                    <Text>{s.label} (1–2 persons)</Text>
                                </View>

                                <Text>{s.price}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* TOPPINGS */}
                    <Text style={{ marginTop: 25, fontWeight: "600" }}>Topping</Text>
                    <Text style={{ color: "#777", fontSize: 12, marginBottom: 10 }}>
                        Add your favorite topping flavour or mode
                    </Text>

                    {toppingOptions.map((t, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => toggleTopping(t.label)}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingVertical: 12,
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderWidth: 2,
                                        borderColor: "#555",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: 12,
                                    }}
                                >
                                    {toppings.includes(t.label) && (
                                        <View
                                            style={{
                                                width: 14,
                                                height: 14,
                                                backgroundColor: "#000",
                                            }}
                                        />
                                    )}
                                </View>

                                <Text>{t.label}</Text>
                            </View>

                            <Text>{t.price}</Text>
                        </TouchableOpacity>
                    ))}

                    <Text style={{ marginTop: 15, color: "#999", fontSize: 12 }}>
                        Minimum Delivery €{meal.price -20}
                    </Text>
                </View>
            </ScrollView>

            {/* FOOTER */}
            <View
                style={{
                    position: "absolute",
                    bottom: 70,
                    width: "100%",
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                {/* QTY */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        borderRadius: 10,
                        padding: 5,
                    }}
                >
                    <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
                        <Text style={{ padding: 10, fontSize: 18, color: "#FF914D" }}>-</Text>
                    </TouchableOpacity>

                    <Text style={{ paddingHorizontal: 10, fontWeight: "bold" }}>{qty}</Text>

                    <TouchableOpacity onPress={() => setQty(qty + 1)}>
                        <Text style={{ padding: 10, fontSize: 18, color: "#FF914D" }}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* ADD CART BUTTON */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("Transaction")}
                    style={{
                        flex: 1,
                        backgroundColor: "#FF914D",
                        paddingVertical: 15,
                        borderRadius: 15,
                        alignItems: "center",
                        marginLeft: 20,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                        Add to Order - $11.00
                    </Text>
                    {/*<TouchableOpacity*/}
                    {/*    onPress={navigation.navigate('Checkout', { meals} )}*/}
                    {/*>*/}
                    {/*    <Text>*/}
                    {/*        cart*/}
                    {/*    </Text>*/}
                    {/*</TouchableOpacity>*/}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FoodDetailsScreen;

// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import {LinearGradient} from "expo-linear-gradient";
//
// export default function FoodDetailsScreen() {
//     const [selectedSize, setSelectedSize] = useState("Medium");
//     const [toppings, setToppings] = useState([]);
//
//     const sizeOptions = [
//         { label: "Small", price: "+1.5" },
//         { label: "Medium", price: "+1.5" },
//         { label: "King Size", price: "+0.75" },
//         { label: "Super King Size", price: "+0.75" },
//     ];
//
//     const toppingOptions = [
//         { label: "Beef Sausage", price: "+1.5" },
//         { label: "Sweet Corn", price: "+1.5" },
//     ];
//
//     const toggleTopping = (t) => {
//         if (toppings.includes(t)) {
//             setToppings(toppings.filter((item) => item !== t));
//         } else {
//             setToppings([...toppings, t]);
//         }
//     };
//
//     return (
//         <View style={{ flex: 1, backgroundColor: "transparent" }}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {/* Header Image */}
//                 <View style={{ position: "relative" }}>
//                     <Image
//                         source={require("../../assets/224.jpg")} // replace with your local or remote image
//                         style={{ width: "100%", height: 250 }}
//                         resizeMode="contain"
//                     />
//
//                     {/* Back Button */}
//                     <TouchableOpacity
//                         style={{
//                             position: "absolute",
//                             top: 45,
//                             left: 20,
//                             backgroundColor: "rgba(255,255,255,0.9)",
//                             width: 40,
//                             height: 40,
//                             borderRadius: 20,
//                             alignItems: "center",
//                             justifyContent: "center",
//                         }}
//                     >
//                         <Ionicons name="arrow-back" size={22} color="#000" />
//                     </TouchableOpacity>
//                 </View>
//                 <LinearGradient
//                     // colors={['#d7d2cc', '#04121e']}
//                     // colors={['#d7d2cc', 'rgba(5,0,0,0.91)']}
//                     colors={['#d7d2cc', 'rgba(99,32,32,0.96)']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                     style={{ flex: 1,       borderTopRightRadius:50,
//                         borderTopLeftRadius:50,
//                         borderStyle:"dotted"}}
//                 >
//                     <View style={{ padding: 20,
//                         paddingVertical:20,
//                         marginTop:10,
//                         borderBottomLeftRadius:30
//
//
//                     }}>
//
//                         {/* Title + Price */}
//                         <View
//                             style={{
//                                 flexDirection: "row",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Text style={{ fontSize: 20, fontWeight: "700" }}>
//                                 Traditional Chinese Fried Rice with Cajun
//                             </Text>
//                             <Text style={{ fontSize: 18, fontWeight: "600" }}>€12</Text>
//                         </View>
//
//                         {/* Calories */}
//                         <Text style={{ color: "#777", marginTop: 6 }}>204 Kcal</Text>
//
//                         {/* Description */}
//                         <Text style={{ color: "#555", marginTop: 10, lineHeight: 20 }}>
//                             Prepared with a generous amount of savory meat and expertly crafted
//                             by a former Michelin-starred chef, this is the finest fried rice
//                             you'll find in the city.
//                         </Text>
//
//                         {/* Reviews */}
//                         <View
//                             style={{
//                                 flexDirection: "row",
//                                 alignItems: "center",
//                                 marginTop: 14,
//                             }}
//                         >
//                             <Ionicons name="star" size={18} color="#f9a825" />
//                             <Text style={{ marginLeft: 8, fontWeight: "500" }}>
//                                 240 Reviews →
//                             </Text>
//                         </View>
//
//                         {/* Size */}
//                         <Text style={{ marginTop: 25, fontWeight: "600" }}>Size</Text>
//                         <Text style={{ color: "#777", fontSize: 12, marginBottom: 10 }}>
//                             The larger, the more toppings.
//                         </Text>
//
//                         {sizeOptions.map((s, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 onPress={() => setSelectedSize(s.label)}
//                                 style={{
//                                     flexDirection: "row",
//                                     justifyContent: "space-between",
//                                     alignItems: "center",
//                                     paddingVertical: 12,
//                                 }}
//                             >
//                                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                                     <View
//                                         style={{
//                                             width: 20,
//                                             height: 20,
//                                             borderRadius: 10,
//                                             borderWidth: 2,
//                                             borderColor: "#555",
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                             marginRight: 12,
//                                         }}
//                                     >
//                                         {selectedSize === s.label && (
//                                             <View
//                                                 style={{
//                                                     width: 10,
//                                                     height: 10,
//                                                     borderRadius: 5,
//                                                     backgroundColor: "#000",
//                                                 }}
//                                             />
//                                         )}
//                                     </View>
//                                     <Text>{s.label} (1–2 persons)</Text>
//                                 </View>
//
//                                 <Text>{s.price}</Text>
//                             </TouchableOpacity>
//                         ))}
//
//                         {/* Toppings */}
//                         <Text style={{ marginTop: 25, fontWeight: "600" }}>Topping</Text>
//                         <Text style={{ color: "#777", fontSize: 12, marginBottom: 10 }}>
//                             Add your favorite topping
//                         </Text>
//
//                         {toppingOptions.map((t, i) => (
//                             <TouchableOpacity
//                                 key={i}
//                                 onPress={() => toggleTopping(t.label)}
//                                 style={{
//                                     flexDirection: "row",
//                                     justifyContent: "space-between",
//                                     alignItems: "center",
//                                     paddingVertical: 12,
//                                 }}
//                             >
//                                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                                     <View
//                                         style={{
//                                             width: 20,
//                                             height: 20,
//                                             borderWidth: 2,
//                                             borderColor: "#555",
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                             marginRight: 12,
//                                         }}
//                                     >
//                                         {toppings.includes(t.label) && (
//                                             <View
//                                                 style={{
//                                                     width: 14,
//                                                     height: 14,
//                                                     backgroundColor: "#000",
//                                                 }}
//                                             />
//                                         )}
//                                     </View>
//
//                                     <Text>{t.label}</Text>
//                                 </View>
//
//                                 <Text>{t.price}</Text>
//                             </TouchableOpacity>
//                         ))}
//
//                         <Text style={{ marginTop: 15, color: "#999", fontSize: 12 }}>
//                             Minimum Delivery €20
//                         </Text>
//                     </View>
//                     <TouchableOpacity style={{
//                         marginBottom:60,
//                         marginHorizontal:20,
//                         backgroundColor: "#ff8c32",
//                         paddingVertical: 15,
//                         borderRadius: 80,
//                         borderWidth: 2,
//                         elevation:10,
//                         borderColor: "#ca9e6b",
//
//                         alignItems: "center",}}>
//                         <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
//                             Add to Basket – €12
//                         </Text>
//                     </TouchableOpacity>
//                 </LinearGradient>
//             </ScrollView>
//
//             {/* Sticky Bottom Add to Cart */}
//             <View style={{
//
//             }}>
//
//             </View>
//         </View>
//     );
// }
//
//

//
// export default FoodDetailsScreen;
