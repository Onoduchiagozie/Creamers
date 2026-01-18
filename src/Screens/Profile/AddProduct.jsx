import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import {BaseURL} from "../../Constants";

import api from "../../Services/api";

export default function AddProductScreen() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageBase64, setImageBase64] = useState(null);
    const [loading, setLoading] = useState(false);



    // ✅ Product type
    const [productType, setProductType] = useState("Cake");

// // ✅ Toggles (ONLY THESE)
//     const [enableSweetness, setEnableSweetness] = useState(false);
//     const [enableFlavour, setEnableFlavour] = useState(false);
//     const [enableToppings, setEnableToppings] = useState(false);
//
// // ✅ Sweetness prices (Cake only)
//     const [sweetnessNormalPrice, setSweetnessNormalPrice] = useState("");
//     const [sweetnessExtraPrice, setSweetnessExtraPrice] = useState("");

// ✅ Flavours
    const [flavours, setFlavours] = useState([
        { name: "Vanilla", price: "" },
        { name: "Banana", price: "" },
    ]);

// ✅ Toppings
    const [toppings, setToppings] = useState([
        { name: "Almonds", price: "" },
        { name: "Cashew", price: "" },
    ]);

    const navigation = useNavigation();

    // Pick Image from Gallery
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                quality: 0.7,
            });

            if (!result.canceled && result.assets?.length > 0) {
                setImageBase64(result.assets[0].base64);
            }
        } catch (e) {
            console.log("Image picker error:", e);
            Alert.alert("Error", "Could not select image");
        }
    };

    // Submit Product to API
    const submitProduct = async () => {
        if (!name.trim() || !price.trim()) {
            Alert.alert("Missing Fields", "Please enter both Name and Price");
            return;
        }

        const customizations = [];

        // if (productType === "Cake" && enableSweetness) {
        //     customizations.push({
        //         name: "Sweetness",
        //         isRequired: true,
        //         maxSelections: 1,
        //         options: [
        //             {
        //                 name: "Normal",
        //                 priceIncrement: Number(sweetnessNormalPrice || 0),
        //             },
        //             {
        //                 name: "Extra",
        //                 priceIncrement: Number(sweetnessExtraPrice || 0),
        //             },
        //         ],
        //     });
        // }

        // if (enableFlavour) {
        //     customizations.push({
        //         name: "Flavour",
        //         isRequired: false,
        //         maxSelections: 1,
        //         options: flavours
        //             .filter(f => f.price !== "")
        //             .map(f => ({
        //                 name: f.name,
        //                 priceIncrement: Number(f.price),
        //             })),
        //     });
        // }

        // if (enableToppings) {
        //     customizations.push({
        //         name: "Toppings",
        //         isRequired: false,
        //         maxSelections: 2,
        //         options: toppings
        //             .filter(t => t.price !== "")
        //             .map(t => ({
        //                 name: t.name,
        //                 priceIncrement: Number(t.price),
        //             })),
        //     });
        // }


        const payload = {
              Name: name,
            Cost: Number(price),
            Description: description,
               ProductImageBase64: imageBase64 ? imageBase64 : "",
            Location: "Lagos",
          //  Customizations: customizations,


        };
console.log("Here is the payload o o o",payload);
        setLoading(true);


        try {
            const res = await api.post("/Product/AddProduct", payload, {
                headers: { "Content-Type": "application/json" },
            });
            Alert.alert("Success", res.data.message || "Product created");
            // Reset form
            setName("");
            setPrice("");
            setDescription("");
            setImageBase64(null);
        } catch (error) {
            console.log("API Error:", error.response?.data || error.message);
            Alert.alert(
                "Error",
                error.response?.data?.message || "Failed to upload product"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#fff" }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={{ padding: 20,marginBottom:30 }}>
                {/* Back Button */}
                <TouchableOpacity
                    style={{ marginBottom: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ color: "#ca0c0c", fontSize: 36 }}>←</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 20 }}>
                    Add Product
                </Text>

                {/* Name Input */}
                <Text style={{ fontWeight: "600", marginBottom: 5 }}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter product name"
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 15,
                    }}
                />
                <Text style={{ fontSize: 18, fontWeight: "700", marginVertical: 15 }}>
                    Product Options
                </Text>

                {/* Price Input */}
                <Text style={{ fontWeight: "600", marginBottom: 5 }}>Price</Text>
                <TextInput
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    placeholder="Enter product price"
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 15,
                    }}
                />

                {/* Description Input */}
                <Text style={{ fontWeight: "600", marginBottom: 5 }}>Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter description"
                    multiline
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        padding: 12,
                        borderRadius: 8,
                        minHeight: 80,
                        marginBottom: 15,
                        textAlignVertical: "top",
                    }}
                />

                {/* Image Picker */}
                <TouchableOpacity
                    onPress={pickImage}
                    style={{
                        backgroundColor: "#f0f0f0",
                        padding: 15,
                        borderRadius: 10,
                        alignItems: "center",
                        marginBottom: 15,
                    }}
                >
                    <Text style={{ fontWeight: "600" }}>Pick Product Image</Text>
                </TouchableOpacity>

                {/* Image Preview */}
                {imageBase64 && (
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 12,
                            marginBottom: 20,
                        }}
                    />
                )}

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={submitProduct}
                    style={{
                        backgroundColor: "#FF914D",
                        paddingVertical: 15,
                        borderRadius: 12,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom:50
                    }}
                    disabled={loading}
                >
                    {loading && (
                        <ActivityIndicator size="small" color="#fff" style={{ marginRight: 10 }} />
                    )}
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                        {loading ? "Uploading..." : "Upload Product"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
