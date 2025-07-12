import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, ScrollView, View, Text, Switch, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function SettingsScreen() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.label}>Dark Mode</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Sprache</Text>
                    <ThemedText>Deutsch</ThemedText>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    label: { fontSize: 16 },
});