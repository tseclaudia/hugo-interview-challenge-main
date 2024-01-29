import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Application from './Application.tsx';
import CreateApplication from './CreateApplication.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateApplication/>,
  },
  {
    path: "/:id",
    element: <Application/>,
    loader: async ({ params }) => {
      const response = await fetch(`http://localhost:8000/applications/${params.id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${params.id}`);
      }
      return response;
    },
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)