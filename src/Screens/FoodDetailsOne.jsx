// import {SafeAreaView, ScrollView, TouchableOpacity, View, Text, Image, Alert} from "react-native";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import {useEffect, useState} from "react";
// import {useNavigation, useRoute} from "@react-navigation/native";
// import {ImageBackground} from "expo-image";
// import api from "../api";
// import * as Haptics from "expo-haptics";
//
// function FoodDetailsScreen({ route }) {
//     const [spice, setSpice] = useState("Mild");
//     const [qty, setQty] = useState(1);
//      // Missing states & sample data (added)
//
//     const [liked, setLiked] = useState(false);
//      const [iconColor, setIconColor] = useState("orange");
//
//
//     const [selectedSize, setSelectedSize] = useState("Small");
//     const navigation=useNavigation();
//     const [toppings, setToppings] = useState([]);
//      const {meal}=  route.params
//
//     const SugarLevel = [
//         { label: "Okay", price: "5" },
//         { label: "Sweet", price: "7" },
//      ];
//
//     const toppingOptions = [
//         { label: "Peanut", price: "$1" },
//         { label: "Banana", price: "$2" },
//         { label: "Coconut", price: "$1" }
//     ];
//
//     const toggleTopping = (label) => {
//         setToppings(prev =>
//             prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
//         );
//     };
//
//    async  function Liked() {
//         try {
//              console.log("page object for meal object",meal)
//
//              const response = await api.post("/Product/Like", `${meal.id}`, {
//                 headers: { "Content-Type": "application/json" }
//             });
//             console.log("liked button ",response.data);
//             setLiked(response.data.liked);
//             await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
//
//
//         } catch (error) {
//             console.log("Error liking product:", error);
//          }
//     }
//     console.log("chosen food  for cusgtomization",meal.customizations)
//
//     useEffect(() => {
//         setIconColor(liked ? "red" : "orange");
//     }, [liked]);
//
//     return (
//         <View style={{ flex: 1, backgroundColor: "#fff" }}>
//             <ScrollView contentContainerStyle={{ paddingTop: 50, paddingBottom: 140 }}>
//
//                 {/* HEADER */}
//                 <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <Ionicons onPress={navigation.goBack} name="arrow-back" size={24} color="black" />
//                     </TouchableOpacity>
//                     <Text style={{ fontSize: 16, fontWeight: "600", color: "red" }}>Menu Items</Text>
//                     <TouchableOpacity onPress={Liked}>
//                          <Ionicons name="heart" size={24} color={iconColor} />
//                     </TouchableOpacity>
//                 </View>
//
//                 {/* IMAGE */}
//                 <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
//                     <View style={{ borderRadius: 20, overflow: "hidden", height: 250}}>
//                         <ImageBackground
//                             source={{ uri: meal.imageUrl }}
//                             style={{ width: "100%", height: "100%",resizeMode: "cover" ,borderWidth:5,overflow:'hidden'}}
//                         />
//
//                         {/* Rating Badge */}
//                         <View
//                             style={{
//                                 position: "absolute",
//                                 top: 15,
//                                 left: 15,
//                                 backgroundColor: "#fff",
//                                 paddingHorizontal: 8,
//                                 paddingVertical: 4,
//                                 borderRadius: 8,
//                                 flexDirection: "row",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Ionicons name="star" size={14} color="#FF914D" />
//                             <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 4 }}>{meal.rating}</Text>
//                         </View>
//
//                         {/* Out of Stock Label */}
//                         <View
//                             style={{
//                                 position: "absolute",
//                                 top: 15,
//                                 right: 15,
//                                 backgroundColor: "#FF4D4D",
//                                 paddingHorizontal: 10,
//                                 paddingVertical: 4,
//                                 borderRadius: 8,
//                             }}
//                         >
//                             <Text style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}>Out of Stock</Text>
//                         </View>
//                     </View>
//                 </View>
//
//                 {/* DESCRIPTION SECTION */}
//                 <View style={{ padding: 20 }}>
//                     <Text style={{ fontSize: 22, fontWeight: "bold" }}>{meal.name}</Text>
//
//                     <Text style={{ marginTop: 10, color: "#888", lineHeight: 20 }}>
//                         {meal.description}
//                     </Text>
//
//                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
//                         <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>{meal.cost} Naira</Text>
//                         {/*<Text style={{ fontSize: 16, color: "#ccc", textDecorationLine: "line-through", marginLeft: 10 }}>$11.00</Text>*/}
//                     </View>
//
//                     {/* SPICE LEVEL */}
//                     <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 25, marginBottom: 15 }}>
//                         Spice Level
//                     </Text>
//
//                     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                         {/*flavour of product*/}
//                         {["Mild", "Medium", "Spicy"].map((level) => (
//                             <TouchableOpacity
//                                 key={level}
//                                 onPress={() => setSpice(level)}
//                                 style={{
//                                     flexDirection: "row",
//                                     alignItems: "center",
//                                     backgroundColor: spice === level ? "#FFF6E0" : "#fff",
//                                     borderColor: spice === level ? "#FF914D" : "#eee",
//                                     borderWidth: 1,
//                                     paddingVertical: 10,
//                                     paddingHorizontal: 20,
//                                     borderRadius: 10,
//                                 }}
//                             >
//                                 <Image
//                                     source={{
//                                         uri: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
//                                     }}
//                                     style={{
//                                         width: 15,
//                                         height: 15,
//                                         tintColor: "#FF914D",
//                                         marginRight: 5,
//                                     }}
//                                 />
//                                 <Text style={{ fontWeight: spice === level ? "bold" : "400" }}>
//                                     {level}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                     <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 25, marginBottom: 15 }}>
//                        Sweat
//                     </Text>
//                     {/* SIZE OPTIONS */}
//                     <View style={{ marginTop: 10 }}>
//                         {SugarLevel.map((s, index) => (
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
//                                     <Text>{s.label}  </Text>
//                                 </View>
//
//                                 <Text>{s.price}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//
//                     {/* TOPPINGS */}
//                     <Text style={{ marginTop: 25, fontWeight: "600" }}>Topping or Inserts</Text>
//                     <Text style={{ color: "#777", fontSize: 12, marginBottom: 10 }}>
//                         Add your favorite topping flavour or mode
//                     </Text>
//
//                     {toppingOptions.map((t, i) => (
//                         <TouchableOpacity
//                             key={i}
//                             onPress={() => toggleTopping(t.label)}
//                             style={{
//                                 flexDirection: "row",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 paddingVertical: 12,
//                             }}
//                         >
//                             <View style={{ flexDirection: "row", alignItems: "center" }}>
//                                 <View
//                                     style={{
//                                         width: 20,
//                                         height: 20,
//                                         borderWidth: 2,
//                                         borderColor: "#555",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         marginRight: 12,
//                                     }}
//                                 >
//                                     {toppings.includes(t.label) && (
//                                         <View
//                                             style={{
//                                                 width: 14,
//                                                 height: 14,
//                                                 backgroundColor: "#000",
//                                             }}
//                                         />
//                                     )}
//                                 </View>
//
//                                 <Text>{t.label}</Text>
//                             </View>
//
//                             <Text>{t.price}</Text>
//                         </TouchableOpacity>
//                     ))}
//
//                     <Text style={{ marginTop: 15, color: "#999", fontSize: 12 }}>
//                         Minimum Delivery €{meal.price -20}
//                     </Text>
//                 </View>
//             </ScrollView>
//
//             {/* FOOTER */}
//             <View
//                 style={{
//                     position: "absolute",
//                     bottom: 70,
//                     width: "100%",
//                     paddingHorizontal: 20,
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                 }}
//             >
//                 {/* QTY */}
//                 <View
//                     style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         backgroundColor: "#f9f9f9",
//                         borderRadius: 10,
//                         padding: 5,
//                     }}
//                 >
//                     <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
//                         <Text style={{ padding: 10, fontSize: 18, color: "#FF914D" }}>-</Text>
//                     </TouchableOpacity>
//
//                     <Text style={{ paddingHorizontal: 10, fontWeight: "bold" }}>{qty}</Text>
//
//                     <TouchableOpacity onPress={() => setQty(qty + 1)}>
//                         <Text style={{ padding: 10, fontSize: 18, color: "#FF914D" }}>+</Text>
//                     </TouchableOpacity>
//                 </View>
//
//                 {/* ADD CART BUTTON */}
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate("Transaction")}
//                     style={{
//                         flex: 1,
//                         backgroundColor: "#FF914D",
//                         paddingVertical: 15,
//                         borderRadius: 15,
//                         alignItems: "center",
//                         marginLeft: 20,
//                     }}
//                 >
//                     <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
//                         Add to Order - ${meal.cost}.00
//                     </Text>
//                     {/*<TouchableOpacity*/}
//                     {/*    onPress={navigation.navigate('Checkout', { meals} )}*/}
//                     {/*>*/}
//                     {/*    <Text>*/}
//                     {/*        cart*/}
//                     {/*    </Text>*/}
//                     {/*</TouchableOpacity>*/}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }
//
// export default FoodDetailsScreen;



