import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { Globe, Check } from 'lucide-react';

export default function Settings() {
  const { t } = useTranslation();
  const { currentLocale, setLocale, availableLocales } = useLocale();

  const handleLanguageChange = (languageCode: string) => {
    setLocale(languageCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{t('navigation.settings')}</h1>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {/* Language Settings */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Language / Idioma
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {availableLocales.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`relative flex items-center justify-between px-4 py-3 border rounded-lg ${
                      currentLocale === language.code
                        ? 'border-indigo-600 ring-2 ring-indigo-600'
                        : 'border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {language.name}
                    </span>
                    {currentLocale === language.code && (
                      <Check className="h-5 w-5 text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}