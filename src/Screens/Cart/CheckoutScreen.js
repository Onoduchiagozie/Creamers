import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { BaseURL } from "../../Constants";
import api from "../../Services/api";

export default function CheckoutScreen({ route, navigation }) {
    const { cartItems, total, userEmail } = route.params; // Add userEmail to params
    const [checkoutUrl, setCheckoutUrl] = useState(null);
    const [reference, setReference] = useState(null);
    const [verifying, setVerifying] = useState(false);

    const CALLBACK_URL = "myapp://payment/callback";

    useEffect(() => {
        initializePayment();
    }, []);

    const initializePayment = async () => {
        try {
            const payload = {
                email: userEmail || "customer@email.com",
                amount: Math.round(total),
                items: cartItems
            };

            const res = await api.post(
                `paystack/initialize`,
                payload
            );

            console.log("Initialize response:", res.data);

            if (res.data.authorization_url && res.data.reference) {
                setCheckoutUrl(res.data.authorization_url);
                setReference(res.data.reference);
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.error("Payment initialization error:", err.response?.data || err.message);
            Alert.alert(
                "Payment Error",
                "Unable to start payment. Please try again.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        }
    };

    const verifyAndSaveOrder = async (txReference) => {
        setVerifying(true);
        try {
            // Step 1: Verify payment with Paystack
            const verifyRes = await axios.get(
                `${BaseURL}/paystack/verify/${txReference}`
            );

            console.log("Verification response:", verifyRes.data);

            if (verifyRes.data.success) {
                // Step 2: Save order to database
                const orderData = {
                    reference: txReference,
                    email: userEmail || "customer@email.com",
                    amount: total,
                    items: cartItems,
                    status: "completed",
                    paidAt: new Date().toISOString()
                };

                const saveRes = await axios.post(
                    `${BaseURL}/orders/create`,
                    orderData
                );

                console.log("Order saved:", saveRes.data);

                // Navigate to success screen with order details
                navigation.replace("PaymentSuccess", {
                    reference: txReference,
                    amount: total,
                    orderId: saveRes.data.orderId || saveRes.data.id
                });
            } else {
                // Payment failed
                Alert.alert(
                    "Payment Failed",
                    verifyRes.data.message || "Payment was not successful",
                    [{ text: "OK", onPress: () => navigation.goBack() }]
                );
            }
        } catch (err) {
            console.error("Verification/Save error:", err.response?.data || err.message);
            Alert.alert(
                "Error",
                "Could not verify payment. Please contact support with reference: " + txReference,
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } finally {
            setVerifying(false);
        }
    };

    const handleNavigationChange = (state) => {
        const { url } = state;

        if (!url) return;

        console.log("Navigation URL:", url);

        // Check for callback URL
        if (url.startsWith(CALLBACK_URL)) {
            // Extract reference from URL
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const txReference = urlParams.get('reference') || reference;

            if (txReference) {
                verifyAndSaveOrder(txReference);
            } else {
                Alert.alert("Error", "Payment reference not found");
                navigation.goBack();
            }
        }

        // User closed Paystack modal
        if (url === "https://standard.paystack.co/close") {
            Alert.alert(
                "Payment Cancelled",
                "You cancelled the payment",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        }
    };

    if (verifying) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00C9A7" />
                <Text style={styles.text}>Verifying payment and saving order...</Text>
                <Text style={styles.subText}>Please do not close this screen</Text>
            </View>
        );
    }

    if (!checkoutUrl) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00C9A7" />
                <Text style={styles.text}>Initializing payment...</Text>
            </View>
        );
    }

    return (
        <WebView
            source={{ uri: checkoutUrl }}
            javaScriptEnabled
            domStorageEnabled
            onNavigationStateChange={handleNavigationChange}
            startInLoadingState
            renderLoading={() => (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#00C9A7" />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        marginTop: 16,
        fontSize: 16,
        color: "#333",
        fontWeight: "600",
    },
    subText: {
        marginTop: 8,
        fontSize: 14,
        color: "#666",
    },
});