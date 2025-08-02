import ListView from "@/components/ListView";
import SwipeView from "@/components/SwipeView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { setDarkMode } from "@/redux/settingsSlice";
import { RootState } from "@/redux/store";
import ViewMode from "@/types/ViewMode";
import { storeData } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const viewMode = useSelector((state: RootState) => state.settings.viewMode);
    const dispatch = useDispatch();
    const theme = useColorScheme() ?? 'light';

    const getVersion = async () => {
        try {
            const version = await fetch("https://orientierungsfahrt.schoettner.dev/version");
            const versionString = await version.text();
            return versionString ? versionString : null;
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateData = async () => {
        // const version = await getVersion();
        // const storedVersion = await getData("version");
        // if (version! > storedVersion!) {
        //     await storeData("version", version!);
        //     await fetchData();
        // } else {
        //     setData(JSON.parse(await getData("tours") || "[]"));
        // }

        await fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await fetch("https://orientierungsfahrt.schoettner.dev/tours");
            const json = await response.json();
            setData(json);
            storeData("tours", JSON.stringify(json));
            for (const tour of json) {
                if (tour.image) {
                    const imageData = await fetchImageData(tour.image);
                    if (imageData) {
                        await storeData(tour.image, imageData[0]);
                        await storeData(`${tour.image}_dark`, imageData[1]);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchImageData = async (name: string) => {
        try {
            const response = await fetch("https://orientierungsfahrt.schoettner.dev/images/" + name);
            const images = await response.json();
            return images
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        updateData();
        dispatch(setDarkMode(theme === 'dark'));
    }, [theme]);

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