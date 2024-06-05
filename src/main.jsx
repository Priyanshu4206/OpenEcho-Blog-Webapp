import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { AddPost, AllPostsPage, EditPost, HomePage, LoginPage, Post, SignupPage } from "./pages";
import Protected from './components/container/AuthLayout.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './pages/ErrorPage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      }
      , {
        path: "/login",
        element:
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
      },
      {
        path: "/signup",
        element:
          <Protected authentication={false}>
            <SignupPage />
          </Protected>
      },
      {
        path: "/all-posts",
        element: <AllPostsPage />
      },
      {
        path: "/add-posts",
        element:
          <Protected authentication>
            <AddPost />
          </Protected>
      },
      {
        path: "/edit-post/:slug",
        element:
          <Protected authentication>
            <EditPost />
          </Protected>
      },
      {
        path: "/post/:slug",
        element: <Post />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
