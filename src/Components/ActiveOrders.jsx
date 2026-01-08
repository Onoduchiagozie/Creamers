import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from "react-native-reanimated";
import {Dimensions, View} from "react-native";
import OrderCard from "./OrderCard";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function OrderHeadline({ orders }) {
    const translateX = useSharedValue(SCREEN_WIDTH);
    const contentWidth = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));
console.log("here are the orders",orders);
    const startAnimation = () => {
        translateX.value = withRepeat(
            withTiming(-contentWidth.value, {
                duration: 4000,
                easing: Easing.linear,
            }),
            -1,
            true
        );
    };

    return (
        <View style={{ overflow: "hidden",marginHorizontal:-15  }}>
            <Animated.View
                style={[{ flexDirection: "row" }, animatedStyle]}
                onLayout={(e) => {
                    contentWidth.value = e.nativeEvent.layout.width;
                    startAnimation(); // 🔥 STARTS HERE — NOT useEffect
                }}
            >
                {orders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                ))}
            </Animated.View>
        </View>
    );
}
