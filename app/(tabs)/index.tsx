import ListView from '@/components/ListView';
import SwipeView from '@/components/SwipeView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootState } from '@/redux/store';
import ViewMode from '@/types/ViewMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const viewMode = useSelector((state: RootState) => state.settings.viewMode);

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
            {viewMode === ViewMode.LIST ? (
                <ListView data={data} />
            ) : (
                <SwipeView data={data} />
            )}
        </SafeAreaView>
    );
};

export default App;
