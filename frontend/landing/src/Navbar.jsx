import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Navbar() {
  const location = useLocation();

  useEffect(() => {
    const navbar = document.getElementById("navbarSupportedContent");
    if (navbar?.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container p-2">
        <a className="navbar-brand" href="#hero">
          <img src="assets/images/finllogo.png" alt="ZenVest" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link" href="#guide">
                Guide
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#signup">
                Signup
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
