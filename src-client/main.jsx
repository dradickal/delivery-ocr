import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import DeliveryStatsApp from './App';
import Dashboard from './Dashboard';
import ImageUploadForm from './ImageUploadForm';
import ImageDataForm from './ImageDataForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DeliveryStatsApp />,
    id: "root",
    children: [
      { index: true, element: <Navigate to='/dashboard' replace /> },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/manage-data',
        element: <ImageDataForm />
      },
      {
        path: '/upload',
        element: <ImageUploadForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
);
