import React from "react";
import { View, Text, ScrollView, Platform } from "react-native";

const commonFonts = [
    { name: "System", family: undefined }, // default
    { name: "Sans-Serif (Both)", family: "sans-serif" },
    { name: "Monospace (Both)", family: "monospace" },
];

const iosFonts = [
    { name: "Helvetica", family: "Helvetica" },
    { name: "Helvetica Neue", family: "Helvetica Neue" },
    { name: "Times New Roman", family: "Times New Roman" },
    { name: "Courier", family: "Courier" },
    { name: "Avenir", family: "Avenir" },
    { name: "Avenir Next", family: "Avenir Next" },
    { name: "American Typewriter", family: "American Typewriter" },
    { name: "Georgia", family: "Georgia" },
    { name: "Palatino", family: "Palatino" },
];

const androidFonts = [
    { name: "Roboto (Default)", family: "Roboto" },
    { name: "Sans-Serif Light", family: "sans-serif-light" },
    { name: "Sans-Serif Thin", family: "sans-serif-thin" },
    { name: "Sans-Serif Condensed", family: "sans-serif-condensed" },
    { name: "Condensed Light", family: "sans-serif-condensed-light" },
    { name: "Condensed Medium", family: "sans-serif-condensed-medium" },
    { name: "Casual", family: "casual" },
    { name: "Cursive", family: "cursive" },
    { name: "Serif", family: "serif" },
];

export default function FontPreviewScreen() {
    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 26, marginBottom: 20, fontWeight: "bold" }}>
                Expo System Font Preview
            </Text>

            {/* Common Fonts */}
            <Text style={{ fontSize: 22, marginBottom: 10 }}>Common Fonts</Text>
            {commonFonts.map((i, index) => (
                <Text
                    key={index}
                    style={{
                        fontFamily: i.family,
                        fontSize: 20,
                        marginBottom: 12,
                    }}
                >
                    {i.name}
                </Text>
            ))}

            {/* Platform-specific Fonts */}
            <Text style={{ fontSize: 22, marginVertical: 15 }}>
                {Platform.OS === "ios" ? "iOS System Fonts" : "Android System Fonts"}
            </Text>

            {(Platform.OS === "ios" ? iosFonts : androidFonts).map((i, index) => (
                <Text
                    key={index}
                    style={{
                        fontFamily: i.family,
                        fontSize: 20,
                        marginBottom: 12,
                    }}
                >
                    {i.name}
                </Text>
            ))}
        </ScrollView>
    );
}
