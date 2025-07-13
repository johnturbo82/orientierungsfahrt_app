/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";

export const Colors = {
    light: {
        text: "#11181C",
        background: "#ffffff",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
        border: "#ffffff",
        section: "#f2f2f7",
        sectionHeader: "#6d6d72",
        contentBackground: "#f2f2f7",
    },
    dark: {
        text: "#ECEDEE",
        background: "#151718",
        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
        border: "#151718",
        section: "#2c2c2e",
        sectionHeader: "#aaaaaa",
        contentBackground: "#1c1c1e",
    },
};
