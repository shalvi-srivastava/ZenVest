import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Login to access dashboard", { toastId: "auth-error" });

      const timer = setTimeout(() => {
        window.location.replace("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [token]);

  return (
    <>
      {/*  Toast system always alive */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      {/*  Block dashboard UI only */}
      {token && (
        <>
          <NavBar />
          <Dashboard />
        </>
      )}
    </>
  );
}

export default App;
