import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, FlatList, Image } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import {LinearGradient} from "expo-linear-gradient";

const { width } = Dimensions.get("window");

/* ---------------- SIMPLE MEAL ITEM (NO PARALLAX) ---------------- */
const MealItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={{
                height: 140,
                backgroundColor: "#fff",
                borderRadius: 16,
                marginBottom: 14,
                overflow: "hidden",
                elevation: 4,
            }}
        >
            <Image
                source={{ uri: item.imageUrl }}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 12,
                    backgroundColor: "rgba(0,0,0,0.35)",
                }}
            >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                    {item.name}
                </Text>
                <Text style={{ color: "#fff", fontSize: 13 }}>
                    ₦{item.cost}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

/* ---------------- MAIN SCREEN ---------------- */
export default function MenuScreen({ route }) {
    const navigation = useNavigation();

    const meals = route?.params?.meal ?? [];
    const selectedIndex = route?.params?.selectedIndex ?? 0;
    const shared = route?.params?.shared;

    const [activeIndex, setActiveIndex] = useState(selectedIndex);

    /* ---------------- GET UNIQUE CATEGORIES ---------------- */
    const categories = useMemo(() => {
        const unique = new Map();
        meals.forEach(meal => {
            if (meal.category && !unique.has(meal.category)) {
                unique.set(meal.category, meal.category);
            }
        });
        return Array.from(unique.values());
    }, [meals]);

    /* ---------------- FILTER MEALS BY ACTIVE CATEGORY ---------------- */
    const filteredMeals = useMemo(() => {
        return meals.filter(m => m.category === categories[activeIndex]);
    }, [meals, categories, activeIndex]);

    /* ---------------- SHARED VALUES ---------------- */
    const enterProgress = useSharedValue(0);
    const indicatorX = useSharedValue(0);

    const TAB_WIDTH = (width - 40) / Math.max(categories.length, 1);
    const TARGET_Y = 110;

    const flyX = useSharedValue(shared?.x ?? 0);
    const flyY = useSharedValue(shared?.y ?? 0);
    const flyScale = useSharedValue(1);
    const flyOpacity = useSharedValue(1);

    useEffect(() => {
        if (shared) {
            flyX.value = withTiming(
                TAB_WIDTH * selectedIndex + TAB_WIDTH / 2 - 15,
                { duration: 900, easing: Easing.out(Easing.exp) }
            );
            flyY.value = withTiming(TARGET_Y, {
                duration: 900,
                easing: Easing.out(Easing.exp),
            });
            flyScale.value = withTiming(0.4, { duration: 500 });
            flyOpacity.value = withTiming(0, { duration: 520 });
        }

        enterProgress.value = withTiming(1, {
            duration: 700,
            easing: Easing.out(Easing.cubic),
        });

        indicatorX.value = TAB_WIDTH * selectedIndex;
    }, []);

    /* ---------------- ANIMATED STYLES ---------------- */
    const pageStyle = useAnimatedStyle(() => ({
        opacity: enterProgress.value,
        transform: [{ translateY: 20 * (1 - enterProgress.value) }],
    }));

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: indicatorX.value }],
    }));

    const flyStyle = useAnimatedStyle(() => ({
        position: "absolute",
        left: flyX.value,
        top: flyY.value,
        opacity: flyOpacity.value,
        transform: [{ scale: flyScale.value }],
        zIndex: 99,
    }));

    /* ---------------- NAVIGATION HANDLER (FIX FOR CRASH) ---------------- */
    const handleMealPress = (item) => {
        // Create a clean copy with only the data we need
        const cleanMeal = {
            id: item.id,
            name: item.name,
            description: item.description,
            imageUrl: item.imageUrl,
            rating: item.rating,
            cost: item.cost,
            category: item.category
        };

        console.log("Navigating with:", cleanMeal);
        navigation.navigate("FoodDetail", { meal: cleanMeal });
    };

    /* ---------------- RENDER ---------------- */
    return (
        <LinearGradient
            // colors={['#d7d2cc', '#04121e']}
            // colors={['#d7d2cc', 'rgba(5,0,0,0.91)']}
            colors={['#d7d2cc', '#f6f1f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
        <Animated.View
            style={[
                {
                    flex: 1,
                    paddingTop: 70,
                    paddingHorizontal: 20,
                    backgroundColor: "#F4F4F4",
                },
                pageStyle,
            ]}
        >
            {/* SHARED ELEMENT */}
            {shared && (
                <Animated.Text style={[{ fontSize: 30 }, flyStyle]}>
                    {shared.emoji}
                </Animated.Text>
            )}

            {/* CATEGORY BAR */}
            <View
                style={{
                    backgroundColor: "#EDEDED",
                    borderRadius: 18,
                    height: 50,
                    marginBottom: 20,
                    overflow: "hidden",
                }}
            >
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            width: TAB_WIDTH,
                            height: 50,
                            backgroundColor: "#6CBF3A",
                            borderRadius: 18,
                        },
                        indicatorStyle,
                    ]}
                />

                <View style={{ flexDirection: "row" }}>
                    {categories.map((cat, index) => (
                        <TouchableOpacity
                            key={cat}
                            activeOpacity={0.85}
                            onPress={() => {
                                setActiveIndex(index);
                                indicatorX.value = withTiming(TAB_WIDTH * index, {
                                    duration: 450,
                                    easing: Easing.out(Easing.exp),
                                });
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }}
                            style={{
                                width: TAB_WIDTH,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 2,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "700",
                                    color: activeIndex === index ? "#fff" : "#333",
                                }}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* SIMPLE LIST (NO PARALLAX) */}
            <FlatList
                data={filteredMeals}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "800",
                            marginBottom: 16,
                        }}
                    >
                        {categories[activeIndex]}
                    </Text>
                )}
                renderItem={({ item }) => (
                    <MealItem
                        item={item}
                        onPress={() => handleMealPress(item)}
                    />
                )}
            />
        </Animated.View></LinearGradient>
    );
}
