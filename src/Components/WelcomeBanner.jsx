import React from "react";
import { View, Text, TextInput } from "react-native";
import {Button, Searchbar} from "react-native-paper";
import TextInputIcon from "react-native-paper/src/components/TextInput/Adornment/TextInputIcon";
import {Ionicons} from "@expo/vector-icons";

const WelcomeBanner = ({  }) => {
    return (
        <View
            style={{
                paddingTop: 20,
                paddingHorizontal: 20,
                marginTop:10,
                flexDirection: 'column',
             }}
        >

            <View
                style={{
                    width: "100%",
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: "space-between",

                }}
            >
                <Text
                    numberOfLines={1}
                     style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        fontFamily: "casual",
                        color: "red",
                        maxWidth: "95%",   // stays within the screen
                        textAlign: "left", // ✅ text starts from left
                    }}
                >
                    Welcome
                </Text>
                <Ionicons name="person" size={30} color="red" />


            </View>

            {/* SEARCH INPUT */}

            <TextInput
                placeholder="Search Workout by target muscles"
                style={{
                    height: 50,
                    borderWidth: 4,
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    backgroundColor: "transparent",
                    borderBottomWidth:7
                }}
            />
        </View>
    );
};

export default WelcomeBanner;
