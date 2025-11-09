import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function TimerScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{ fontFamily: 'Helvetica', fontSize: 20, marginBottom: 10 }}
        >
          This is Helvetica (iOS only). test screeen for fonts
        </Text>
        <Text style={{ fontFamily: 'Courier', fontSize: 20, marginBottom: 10 }}>
          This is Courier (Monospace).
        </Text>
        <Text
          style={{
            fontFamily: 'Times New Roman',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          This is Times New Roman (Classic Serif).
        </Text>
        <Text
          style={{ fontFamily: 'sans-serif', fontSize: 20, marginBottom: 10 }}
        >
          This is Sans-Serif (Android only).
        </Text>
        <Text style={{ fontFamily: 'serif', fontSize: 20, marginBottom: 10 }}>
          This is Serif (Android only).
        </Text>
        <Text
          style={{ fontFamily: 'monospace', fontSize: 20, marginBottom: 10 }}
        >
          This is Monospace.
        </Text>
        <Text style={{ fontFamily: 'Roboto', fontSize: 20, marginBottom: 10 }}>
          This is Roboto (Default on Android).
        </Text>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          This is the Default Font (System Default).
        </Text>
      </View>
    </ScrollView>
  );
}
