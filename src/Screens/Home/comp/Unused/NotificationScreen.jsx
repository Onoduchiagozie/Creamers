import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StatusBar,
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function NotificationScreen({  }) {
    const [activeTab, setActiveTab] = useState(0); // 0 = Orders, 1 = Reviews
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Swipe animation
    const translateX = useSharedValue(0);
    const TAB_WIDTH = width - 40;

    useEffect(() => {
        fetchNotifications();
    }, []);
const navigation = useNavigation();

//function to fetch and or update orders
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            // Fetch orders
            const ordersResponse = await fetch(
                "https://ouroboros-p2nc.onrender.com/api/orders"
            );
            const ordersData = await ordersResponse.json();

            // Fetch reviews
            const reviewsResponse = await fetch(
                "https://ouroboros-p2nc.onrender.com/api/review"
            );
            const reviewsData = await reviewsResponse.json();

            setOrders(ordersData.data || []);
            setReviews(reviewsData.data || []);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    // Format time ago
    const timeAgo = (date) => {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "just now";
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    };

    const switchTab = (index) => {
        setActiveTab(index);
        translateX.value = withTiming(-TAB_WIDTH * index, {
            duration: 400,
            easing: Easing.out(Easing.exp),
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    // Swipe gesture
    const gesture = Gesture.Pan()
        .onUpdate((e) => {
            const newTranslate = -TAB_WIDTH * activeTab + e.translationX;
            if (newTranslate <= 0 && newTranslate >= -TAB_WIDTH) {
                translateX.value = newTranslate;
            }
        })
        .onEnd((e) => {
            if (e.translationX < -50 && activeTab === 0) {
                runOnJS(switchTab)(1);
            } else if (e.translationX > 50 && activeTab === 1) {
                runOnJS(switchTab)(0);
            } else {
                translateX.value = withTiming(-TAB_WIDTH * activeTab, {
                    duration: 300,
                });
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: activeTab * ((width - 80) / 2) }],
    }));

    const OrderItem = ({ order }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 16,
                marginHorizontal: 20,
                marginBottom: 12,
                borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
            }}
        >
            <View
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#FF6B35",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                }}
            >
                <Ionicons name="receipt-outline" size={24} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "700", color: "#1a1a1a" }}>
                    Order #{order.id?.slice(-6) || "N/A"}
                </Text>
                <Text style={{ fontSize: 13, color: "#999", marginTop: 2 }}>
                    {order.status || "Processing"} • ₦{order.totalAmount || 0}
                </Text>
            </View>

            <Text style={{ fontSize: 12, color: "#999" }}>
                {timeAgo(order.createdAt)}
            </Text>
        </TouchableOpacity>
    );

    const ReviewItem = ({ review }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 16,
                marginHorizontal: 20,
                marginBottom: 12,
                borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
            }}
        >
            <View
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: review.imageUrl ? "transparent" : "#6CBF3A",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                    overflow: "hidden",
                }}
            >
                {review.imageUrl ? (
                    <Image
                        source={{ uri: review.imageUrl }}
                        style={{ width: 50, height: 50 }}
                    />
                ) : (
                    <Ionicons name="star" size={24} color="#fff" />
                )}
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "700", color: "#1a1a1a" }}>
                    {review.name || "Anonymous"}
                </Text>
                <Text
                    style={{ fontSize: 13, color: "#666", marginTop: 2 }}
                    numberOfLines={1}
                >
                    {review.review || "Left a review"}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 4 }}>
                    {[...Array(5)].map((_, i) => (
                        <Ionicons
                            key={i}
                            name={i < (review.rating || 0) ? "star" : "star-outline"}
                            size={12}
                            color="#FFD700"
                            style={{ marginRight: 2 }}
                        />
                    ))}
                </View>
            </View>

            <Text style={{ fontSize: 12, color: "#999" }}>
                {timeAgo(review.createdAt)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View
                style={{
                    paddingTop: 50,
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    backgroundColor: "#F9F9F9",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={28} color="#333" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#1a1a1a" }}>
                        Notifications
                    </Text>

                    <TouchableOpacity>
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                backgroundColor: "#FF6B35",
                                borderRadius: 12,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>
                                {orders.length + reviews.length}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Tab Selector */}
                <View
                    style={{
                        backgroundColor: "#EDEDED",
                        borderRadius: 14,
                        height: 50,
                        overflow: "hidden",
                    }}
                >
                    <Animated.View
                        style={[
                            {
                                position: "absolute",
                                width: (width - 80) / 2,
                                height: 50,
                                backgroundColor: "#FF6B35",
                                borderRadius: 14,
                            },
                            indicatorStyle,
                        ]}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => switchTab(0)}
                            style={{
                                width: (width - 80) / 2,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 2,
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons
                                    name="heart-outline"
                                    size={18}
                                    color={activeTab === 0 ? "#fff" : "#666"}
                                    style={{ marginRight: 6 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "600",
                                        color: activeTab === 0 ? "#fff" : "#666",
                                    }}
                                >
                                    Orders
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => switchTab(1)}
                            style={{
                                width: (width - 80) / 2,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 2,
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons
                                    name="chatbubble-outline"
                                    size={18}
                                    color={activeTab === 1 ? "#fff" : "#666"}
                                    style={{ marginRight: 6 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "600",
                                        color: activeTab === 1 ? "#fff" : "#666",
                                    }}
                                >
                                    Reviews
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Content with Swipe Gesture */}
            <GestureDetector gesture={gesture}>
                <Animated.View
                    style={[
                        {
                            flexDirection: "row",
                            width: TAB_WIDTH * 2,
                        },
                        animatedStyle,
                    ]}
                >
                    {/* Orders List */}
                    <View style={{ width: TAB_WIDTH }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 100 }}
                        >
                            {loading ? (
                                <View style={{ padding: 40, alignItems: "center" }}>
                                    <Text style={{ color: "#999" }}>Loading...</Text>
                                </View>
                            ) : orders.length === 0 ? (
                                <View style={{ padding: 40, alignItems: "center" }}>
                                    <Ionicons name="receipt-outline" size={48} color="#ccc" />
                                    <Text
                                        style={{
                                            color: "#999",
                                            marginTop: 12,
                                            fontSize: 15,
                                        }}
                                    >
                                        No orders yet
                                    </Text>
                                </View>
                            ) : (
                                orders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))
                            )}
                        </ScrollView>
                    </View>

                    {/* Reviews List */}
                    <View style={{ width: TAB_WIDTH }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 100 }}
                        >
                            {loading ? (
                                <View style={{ padding: 40, alignItems: "center" }}>
                                    <Text style={{ color: "#999" }}>Loading...</Text>
                                </View>
                            ) : reviews.length === 0 ? (
                                <View style={{ padding: 40, alignItems: "center" }}>
                                    <Ionicons name="chatbubble-outline" size={48} color="#ccc" />
                                    <Text
                                        style={{
                                            color: "#999",
                                            marginTop: 12,
                                            fontSize: 15,
                                        }}
                                    >
                                        No reviews yet
                                    </Text>
                                </View>
                            ) : (
                                reviews.map((review) => (
                                    <ReviewItem key={review.id} review={review} />
                                ))
                            )}
                        </ScrollView>
                    </View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}