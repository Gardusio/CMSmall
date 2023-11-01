import 'bootstrap/dist/css/bootstrap.min.css';
import CMSRoutes from './app/routes/CMSRoutes';
import UserProvider from './app/context/UserProvider';
import PagesProvider from './app/context/PagesProvider';
import ErrorsProvider from './app/context/ErrorsProvider';
import SiteProvider from './app/context/SiteProvider';

function App() {

  return (
    <ErrorsProvider>
      <UserProvider>
        <SiteProvider>
          <PagesProvider>
            <CMSRoutes />
          </PagesProvider>
        </SiteProvider >
      </UserProvider >
    </ErrorsProvider>
  )
}

export default App;
