import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, FlatList, Image, Platform, Text, TouchableOpacity, View,} from "react-native";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming,} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../../Services/Context/UserContext";

import api from "../../Services/api";
import AddedProductItem from "../../Components/AddedProductListr";
import OrderedItemList from "./Comp/OrderedItemList";
import useLocation from "../../Location";
import {LinearGradient} from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const TABS = [
    { icon: "grid-outline" },
    { icon: "heart-outline" },
    { icon: "bookmark-outline" },
];

// Dummy data for likes
const DUMMY_PRODUCTS = [
    {
        id: "d1",
        imageUrl: "https://picsum.photos/200/200?random=1",
        name: "Wireless Headphones",
        cost: "15000",
    },
    {
        id: "d2",
        imageUrl: "https://picsum.photos/200/200?random=2",
        name: "Smart Watch",
        cost: "25000",
    },
    {
        id: "d3",
        imageUrl: "https://picsum.photos/200/200?random=3",
        name: "Phone Case",
        cost: "3500",
    },
];


export default function ProfileScreen() {
    const navigation = useNavigation();
    const { myCurrentUserObject, addToCart,orders } = useContext(UserContext);

    const [activeTab, setActiveTab] = useState(0);
    const [addedProducts, setAddedProducts] = useState([]);
    const [orderedItems, setOrderedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fav, setFav] = useState([]);



    const { address, loadingLocation } = useLocation();


    const translateX = useSharedValue(0);

    // Fetch data
    useEffect(() => {
        (async () => {
            try {
                const added = await api.get("/Product/GetAllSellerProducts");
                const ordered = await api.get("/order/getorders");
                const favourite = await api.get("Favourites/GetUserFavourites")

                console.log("......................",ordered.data);
                setAddedProducts(added.data);
                setOrderedItems(ordered.data);
                setFav(favourite.data);
                console.log(favourite.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const switchTab = (index) => {
        if (index === activeTab) return;

        setActiveTab(index);

        translateX.value = withTiming(-width * index, {
            duration: 420,
            easing: Easing.out(Easing.exp),
        });

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const pagerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    // Delete product handler
    const handleDeleteProduct = async (id) => {
        await api.delete(`/Product/${id}`);
        setAddedProducts((p) => p.filter((x) => x.id !== id));
    };

    // Order again handler
    const handleOrderAgain = (item) => {
        debugger
        addToCart({
            productId: item.productId,
            name: item.productName,
            qty: item.quantity,
            price: item.lineTotal / item.quantity,
        });
    };

    return (
        <LinearGradient
            // colors={['#d7d2cc', '#04121e']}
            // colors={['#d7d2cc', 'rgba(5,0,0,0.91)']}
            colors={['#d7d2cc', '#f6f1f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
        <View style={{ flex: 1}}>
            {/* HEADER */}
            <View
                style={{
                    paddingTop: 60,
                    alignItems: "center",
                    justifyContent: "space-between",

                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ position: "absolute", left: 20, top: 60 }}
                >
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>

                <Image
                    source={{ uri: "https://i.pravatar.cc/400" }}
                    style={{ width: 90, height: 90, borderRadius: 45 }}
                />

                <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 12 }}>
                    {myCurrentUserObject.username}
                </Text>

                <Text style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
                    {loading ? "Loading location..." : address}
                </Text>
            </View>

             <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 30,
                    paddingHorizontal: 30,
                }}
            >
                {TABS.map((tab, i) => {
                    const isActive = activeTab === i;

                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => switchTab(i)}
                            activeOpacity={0.85}
                        >
                            <View
                                style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 16,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: isActive ? "#fff" : "transparent",

                                    ...(isActive
                                        ? Platform.select({
                                            ios: {
                                                shadowColor: "#000",
                                                shadowOpacity: 0.18,
                                                shadowRadius: 12,
                                                shadowOffset: { width: 0, height: 6 },
                                            },
                                            android: {
                                                elevation: 12,
                                            },
                                        })
                                        : {}),
                                }}
                            >
                                <Ionicons
                                    name={tab.icon}
                                    size={26}
                                    color={isActive ? "#000" : "#999"}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* CONTENT PAGER */}
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <Animated.View
                    style={[
                        {
                            flexDirection: "row",
                            width: width * 2,
                            flex: 1,
                            marginTop: 24,
                        },
                        pagerStyle,
                    ]}
                >
                    {/* Gallery - Added Products */}
                    <View style={{ width }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                paddingHorizontal: 20,
                                marginBottom: 16,
                            }}
                        >
                           Added Products
                        </Text>
                        <FlatList
                            data={addedProducts}
                            keyExtractor={(item) => item.id}
                            ListHeaderComponent={
                            <Text style={{margin:20,fontWeight:'bold'}}>Swipe to Delete</Text>
                            }
                            renderItem={({ item }) => (
                                <AddedProductItem
                                    item={item}
                                    onDelete={handleDeleteProduct}
                                    cardWidth={width - 30}
                                />
                            )}
                            contentContainerStyle={{  }}
                            showsVerticalScrollIndicator={false}

                        />
                    </View>

                    {/* Likes - Dummy Products */}
                    <View style={{ width }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                paddingHorizontal: 20,
                                marginBottom: 16,
                            }}
                        >
                            Likes
                        </Text>
                        <FlatList
                            data={fav}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <AddedProductItem
                                    item={item}
                                    onDelete={(id) => console.log("Delete", id)}
                                    cardWidth={width - 40}
                                />
                            )}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    {/* Saved - Ordered Items */}
                    <View style={{ width }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                paddingHorizontal: 20,
                                marginBottom: 16,
                            }}
                        >
                            Orders
                        </Text>
                        <FlatList
                            data={orderedItems}
                            keyExtractor={(item, idx) => `${item.orderId}-${idx}`}
                            renderItem={({ item }) => (
                                <OrderedItemList
                                    item={item}
                                    onOrderAgain={handleOrderAgain}
                                    cardWidth={width - 40}
                                />
                            )}
                            ListHeaderComponent={
                                <Text style={{margin:20,fontWeight:'bold'}}>Swipe to Order Again</Text>
                            }
                            contentContainerStyle={{ }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </Animated.View>
            )}
        </View></LinearGradient>
    );
}