import "../css/App.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInContext } from "../utility/LoggedInContext.jsx";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate()

  const logout = () => {
    setIsLoggedIn(false);
    navigate('/')
  };

  return (
    <nav className="app-nav">
      <h1>CareerGPT</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button className='logoutBtn' onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
