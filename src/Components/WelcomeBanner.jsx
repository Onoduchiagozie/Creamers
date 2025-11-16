import React from "react";
import { View, Text, TextInput } from "react-native";

const WelcomeBanner = ({  }) => {
    return (
        <View
            style={{
                paddingTop: 20,
                paddingHorizontal: 20,
                marginTop:10
            }}
        >

            <View
                style={{
                    width: "100%",
                    marginBottom: 20,
                }}
            >
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        fontFamily: "cursive",
                        color: "red",
                        maxWidth: "95%",   // stays within the screen
                        textAlign: "left", // ✅ text starts from left
                    }}
                >
                    Welcome
                </Text>
            </View>

            {/* SEARCH INPUT */}
            <TextInput
                placeholder="Search Workout by target muscles"
                style={{
                    height: 50,
                    borderWidth: 5,
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    backgroundColor: "transparent",
                }}
            />
        </View>
    );
};

export default WelcomeBanner;
