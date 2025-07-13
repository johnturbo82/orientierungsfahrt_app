import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

const pages = [
    { title: 'Seite 1', content: 'Das ist die erste Seite.' },
    { title: 'Seite 2', content: 'Das ist die zweite Seite.' },
    { title: 'Seite 3', content: 'Das ist die dritte Seite.' },
];

let SwiperComponent: React.FC;
const NativeSwiper: React.FC = () => (
    <PagerView
        style={styles.pager}
        initialPage={0}
        overdrag={true}>
        {pages.map((page, idx) => (
            <ThemedView key={idx} style={styles.page}>
                <ThemedText style={styles.title}>{page.title}</ThemedText>
                <ThemedText>{page.content}</ThemedText>
            </ThemedView>
        ))}
    </PagerView>
);
NativeSwiper.displayName = "SwiperComponent";
SwiperComponent = NativeSwiper;

export default SwiperComponent;

const styles = StyleSheet.create({
    pager: { flex: 1 },
    page: { justifyContent: 'center', alignItems: 'center', padding: 32 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});