import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import routes from './constants/routes.js';
import Home from './pages/Home.jsx';
import ErrorBoundary from './components/error/ErrorBoundary.jsx';
import Login from './pages/Login.jsx';


const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<Home />} path={routes.home} errorElement={<ErrorBoundary />} />,
    <Route
      element={<Login />}
      path={routes.login}
      errorElement={<ErrorBoundary />}
    />,
   
  ])
);

function App() {
  return <RouterProvider router={router} />;
}


export default App;