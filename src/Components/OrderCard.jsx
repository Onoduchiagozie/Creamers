import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { STATUS_CONFIG } from "../Constants";

const OrderCard = ({ order }) => {
    const config = STATUS_CONFIG[order.status]

    return (
        <Animatable.View
            animation={STATUS_CONFIG[order.status].animation}
            iterationCount={3}
            duration={1500}

            key={order.status}
            style={{
                width: 200,
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 15,
                borderWidth: config.border,
                borderColor: config.color,
                marginBottom: 12,
                marginRight: 16,
                marginVertical: 10,
                shadowColor: "rgba(5,0,0,0.91)",
                shadowOpacity: 0.05,
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
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            color: "#FF914D",
                            fontSize: 10,
                            fontWeight: "bold",

                        }}
                    >
                        {config.emoji} {order.status}
                    </Text>

                    <Text
                        style={{
                            color: "rgba(5,0,0,0.91)",
                            fontSize: 10,
                            fontWeight: "bold",
                            marginLeft: 10,
                        }}
                    >
                        {order.timeAgo}
                    </Text>
                </View>
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
        </Animatable.View>
    );
};

export default OrderCard;
