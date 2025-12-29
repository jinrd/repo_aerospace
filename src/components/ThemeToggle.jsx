import { useStore } from "@nanostores/react";
import { theme, toggleTheme } from "../stores/themeStores";

export default function ThemeToggle() {
    const currentTheme = useStore(theme);

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            aria-label="Toggle Dark Mode"
            >
            {currentTheme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}