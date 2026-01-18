import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import {ScrollView} from "react-native-virtualized-view";

const OrderAgainAction = () => (
    <View
        style={{
            width: 70,
            Height:70,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#4CAF50",
            borderRadius: 16,
            marginVertical: 10,
        }}
    >
        <Ionicons name="refresh-outline" size={22} color="#fff" />
        <Text style={{ color: "#fff", fontSize: 11, marginTop: 2 }}>
            Again
        </Text>
    </View>
);

const OrderedItemList = memo(({ item, onOrderAgain, cardWidth = 245 }) => {
    const handleOrderAgain = () => {
        if (onOrderAgain) {
            onOrderAgain(item);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    };

    return (
        <Swipeable
            renderRightActions={() => (
                <TouchableOpacity onPress={handleOrderAgain}>
                    <OrderAgainAction />
                </TouchableOpacity>
            )}
        >
            <View
                style={{
                    width: cardWidth,
                    backgroundColor: "#fff",
                    marginBottom: 14,
                    padding: 15,
                    borderRadius: 25,
                    elevation: 5,
                    marginHorizontal:10

                }}
            >
                     <Text style={{ fontWeight: "700", fontSize: 16 }}>
                        {item.productName}
                    </Text>
                    <Text style={{ color: "#666", marginTop: 4 }}>
                        Qty {item.totalItems} · ₦{item.total}
                    </Text>
                    <Text style={{ marginTop: 6, fontSize: 12, color: "#4CAF50" }}>
                        {item.status}
                    </Text>
             </View>
        </Swipeable>
    );
});

export default OrderedItemList;