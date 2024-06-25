import Navbar from './components/Navbar'
import Content from './components/Content'
import Footer from './components/Footer'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    document.querySelector('html').addEventListener("contextmenu", preventRightClick);
  }, []);

  const preventRightClick = (e) => {
    e.preventDefault();
    toast('Right Click is prohibited for Security Purpose❗', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <Navbar />
      <Content />
      <Footer />
    </>
  )
}

export default App
