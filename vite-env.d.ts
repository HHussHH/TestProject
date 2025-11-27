/// <reference types="vite-plugin-svgr/client" />

declare global {
    interface Window {
        Telegram?: {
            WebApp: {
                expand: () => void;
                disableVerticalSwipes: () => void;
                lockOrientation: () => void;
                setHeaderColor: (color: string) => void;
                setBackgroundColor: (color: string) => void;
                setBottomBarColor: (color: string) => void;
            };
        };
    }
}

export {};