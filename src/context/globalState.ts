import {create} from 'zustand';

interface AppState {
    locale: 'en' | 'es' | string;
    setLocale: (locale: 'en' | 'es') => void;
}

interface UserInfo {
    user: any;
    setUser: (user: any) => void;
}

interface UserPoints {
    points: number;
    setPoints: (points: number) => void;
}

const getBrowserLocale = (): 'en' | 'es' => {
    const language =  navigator.language;
    const shortLang = language.split('-')[0];

    return ['en', 'es'].includes(shortLang) ? (shortLang as 'en' | 'es') : 'en';
};

export const useStore = create<AppState>((set) => ({
    locale: getBrowserLocale(),
    setLocale: (locale: string) => {
        localStorage.setItem('locale', locale);
        set({locale});
    },
}));

export const useUserStore = create<UserInfo>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export const usePointsStore = create<UserPoints>((set) => ({
    points: 0,
    setPoints: (points) => set({ points }),
}));

