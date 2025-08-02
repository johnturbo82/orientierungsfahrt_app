import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Buffer } from 'buffer';
import { getData } from '@/utils/helper';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function ListItem({ item }: { item: any }) {
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
        <ThemedView style={styles.item}>
            <ThemedView style={styles.textContainer}>
                <ThemedText style={styles.titleline}>{item['name']}</ThemedText>
                <ThemedText>{item['description']}</ThemedText>
            </ThemedView>
            {svgXml && (
                <SvgXml xml={svgXml} width={100} height={100} />
            )}
        </ThemedView>
    );
}

export default function ListView({ data }: { data: any[] }) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ListItem item={item} />}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
    },
    textContainer: {
        flex: 1,
        marginRight: 16,
    },
    titleline: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});