import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function ListView({ data }: { data: any[] }) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <ThemedView style={styles.item}>
                    <ThemedText>{item['name']}</ThemedText>
                    <ThemedText>{item['description']}</ThemedText>
                </ThemedView>
            )}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
    }
});