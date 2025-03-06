import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/Layout';
import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider>
      <IntlProvider
        messages={{}}
        locale={navigator.language}
        defaultLocale="en"
      >
        <LocaleProvider>
          <BrowserRouter>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </BrowserRouter>
        </LocaleProvider>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;