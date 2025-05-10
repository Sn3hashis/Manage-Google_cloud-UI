import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import './index.css';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ComputeEngine from './pages/ComputeEngine';
import CreateVM from './pages/CreateVM';
import Networking from './pages/Networking';
import IAM from './pages/IAM';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'compute',
        element: <ComputeEngine />,
      },
      {
        path: 'compute/create',
        element: <CreateVM />,
      },
      {
        path: 'networking',
        element: <Networking />,
      },
      {
        path: 'iam',
        element: <IAM />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);