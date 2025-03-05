import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Monitor } from 'lucide-react';

export function ThemeToggle() {
    const { theme, toggleTheme, resetToSystemTheme } = useTheme();
    const hasStoredPreference = localStorage.getItem('theme') !== null;

    return (
        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
                <SwitchPrimitive.Root
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                    className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-offset-2 focus-visible:ring-offset-white
            ${theme === 'dark'
                            ? 'bg-indigo-600 focus-visible:ring-indigo-500'
                            : 'bg-gray-200 focus-visible:ring-gray-500'
                        }
          `}
                >
                    <SwitchPrimitive.Thumb
                        className={`
              pointer-events-none block h-5 w-5 rounded-full
              transform transition-transform bg-white
              ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
            `}
                    />
                    <span className="sr-only">Toggle theme</span>
                </SwitchPrimitive.Root>
                {theme === 'dark' ? (
                    <Moon className="h-4 w-4 text-gray-400" />
                ) : (
                    <Sun className="h-4 w-4 text-gray-600" />
                )}
            </div>
            {hasStoredPreference && (
                <button
                    onClick={resetToSystemTheme}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="Use system theme"
                >
                    <Monitor className="h-4 w-4 text-gray-500" />
                </button>
            )}
        </div>
    );
}