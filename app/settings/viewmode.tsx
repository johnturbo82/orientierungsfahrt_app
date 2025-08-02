import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import ViewMode from "@/types/ViewMode";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setViewMode } from "../../redux/settingsSlice";
import { RootState } from "../../redux/store";
import { useRouter } from "expo-router";

const modes = [
    { value: ViewMode.LIST, label: "Liste" },
    { value: ViewMode.SWIPE, label: "Blättern" },
];

export default function ViewModeSettingsScreen() {
    const colorScheme = useColorScheme() ?? "light";
    const theme = Colors[colorScheme];
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.settings.viewMode);
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={styles.container}>
                <ThemedView style={[styles.section, { backgroundColor: theme.section }]}>
                    {modes.map((mode, idx) => (
                        <TouchableOpacity
                            key={mode.value}
                            style={[
                                styles.item,
                                { borderColor: theme.border },
                                idx === modes.length - 1 && { borderBottomWidth: 0 }
                            ]}
                            onPress={() => {
                                dispatch(setViewMode(mode.value));
                                router.back();
                            }}
                            activeOpacity={0.7}
                        >
                            <ThemedText style={[styles.label, { color: theme.text }]}>{mode.label}</ThemedText>
                            {selected === mode.value && (
                                <ThemedText style={{ color: theme.text, marginLeft: 8 }}>✓</ThemedText>
                            )}
                        </TouchableOpacity>
                    ))}
                </ThemedView>
                <ThemedText style={[styles.description, { color: theme.sectionHeader }]}>
                    Wähle die gewünschte Ansicht für das Bordbuch. „Liste“ zeigt alle Einträge untereinander, „Blättern“ ermöglicht das Durchblättern wie in einem Buch.
                </ThemedText>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { paddingVertical: 24 },
    section: {
        borderRadius: 12,
        margin: 16,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: { fontSize: 16 },
    description: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 14,
        lineHeight: 18,
    },
});