import { BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from './contexts/LocaleContext';
import MainLayout from './components/Layout';
import AppRoutes from './routes';

function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </LocaleProvider>
  );
}

export default App;