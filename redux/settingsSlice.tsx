import ViewMode from '@/types/ViewMode';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
    viewMode: ViewMode;
    darkMode: boolean;
};

const initialState: SettingsState = {
    viewMode: ViewMode.LIST,
    darkMode: false,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setViewMode(state, action: PayloadAction<ViewMode>) {
            state.viewMode = action.payload;
        },
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload;
        },
    },
});

export const { setViewMode, setDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;