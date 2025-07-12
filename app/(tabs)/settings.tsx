import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, ScrollView } from "react-native";

export default function SettingsScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <ThemedText>Testr</ThemedText>
            </ScrollView>
        </SafeAreaView>
    );
}
