import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import ViewMode from "@/types/ViewMode";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Switch, TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "@/redux/settingsSlice";

export default function SettingsScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";
    const theme = Colors[colorScheme];
    const dispatch = useDispatch();
    const viewMode = useSelector((state: RootState) => state.settings.viewMode);

    const items = [
        {
            key: "viewmode",
            content: (
                <>
                    <ThemedText style={[styles.label, { color: theme.text }]}>Bordbuchansicht</ThemedText>
                    <ThemedText style={{ color: theme.text }}>
                        {(viewMode === ViewMode.LIST) ? "Liste" : "Blättern"}
                    </ThemedText>
                </>
            ),
            onPress: () => router.push("/settings/viewmode"),
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={styles.container}>
                <ThemedText style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Darstellung</ThemedText>
                <ThemedView style={[styles.section, { backgroundColor: theme.section }]}>
                    {items.map((item, idx) => (
                        <TouchableOpacity
                            key={item.key}
                            style={[
                                styles.item,
                                { borderColor: theme.border },
                                idx === items.length - 1 && { borderBottomWidth: 0 }
                            ]}
                            onPress={item.onPress}
                            activeOpacity={item.onPress ? 0.7 : 1}
                        >
                            {item.content}
                        </TouchableOpacity>
                    ))}
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { paddingVertical: 24 },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontSize: 13,
        fontWeight: "600",
    },
    section: {
        borderRadius: 12,
        marginHorizontal: 12,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        overflow: "hidden",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    label: { fontSize: 16 },
});