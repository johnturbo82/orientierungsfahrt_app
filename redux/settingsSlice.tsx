import ViewMode from '@/types/ViewMode';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
    viewMode: ViewMode;
};

const initialState: SettingsState = {
    viewMode: ViewMode.LIST,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setViewMode(state, action: PayloadAction<ViewMode>) {
            state.viewMode = action.payload;
        },
    },
});

export const { setViewMode } = settingsSlice.actions;
export default settingsSlice.reducer;