import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./Layout/DefaultLayout"
import AuthLayout from "./Layout/AuthLayout"
import { publicRoutes } from './routes';
import { ThemeProvider } from '@/components/theme-provider';


interface RouteConfig {
  path: string;
  component: React.FC; // Giả định rằng các component là các functional components
  layout?: 'authLayout' | undefined; // Cách xác định layout
}
function App() {

  return (
    <ThemeProvider >
      <Router>
        <div >
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
                      <Page />
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
