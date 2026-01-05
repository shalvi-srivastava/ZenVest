import { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import Guide from "./components/Guide/Guide";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

const Home = () => {
  useEffect(() => {
    const clearHash = () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", "/");
      }
    };

    window.addEventListener("hashchange", clearHash);

    return () => {
      window.removeEventListener("hashchange", clearHash);
    };
  }, []);

  const [authMode, setAuthMode] = useState("signup");
  const scrollToSignup = () => {
    setAuthMode("signup");
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      data-bs-spy="scroll"
      data-bs-target=".navbar"
      data-bs-offset="100"
      tabIndex="0"
    >
      <section id="hero">
        <Hero onCTAclick={scrollToSignup} />
      </section>

      <section id="guide">
        <Guide onCTAclick={scrollToSignup} />
      </section>

      <section id="signup">
        {authMode === "signup" ? (
          <Signup onSwitch={() => setAuthMode("login")} />
        ) : (
          <Login onSwitch={() => setAuthMode("signup")} />
        )}
      </section>
    </div>
  );
};

export default Home;
