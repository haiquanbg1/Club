import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./Layout/DefaultLayout"
import AuthLayout from "./Layout/AuthLayout"
import { publicRoutes } from './routes';
import { ThemeProvider } from '@/components/theme-provider';
import ClubLayout from './Layout/ClubLayout';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

interface RouteConfig {
  path: string;
  component: React.FC; // Giả định rằng các component là các functional components
  layout?: string | undefined
}
function App() {

  const socket = io('http://localhost:8080');

  function connectSocket() {
    socket.on('connect', () => {
      // console.log(socket);

      socket.emit('message', 'Hello from vite-react');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  
    // Lắng nghe các sự kiện khác từ máy chủ nếu cần
    socket.on('message', (msg) => {
      console.log('Message from server:', msg);
    });

    socket.on('on-chat', (msg) => {
      console.log(msg);
    })
  }


  useEffect(() => {
    connectSocket();
  }, []);


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
