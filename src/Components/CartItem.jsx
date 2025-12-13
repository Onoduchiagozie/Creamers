import {View,Image,Text} from "react-native";

export default function CartItemRow({ item }) {
    console.log("cart item row ",item);
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 15,
                borderTopWidth: 1,
                borderTopColor: '#f5f5f5',
                borderBottomWidth: 1,
                borderBottomColor: '#f5f5f5',
                marginVertical: 5
            }}
        >
            <Image
                source={{ uri: item.image }}
                style={{ width: 40, height: 40, borderRadius: 8, marginRight: 10 }}
            />

            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                    {item.name} x{item.qty}
                </Text>
                <Text style={{ color: '#ccc', fontSize: 10 }}>
                    {item.basePrice}
                </Text>
            </View>

            <Text style={{ fontWeight: 'bold' }}>
                ${(item.totalPrice * item.qty).toFixed(2)}
            </Text>
        </View>
    );
}
