import React, {useState, useRef, useEffect, useContext} from "react";
import Modal from 'react-native-modal'
import {View, Text, TouchableOpacity, ScrollView, Animated, Dimensions, Alert, FlatList} from "react-native";
import SettingsScreen from "./Settings";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import api from "../api";
import {Image, ImageBackground} from 'expo-image';
import {BaseURL} from "../Constants";
import {UserContext} from "../UserContext";

const { height } = Dimensions.get('window');
// Configuration for the animation
const HEADER_MAX_HEIGHT = 280;
const HEADER_MIN_HEIGHT = 100;
const PROFILE_IMAGE_MAX_HEIGHT = 95;
const PROFILE_IMAGE_MIN_HEIGHT = 50;

export default function ProfileScreen() {
    const { myCurrentUserObject } = useContext(UserContext);


    const [activeTab, setActiveTab] = useState("home");
     const [open, setOpen] = useState(false);
     const [myProducts, setMyProducts] = useState([]);


    useEffect(() => {
        fetchMeals();
    }, []);

const gotodetail = (item) => {
    console.log("go to detail item",item);
  navigation.navigate("FoodDetail",{meal:item})
}
    const fetchMeals = async () => {
        try {

             const res = await api.get('/Product/GetAllSellerProducts');
            console.log("Profile Screen get farmer product load", res.data);
            setMyProducts(res.data);

        } catch (error) {
            console.log('Error fetching meals:', error.response?.data || error.message);
        }
    };


    // Animation value reference
    const scrollY = useRef(new Animated.Value(0)).current;

    // 1. Header Height Interpolation
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    });

    // 2. Profile Image Size Interpolation
    const profileImageHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
        extrapolate: 'clamp'
    });

    // 3. Profile Image Margin/Position Interpolation (to move it up slightly)
    const profileImageMarginTop = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [20, 5],
        extrapolate: 'clamp'
    });

    // 4. Opacity for items we want to hide when scrolling up (Location text, etc)
    const headerContentOpacity = scrollY.interpolate({
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });


    async function deleteProduct(id) {
        try {

            console.log('Deleting product with ID:', id);

            // Correct syntax: use parentheses, not backticks for function call
            const url = `${BaseURL}/Product/${id}`;
            console.log('DELETE URL:', url);
            console.log('Product ID:', id);

            const res = await api.delete(url, {
                headers: { "Content-Type": "application/json" },
            });

            Alert.alert("Success", res.data.message || "Product deleted successfully");

            // Optional: Refresh your product list here
            // fetchProducts();

            return res.data;
        } catch (error) {
            console.log("API Error:", error.response?.data || error.message);
            console.log("API Error:", error);
            Alert.alert(
                "Error",
                error.response?.data?.message || "Failed to delete product"
            );
            throw error;
        }
    }

    const handleDelete = async (productId) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this product?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            console.log('Deleting product with ID IN HANDLE DELETE FUNCTION:', productId);
                            await deleteProduct(productId);
                            // Refresh your list or navigate away
                        } catch (error) {
                            // Error already handled in deleteProduct
                        }
                    }
                }
            ]
        );

    }






    const renderTabContent = () => {
        if (activeTab === "home") {
            return (
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 20 }}>
                        New
                    </Text>
                    <View
                        style={{
                            flexDirection: "row", justifyContent: "space-between",
                            alignItems: "center", marginBottom: 30 }}>
                        <Text style={{ fontSize: 28 }}>⬅</Text>
                        <FlatList showsHorizontalScrollIndicator={false} pagingEnabled={true}
                                  style={{
                                      flexDirection:'row',
                                       borderRadius: 30,
                        }} contentContainerStyle={{
                             justifyContent:'space-around',
                            alignItems:'space-around',
                            marginHorizontal: 20,
                        }} horizontal={true} data={
                            [
                                "https://i.ibb.co/T0pZqZp/chicken.png",
                                "https://i.ibb.co/T0pZqZp/chicken.png",
                                "https://i.ibb.co/T0pZqZp/chicken.png",
                                "https://i.ibb.co/T0pZqZp/chicken.png",
                                "https://i.ibb.co/T0pZqZp/chicken.png",
                                "https://i.ibb.co/T0pZqZp/chicken.png",
                                "https://i.ibb.co/T0pZqZp/chicken.png",
                                "https://i.ibb.co/T0pZqZp/chicken.png",
                                "https://i.ibb.co/T0pZqZp/chicken.png"
                            ]}
                                  renderItem={(item)=>
                                      <Image  source={{ uri:item }} style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: "#fff",marginHorizontal:10 }} ></Image>
                        }/>
                   <Text style={{ fontSize: 28 }}>➡</Text>
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "700", marginBottom: 100 }}>
                        Top Sales
                    </Text>
                    {/* Add height to allow scrolling to test animation */}
                    <View style={{height: 500}} />
                </View>
            );
        }
        if (activeTab === "comments") {
            return (
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: "700" }}>Comments</Text>
                    {[1,2].map(i => (
                        <View key={i} style={{marginBottom: 20}}>
                            <Text style={{ marginTop: 20 }}>• “Best food I ever tasted!”</Text>
                        </View>
                    ))}
                </View>
            );
        }
        if (activeTab === "Basket") {
            return (
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: "700" }}>Added Product</Text>

                    {myProducts.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                marginTop: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 15,
                                backgroundColor: "#9c9191",
                                borderRadius: 12
                            }}
                        >
                            <ImageBackground

                                source={{ uri: `${BaseURL}${item.productImageBase64}` }}
                                style={{ width: 60, height: 60, borderRadius: 50, marginRight: 15 }}
                            />

                            {/* MAIN ROW THAT SPLITS LEFT AND RIGHT */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>

                                {/* LEFT: NAME + PRICE */}
                                <TouchableOpacity onPress={() => gotodetail(item)}>
                                    <Text style={{ fontWeight: "700", fontSize: 16 }}>
                                        {item.name}
                                    </Text>

                                    <Text style={{ marginTop: 5 }}>
                                        ${item.cost}
                                    </Text>
                                </TouchableOpacity>

                                {/* RIGHT: DELETE BUTTON */}
                                <TouchableOpacity
                                    style={{ height: 35, width: 35, alignItems: "center" }}
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <Text style={{ fontWeight: "700", fontSize: 26 }}>🗑</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    ))}

                 </View>
            );
        }

    };
