import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

export default function SwipeView({ data }: { data: any[] }) {
    return (
        <PagerView style={styles.pager} initialPage={0} overdrag={true}>
            {data.map((item, idx) => (
                <ThemedView key={idx} style={styles.page}>
                    <ThemedText style={styles.title}>{item['name']}</ThemedText>
                    <ThemedText>{item['description']}</ThemedText>
                </ThemedView>
            ))}
        </PagerView>
    );
}

const styles = StyleSheet.create({
    pager: { flex: 1 },
    page: { justifyContent: 'center', alignItems: 'center', padding: 32 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});