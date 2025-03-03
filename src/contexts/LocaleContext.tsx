import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LocaleContextType {
  currentLocale: string;
  setLocale: (locale: string) => void;
  availableLocales: { code: string; name: string }[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'pt-BR', name: 'Português (Brasil)' }
];

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState(i18n.language);

  useEffect(() => {
    // Load saved locale from localStorage if it exists
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && availableLocales.some(locale => locale.code === savedLocale)) {
      i18n.changeLanguage(savedLocale);
      setCurrentLocale(savedLocale);
    }
  }, [i18n]);

  const setLocale = (locale: string) => {
    i18n.changeLanguage(locale);
    setCurrentLocale(locale);
    localStorage.setItem('locale', locale);
  };

  return (
    <LocaleContext.Provider
      value={{
        currentLocale,
        setLocale,
        availableLocales
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}