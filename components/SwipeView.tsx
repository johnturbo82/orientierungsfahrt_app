import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootState } from '@/redux/store';
import { getData } from '@/utils/helper';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';

function SwipeItem({ item }: { item: any }) {
    const darkMode = useSelector((state: RootState) => state.settings.darkMode);
    const [svgXml, setSvgXml] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const loadSvg = async () => {
            if (item['image']) {
                try {
                    const base64data = await getData((darkMode ? `${item['image']}_dark` : item['image']));
                    if (base64data && typeof base64data === "string") {
                        const xml = Buffer.from(base64data, 'base64').toString('utf-8');
                        if (isMounted) setSvgXml(xml);
                    }
                } catch (e) {
                    console.error("Error decoding SVG:", e);
                }
            }
        };
        loadSvg();
        return () => { isMounted = false; };
    }, [item, darkMode]);

    return (
        <ThemedView style={styles.page}>
            <ThemedText style={styles.title}>{item['name']}</ThemedText>
            <ThemedText>{item['description']}</ThemedText>
            {svgXml && (
                <SvgXml xml={svgXml} width="100%" />
            )}
        </ThemedView>
    );
}

export default function SwipeView({ data }: { data: any[] }) {
    return (
        <PagerView style={styles.pager} initialPage={0} overdrag={true}>
            {data.map((item, idx) => (
                <SwipeItem key={idx} item={item} />
            ))}
        </PagerView>
    );
}

const styles = StyleSheet.create({
    pager: { flex: 1 },
    page: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});