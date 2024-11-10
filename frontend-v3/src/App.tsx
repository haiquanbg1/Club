import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./Layout/DefaultLayout"
import AuthLayout from "./Layout/AuthLayout"
import { publicRoutes } from './routes';
import { ThemeProvider } from '@/components/theme-provider';
import ClubLayout from './Layout/ClubLayout';

interface RouteConfig {
  path: string;
  component: React.FC; // Giả định rằng các component là các functional components
  layout?: string | undefined
}
function App() {

  return (
    <ThemeProvider >
      <Router>
        <div className='h-screen overflow-hidden scrollbar-hide'>
          <Routes>
            {publicRoutes.map((route: RouteConfig, index: any) => {
              const Layout = route.layout === 'authLayout' ? AuthLayout : DefaultLayout
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      {
                        route.layout === 'clubLayout' &&
                        (
                          <ClubLayout>
                            <Page />
                          </ClubLayout>
                        )
                      }
                      {
                        route.layout !== 'clubLayout' &&
                        (
                          <Page />
                        )
                      }
                    </Layout>}
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>

  )
}

export default App
