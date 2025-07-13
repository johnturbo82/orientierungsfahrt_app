import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

const modes = ["Liste", "Blättern"];

export default function ViewModeSettingsScreen() {
    const colorScheme = useColorScheme() ?? "light";
    const theme = Colors[colorScheme];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ThemedView style={[styles.section, { backgroundColor: theme.section }]}>
                {modes.map((mode, idx) => (
                    <TouchableOpacity
                        key={mode}
                        style={[
                            styles.item,
                            { borderColor: theme.border },
                            idx === modes.length - 1 && { borderBottomWidth: 0 }
                        ]}
                    >
                        <ThemedText style={[styles.label, { color: theme.text }]}>{mode}</ThemedText>
                    </TouchableOpacity>
                ))}
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    section: {
        borderRadius: 12,
        margin: 16,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
    },
    label: { fontSize: 16 },
});