const navigation=useNavigation();
    return (
        <View style={{ flex: 1,                    backgroundColor: "#ede7d8",
        }}>

            {/* ANIMATED DARK HEADER */}
            <Animated.View
                style={{
                    height: headerHeight, // Dynamic Height
                     alignItems: "center",
                    paddingTop: 50,
                    overflow: 'hidden',
                    zIndex: 1
                }}
            >
                {/* Fixed position buttons */}
                <TouchableOpacity style={{ position: "absolute", left: 20, top: 50, zIndex: 10 }}
                                  onPress={()=>navigation.goBack()}>
                    <Text style={{ color: "#fff", fontSize: 26 }}>←</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() =>{
                    setOpen(true)
                    navigation.navigate("Settings",{});
                }} style={{ position: "absolute", right: 20, top: 50, zIndex: 10,elevation:10,shadowColor:'green' }}>
                    <Ionicons name="settings-outline" size={28} color="black" />
                </TouchableOpacity>
                                {/* Animated Image */}
                <Animated.Image
                    source={{ uri: "https://i.pravatar.cc/300" }}
                    style={{
                        width: profileImageHeight,
                        height: profileImageHeight,
                        borderRadius: 100,
                        marginTop: profileImageMarginTop,
                         borderWidth: 3,
                        borderColor: "#41d121",
                    }}
                />

                <Text style={{ color: "rgba(5,0,0,0.91)", fontSize: 22, marginTop: 15, fontWeight: "700" }}>
                    {myCurrentUserObject.username}
                </Text>

                {/* This text will fade out on scroll */}
                <Animated.Text style={{ color: "rgba(5,0,0,0.91)", marginTop: 5, opacity: headerContentOpacity }}>
                    Greater New York
                </Animated.Text>
                {/*<Modal*/}
                {/*                isVisible={open}*/}
                {/*                onBackdropPress={() => setOpen(false)}*/}
                {/*                onSwipeComplete={() => setOpen(false)}*/}
                {/*                swipeDirection="down"*/}
                {/*                style={{*/}
                {/*                    justifyContent: "flex-end",*/}
                {/*                    margin: 0,*/}
                {/*                    backgroundColor:'red'*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                <View*/}
                {/*                    style={{*/}
                {/*                        backgroundColor: "#2e8a19",*/}
                {/*                        height: "80%",*/}
                {/*                        borderTopLeftRadius: 25,*/}
                {/*                        borderTopRightRadius: 25,*/}
                {/*                        paddingTop: 20,*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    /!* Close button *!/*/}
                {/*                    <TouchableOpacity*/}
                {/*                        onPress={() => setOpen(false)}*/}
                {/*                        style={{ alignSelf: "flex-end", paddingRight: 20 }}*/}
                {/*                    >*/}
                {/*                        <Text style={{ fontSize: 25 }}>✕</Text>*/}
                {/*                    </TouchableOpacity>*/}

                {/*                    /!* Scrollable content *!/*/}
                {/* */}
                {/*                </View>*/}
                {/*            </Modal>*/}

            </Animated.View>

            {/* SCROLLABLE CONTENT (The Yellow Part) */}
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "rgb(216,122,13)",
                     borderTopLeftRadius: 40,
                    borderTopRightRadius: 40
                 }}

                // Attach scroll event to animation
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } // false because we animate layout properties like height
                )}
            >
                {/* TAB BAR */}
                <View style={{ flexDirection: "row", justifyContent: "space-around" ,marginTop:20

                }}>
                    {/* HOME TAB */}
                    <TouchableOpacity onPress={() => setActiveTab("home")} style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 17 }}>🏠</Text>
                        <Text style={{ marginTop: 3, fontWeight: activeTab === "home" ? "700" : "400", textDecorationLine: activeTab === "home" ? "underline" : "none" }}>Home</Text>
                    </TouchableOpacity>

                    {/* COMMENTS TAB */}
                    <TouchableOpacity onPress={() => setActiveTab("comments")} style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 17 }}>💬</Text>
                        <Text style={{ marginTop: 3, fontWeight: activeTab === "comments" ? "700" : "400", textDecorationLine: activeTab === "comments" ? "underline" : "none" }}>Comments</Text>
                    </TouchableOpacity>

                    {/* CART TAB */}
                    <TouchableOpacity onPress={() => setActiveTab("Basket")} style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 17 }}>🛒</Text>
                        <Text style={{ marginTop: 3, fontWeight: activeTab === "Basket" ? "700" : "400", textDecorationLine: activeTab === "Basket" ? "underline" : "none" }}>Basket</Text>
                    </TouchableOpacity>
                </View>

                {/* Content below tab bar */}
                <View style={{ minHeight: height }}>
                    {renderTabContent()}
                </View>
            </ScrollView>
        </View>
    );
}