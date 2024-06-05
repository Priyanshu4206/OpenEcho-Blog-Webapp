import { Outlet } from 'react-router-dom'
import './App.css'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { login } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loading from './components/Loader/Loading';
import { ToastContainer, toast } from 'react-toastify';
import NewsLetter from './components/NewsLetter';
function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          toast(`Welcome back: ${userData.name}`);
        }
      }).finally(() => setLoading(false));
  }, [dispatch])
  return loading ? <Loading /> : (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ToastContainer />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App
