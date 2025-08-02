import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error("Error saving key value pair: ", e);
    }
};

export const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue;
    } catch (e) {
        console.error("Error loading key value pair: ", e);
    }
};

export const logAllStorage = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        stores.forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    } catch (e) {
        console.error("Error reading all key-value pairs: ", e);
    }
};