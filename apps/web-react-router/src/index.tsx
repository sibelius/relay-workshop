import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import App from './App';
import { routes } from './routes';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
