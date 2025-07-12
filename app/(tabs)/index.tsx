import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVersion = async () => {
        try {
            const version = await fetch('https://orientierungsfahrt.schoettner.dev/version');
            const versionString = await version.text();
            storeData('version', versionString);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('https://orientierungsfahrt.schoettner.dev/tours');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        try {
            const version = await getData('version');
            console.log(version);
            // if (version !== null) {
            //     console.log(version);
            // } else {
            //     await storeData('version', '1.0.0');
            // }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchVersion();
        fetchData();
    }, []);

    const storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error("Error saving key value pair: ", e);
        }
    };

    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue;
        } catch (e) {
            console.error("Error loading key value pair: ", e);
        }
    };

    if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
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
