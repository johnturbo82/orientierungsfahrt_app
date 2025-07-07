import { ThemedText } from '@/components/ThemedText';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

const App = () => {
    const [daten, setDaten] = useState([]);
    const [laden, setLaden] = useState(true);

    useEffect(() => {
        fetch('https://orientierungsfahrt.schoettner.dev')
            .then(response => response.json())
            .then(json => {
                setDaten(json);
                setLaden(false);
            })
            .catch(error => {
                console.error(error);
                setLaden(false);
            });
    }, []);

    if (laden) return <ActivityIndicator style={{ marginTop: 50 }} />;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={daten}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                    <View style={styles.item}>
                        <ThemedText>{item['name']}</ThemedText>
                        <ThemedText>{item['description']}</ThemedText>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        color: '#333',
    }
});

export default App;
