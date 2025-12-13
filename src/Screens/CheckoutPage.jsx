import {SafeAreaView, TouchableOpacity, View, Text, Image, FlatList} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import FoodDetailsScreen from "./FoodDetailsOne";
import {useContext, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../UserContext";
import CartItemRow from "../Components/CartItem";
import {ScrollView} from "react-native-virtualized-view";

function CheckoutPage({ route }) {

    const navigation = useNavigation();
    const {cartItems,setOrders}=useContext(UserContext);
    const [transaction, setTransaction] = useState(null);

    //const {cartItems}=route.params;
    console.log("checkout page cartItem NEW ",cartItems);
    debugger

debugger

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.totalPrice * item.qty,
        0
    );

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    const handleConfirmCheckout = () => {
        if (cartItems.length === 0) return;

        const newOrder = {
            id: Date.now(),                 // temp frontend ID
            status: "Processing",            // or "Pending"
            items: totalItems,
            subtotal,
            createdAt: new Date().toISOString(),
        };
console.log("new order BUT TO BE ,ADE ",newOrder);
        setOrders(prev => [newOrder, ...prev]);

        // OPTIONAL: clear cart after checkout
     //   setCartItems([]);

        // navigate if needed
        // navigation.navigate("Success");
    };

    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax;
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff',marginVertical:5 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Transactions Detail</Text>
           </View>

            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <View style={{ width: 120, height: 120, marginBottom: 20 }}>
                    {/* Using a simple icon here, image in design is complex illustration */}
                    <Ionicons name="gift-outline" size={100} color="#FF914D" />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your order is confirmed!</Text>
                <Text style={{ textAlign: 'center', color: '#888', marginTop: 10, paddingHorizontal: 50 }}>
                   Enjoy your  meal to the fullest!
                </Text>
            </View>

            <View style={{ margin: 20, borderWidth: 1, borderColor: '#eee', borderRadius: 15, padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Order Summary</Text>
                    <Feather name="external-link" size={18} color="#ccc" />
                </View>

                <View style={{ marginBottom: 15 }}><Text style={{ color: '#888', fontSize: 12 }}>Order ID</Text><Text style={{ fontWeight: '600', textAlign: 'right', marginTop: -15 }}>Order #2140</Text></View>
                <View style={{ marginBottom: 15 }}><Text style={{ color: '#888', fontSize: 12 }}>Date & Time</Text><Text style={{ fontWeight: '600', textAlign: 'right', marginTop: -15 }}>May 15, 2025, 7:15 PM</Text></View>
                <View style={{ marginBottom: 15 }}><Text style={{ color: '#888', fontSize: 12 }}>Status</Text><Text style={{ fontWeight: '600', textAlign: 'right', marginTop: -15, color: '#4CAF50' }}>Completed</Text></View>

                {/*<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#f5f5f5', borderBottomWidth: 1, borderBottomColor: '#f5f5f5', marginVertical: 10 }}>*/}
                {/*    <Image source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' }} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 10 }} />*/}
                {/*    <View style={{ flex: 1 }}>*/}
                {/*        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Special Spicy Hamburger</Text>*/}
                {/*        <Text style={{ color: '#ccc', fontSize: 10 }}>Medium, Extra Hot</Text>*/}
                {/*    </View>*/}
                {/*    <Text style={{ fontWeight: 'bold' }}>$19.99</Text>*/}
                {/*</View>*/}
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.productId.toString()}
                    renderItem={({ item }) => <CartItemRow item={item} />}
                    scrollEnabled={false}
                />


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ color: '#888' }}>Subtotal</Text>
                    <Text style={{ fontWeight: '600' }}>${subtotal}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text style={{ color: '#888' }}>Tax (10%)</Text>
                    <Text style={{ fontWeight: '600' }}>${tax}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Grand Total</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FF914D' }}>${grandTotal}</Text>
                </View>
            </View>

            <View style={{ padding: 20, marginTop: 'auto',marginBottom:50 }}>
                <TouchableOpacity
                    onPress={() => {
                        handleConfirmCheckout()
                        navigation.popToTop()
                    }}
                    style={{ backgroundColor: '#FF914D', paddingVertical: 15, borderRadius: 15, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
export default CheckoutPage;