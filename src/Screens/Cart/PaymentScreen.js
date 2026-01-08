import React, { useState, useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { PaystackProps as paystackProps, PaystackProvider } from 'react-native-paystack-webview';

const DriverScreen = () => {
    const [pay, setPay] = useState(1);  // Payment status
    const paystackWebViewRef = useRef(paystackProps.PayStackRef);  // Ref for the Paystack WebView
    const email = "user@example.com";  // User email
    const payment = 5000;  // Payment amount
    const currencyCode = "NGN";  // Currency code

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Pending Payment</Text>
            <Text style={styles.amount}>Amount Due: {currencyCode} {payment}</Text>

            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // Start the transaction
                        paystackWebViewRef.current.startTransaction();
                    }}>
                    <Text style={styles.buttonText}>Pay Now</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    <PaystackProvider
                        paystackKey="pk_live_XXXXXXXXXXXXXX"  // Your live Paystack public key
                        billingEmail={email}
                        amount={payment}
                        onCancel={(e) => {
                            console.log('Transaction canceled:', e);
                        }}
                        onSuccess={(res) => {
                            const { data } = res;
                            const transactionRef = data.transactionRef.reference;
                            const transactionStatus = data.transactionRef.status;
                            const amountPaid = payment;
                            const emailUsed = email;

                            // Post data to the backend
                            fetch('https://yourwebsite.com/drivercallback.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    transactionRef,
                                    transactionStatus,
                                    amountPaid,
                                    emailUsed,
                                }),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log('Backend response:', data);

                                    // If the transaction is successful, update the payment status
                                    if (transactionStatus === 'success') {
                                        setPay(0);
                                    }
                                })
                                .catch((error) => console.error('Error posting to backend:', error));
                        }}
                        ref={paystackWebViewRef}
                        channels={['card', 'ussd', 'qr', 'bank_transfer']}  // Supported payment channels
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    amount: { fontSize: 18, marginVertical: 10 },
    button: { backgroundColor: 'blue', padding: 15, borderRadius: 5 },
    buttonText: { color: 'white', textAlign: 'center' },
});

export default DriverScreen;
