import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg  border-bottom">
      <div className="container p-2">
        <NavLink className="navbar-brand" to="/">
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

        <div className="collapse navbar-collapse" id="zenvestNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/orders">
                Orders
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/holdings">
                Holdings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/positions">
                Positions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/funds">
                Funds
              </NavLink>
            </li>
          </ul>

          {/* Right: Profile dropdown */}
          <div className="dropdown" style={{ marginLeft: "2rem" }}>
            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32 }}
              >
                ZU
              </div>
              <span className="small">USERID</span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li className="dropdown-item">Profile</li>
              <li className="dropdown-item">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
