import {View,Text} from "react-native";

export const OrderCard = ({ order }) => (
    <View
        style={{
            width: 260,
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 15,
            shadowColor: "rgba(99,32,32,0.96)",
            shadowOpacity: 0.05,
            marginRight: 16,
            marginVertical:10,
            elevation: 5,
          }}
    >
        <Text style={{ fontSize: 12, color: "#888" }}>
            Order #{order.id}
        </Text>

        <View
            style={{
                backgroundColor: "#FFEADD",
                alignSelf: "flex-start",
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 5,
                marginTop: 5,
            }}
        >
            <Text style={{ color: "#FF914D", fontSize: 10, fontWeight: "bold" }}>
                {order.status}
            </Text>
        </View>

        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 12, fontWeight: "600" }}>
                {order.items} Items
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                ${order.total}
            </Text>
        </View>
    </View>
);