import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Image,
    Alert
} from "react-native";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageBackground } from "expo-image";
import api from "../api";
import * as Haptics from "expo-haptics";
import {UserContext} from "../UserContext";

function FoodDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const mealRaw = route.params?.meal ?? {};

    const { addToCart } = useContext(UserContext);

    // --- normalize backend shape so UI code is simple ---
    const meal = useMemo(() => {
        const basePrice = mealRaw.cost ?? mealRaw.Cost ?? mealRaw.basePrice ?? 0;
        const customizationsRaw = mealRaw.customizations ?? mealRaw.Customizations ?? [];
        const customizations = customizationsRaw.map(g => ({
            id: g.id ?? g.Id,
            name: g.name ?? g.Name,
            isRequired: g.isRequired ?? g.IsRequired ?? false,
            maxSelections: g.maxSelections ?? g.MaxSelections ?? 1,
            options: (g.options ?? g.Options ?? []).map(o => ({
                id: o.id ?? o.Id,
                name: o.name ?? o.Name,
                priceIncrement: Number(o.priceIncrement ?? o.PriceIncrement ?? o.price ?? 0)
            }))
        }));
        return {
            id: mealRaw.id ?? mealRaw.Id,
            name: mealRaw.name ?? mealRaw.Name,
            description: mealRaw.description ?? mealRaw.Description,
            imageUrl: mealRaw.imageUrl ?? mealRaw.ImageUrl,
            rating: mealRaw.rating ?? mealRaw.Rating ?? 0,
            basePrice,
            customizations
        };
    }, [mealRaw]);

    // local UI state
    const [liked, setLiked] = useState(false);
    const [iconColor, setIconColor] = useState("orange");
    const [qty, setQty] = useState(1);

    // selected: { [groupId]: [optionId, ...] }
    const [selected, setSelected] = useState({});

    // recalc total whenever selection / qty / basePrice changes
    const totalPrice = useMemo(() => {
        const optionsTotal = Object.keys(selected).reduce((sum, groupId) => {
            const ids = selected[groupId] || [];
            for (const id of ids) {
                // find the option price
                for (const g of meal.customizations) {
                    if ((String(g.id) === String(groupId))) {
                        const opt = g.options.find(o => String(o.id) === String(id));
                        if (opt) sum += Number(opt.priceIncrement*2 || 0);
                        break;
                    }
                }
            }
            return sum;
        }, 0);
        return (Number(meal.basePrice) || 0) * qty + optionsTotal * qty;
    }, [selected, qty, meal.basePrice, meal.customizations]);

    useEffect(() => {

        setIconColor(liked ? "red" : "green");
    }, [liked]);

    // --- Like API (keeps your existing behaviour) ---
    async function Liked() {
        try {
            if (!meal.id) return;
            const response = await api.post("/Product/Like", `${meal.id}`, {
                headers: { "Content-Type": "application/json" }
            });
            const likedNow = response.data?.liked ?? false;
            setLiked(likedNow);
            triggerHeartAnimation();   //


            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        } catch (error) {
            console.log("Error liking product:", error);
        }
    }

    const toggleOption = (groupId, maxSelections, optionId) => {
        setSelected(prev => {
            const current = prev[groupId] || [];

            // --- RADIO (maxSelections = 1) ---
            if (maxSelections === 1) {
                // If same option tapped → unselect
                if (current[0] === optionId) {
                    return { ...prev, [groupId]: [] };
                }
                // Replace with only this option
                return { ...prev, [groupId]: [optionId] };
            }

            // --- MULTI SELECT (maxSelections > 1) ---
            const exists = current.includes(optionId);

            if (exists) {
                return { ...prev, [groupId]: current.filter(id => id !== optionId) };
            }

            if (current.length >= maxSelections) {
                Alert.alert("Limit reached", `You can only pick ${maxSelections}.`);
                return prev;
            }

            return { ...prev, [groupId]: [...current, optionId] };
        });
    };


    // --- Selection handlers ---
    // const toggleOption = (groupId, groupMax, optionId) => {
    //     setSelected(prev => {
    //         const cur = prev[groupId] ? [...prev[groupId]] : [];
    //
    //         const exists = cur.some(id => String(id) === String(optionId));
    //         if (exists) {
    //             // remove
    //             return { ...prev, [groupId]: cur.filter(id => String(id) !== String(optionId)) };
    //         }
    //
    //         // add (respect max)
    //         if (cur.length >= groupMax) {
    //             Alert.alert("Selection limit", `You can select up to ${groupMax} option(s) for this group.`);
    //             return prev;
    //         }
    //
    //         return { ...prev, [groupId]: [...cur, optionId] };
    //     });
    // };

    // --- Add to Cart / Transaction ---
    const handleAddToOrder = () => {
        // validate required groups
        for (const g of meal.customizations) {
            if (g.isRequired) {
                const picks = selected[g.id] || [];
                if (!picks.length) {
                    Alert.alert("Required", `Please select at least one option for "${g.name}"`);
                    return;
                }
            }
        }

        const selectionsPayload = Object.keys(selected).map(groupId => {
            const group = meal.customizations.find(g => String(g.id) === String(groupId));
            const optionIds = selected[groupId] || [];
            const options = optionIds.map(id => {
                const opt = group.options.find(o => String(o.id) === String(id));
                return {
                    id: opt?.id,
                    name: opt?.name,
                    priceIncrement: opt?.priceIncrement
                };
            });
            return {
                groupId,
                groupName: group?.name,
                options
            };
        });

        const payload = {
            productId: meal.id,
            meal,
            qty,
            basePrice: meal.basePrice,
            totalPrice,
            selections: selectionsPayload
        };

        console.log("Add to order payload:", payload);

        const order = {
        productId: meal.id,
            name: meal.name,
            image: meal.imageUrl,
            qty,
            basePrice: meal.basePrice,
            totalPrice,
            selections: selectionsPayload
    };
try {
    addToCart(order);
    console.log("running block ",order);
}catch (e) {
    console.error(e);
}

        // navigate to Transaction and pass payload
        navigation.navigate("Cart", { order: payload });
    };
    const triggerHeartAnimation = () => {
        setPlayHeart(true);

        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.4,
                duration: 150,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => setPlayHeart(false));
    };


    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [playHeart, setPlayHeart] = useState(false);

    // If no customizations (safe fallback) show a message; otherwise render groups
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingBottom: 140 }}>
                {/* HEADER */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 16, fontWeight: "600", color: "red" }}>Menu Items</Text>

                         <TouchableOpacity onPress={Liked} style={{ width: 40, height: 40 }}>
                            {playHeart && (
                                <LottieView
                                     source={require("./../../assets/images/heart_burst_lottie.json")}
                                    autoPlay={false}
                                    loop={false}
                                    style={{
                                        width: 350,
                                        height: 350,
                                        position: "absolute",
                                        top: -80,
                                        alignSelf: "center"
                                    }}
                                />
                            )}

                            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                                <Ionicons
                                    name="heart"
                                    size={26}
                                    color={liked ? "red" : "orange"}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                 </View>

                {/* IMAGE */}
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <View style={{ borderRadius: 20, overflow: "hidden", height: 250 }}>
                        <ImageBackground
                            source={{ uri: meal.imageUrl }}
                            style={{ width: "100%", height: "100%", resizeMode: "cover", borderWidth: 0, overflow: 'hidden' }}
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
                        {/* keep it visible but you might want to only show when outOfStock flag exists */}
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
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>{meal.basePrice} Naira</Text>
                    </View>

                    {/* --- DYNAMIC CUSTOMIZATION GROUPS (replaces Spice / Sugar / Toppings) --- */}
                    <View style={{ marginTop: 20 }}>
                        {meal.customizations.length === 0 && (
                            <Text style={{ color: "#777", marginBottom: 8 }}>No customizations available for this product.</Text>
                        )}

                        {meal.customizations.map(group => (
                            <View key={group.id} style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                    {group.name} {group.isRequired ? "*" : ""}
                                </Text>
                                <Text style={{ color: "#777", marginBottom: 8 }}>
                                    {group.isRequired ? "Required • " : "Optional • "}Select up to {group.maxSelections}
                                </Text>

                                {group.options.map(opt => {
                                    // selected check
                                    const selectedList = selected[group.id] || [];
                                    const isSelected = selectedList.some(id => String(id) === String(opt.id));

                                    return (
                                        <TouchableOpacity
                                            key={opt.id}
                                            onPress={() => toggleOption(group.id, group.maxSelections, opt.id)}
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                paddingVertical: 12,
                                                borderBottomWidth: 0.5,
                                                borderColor: "#eee"
                                            }}
                                        >
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <View
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: group.maxSelections === 1 ? 10 : 4,
                                                        borderWidth: 2,
                                                        borderColor: isSelected ? "#FF914D" : "#ccc",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginRight: 12
                                                    }}
                                                >
                                                    {isSelected && <View style={{
                                                        width: group.maxSelections === 1 ? 10 : 14,
                                                        height: group.maxSelections === 1 ? 10 : 14,
                                                        borderRadius: group.maxSelections === 1 ? 5 : 2,
                                                        backgroundColor: "#FF914D"
                                                    }} />}
                                                </View>

                                                <Text>{opt.name}</Text>
                                            </View>

                                            <Text>+₦{opt.priceIncrement}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ))}
                    </View>

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
                    onPress={handleAddToOrder}
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
                        Add to Order - ₦{totalPrice}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default FoodDetailsScreen;
