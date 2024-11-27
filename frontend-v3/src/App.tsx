import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./Layout/DefaultLayout"
import AuthLayout from "./Layout/AuthLayout"
import { publicRoutes } from './routes';
import { ThemeProvider } from '@/components/theme-provider';
import ClubLayout from './Layout/ClubLayout';
import NotFound from './Pages/NotFound';
import AuthGuard from './Middleware/Auth/AuthGuard';
import { isAuthenticated } from './Middleware/Auth/authUtils';
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
              if (route.path == 'register' || route.path == 'login') {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page></Page>
                      </Layout>
                    }
                  />
                )
              }
              else {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <AuthGuard isAuthenticated={isAuthenticated()} redirectTo="/login">
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
                        </Layout>
                      </AuthGuard>
                    }
                  />
                );
              }
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router >
    </ThemeProvider >

  )
}

export default App
