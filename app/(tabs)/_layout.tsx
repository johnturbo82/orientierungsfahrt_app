import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ViewMode from '@/types/ViewMode';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const viewMode = useSelector((state: RootState) => state.settings.viewMode);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Orientierung',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name={(viewMode === ViewMode.LIST) ? "arrow.up.and.down" : "arrow.left.and.right"} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Einstellungen',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
                }}
            />
        </Tabs>
    );
}
