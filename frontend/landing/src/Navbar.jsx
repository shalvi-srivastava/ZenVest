import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container p-2 ">
        <NavLink className="navbar-brand" to="/">
          {/* <img src="assets/images/Zenvest-logo.svg" alt="Zenvest" /> */}
          <img src="assets/images/finllogo.png" alt="Zenvest" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/features">
                Features
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/guide">
                Guide
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/support">
                Support
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa-solid fa-bars"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
