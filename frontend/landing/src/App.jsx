import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Navbar />
      <Home />
    </>
  );
}

export default App;
