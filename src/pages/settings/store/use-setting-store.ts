import { create } from 'zustand';

export type SettingsPageTypes = 'view' | 'color-block' | 'danger';

interface SettingsStore {
    activeSettingPage: SettingsPageTypes;
    setActiveSettingPage: (activePage: SettingsPageTypes) => void;
}

export const useSettingStore = create<SettingsStore>((set) => ({
    activeSettingPage: 'view',

    setActiveSettingPage: (activeSettingPage) => {
        set({ activeSettingPage })
    },
}));