import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const DeleteAction = () => (
    <View
        style={{
            width: 60,
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FF5A5F",
            borderRadius: 16,
            marginVertical: 10,
        }}
    >
        <Ionicons name="trash-outline" size={26} color="#fff" />
    </View>
);

const AddedProductItemList = memo(({ item, onDelete, cardWidth = 245 }) => {
    const handleDelete = async () => {
        if (onDelete) {
            await onDelete(item.id);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
    };

    return (
        <Swipeable
            renderRightActions={() => (
                <TouchableOpacity onPress={handleDelete}>
                    <DeleteAction />
                </TouchableOpacity>
            )}
        >
            <View
                style={{
                    width: cardWidth,
                    backgroundColor: "#fff",
                    marginBottom: 24,
                    padding: 14,
                     marginHorizontal: 10,
                    borderRadius: 16,
                    elevation: 7,
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        marginBottom: 8,
                    }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "700", fontSize: 16 }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: "#666", marginTop: 4 }}>
                        ₦{item.cost}
                    </Text>
                </View>
            </View>
        </Swipeable>
    );
});

export default AddedProductItemList;