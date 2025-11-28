import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const localUser = localStorage.getItem("user");
  const user = localUser ? JSON.parse(localUser) : null;
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-semibold text-white" to="/home">
          Comfort Travels
        </Link>

        {/* Toggler (mobile menu button) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Nav Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/admin/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/trips">
                Trips
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/assign-trip">
                AssignTrip
              </Link>
            </li>
          </ul>

          {/* User Info */}
          {user?.name && (
            <div
              onClick={()=> navigate('/admin/profile')}
              className="d-flex align-items-center bg-white rounded px-2 py-1"
              title="Profile"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                color: "var(--primary-color)",
                cursor: 'pointer'
              }}
            >
              <i
                className="bi bi-person fw-semibold me-2"
                style={{ color: "var(--primary-color)" }}
              ></i>
              <span className="fw-semibold">{user.name}!</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
