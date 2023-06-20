import "../css/App.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../utility/LoggedInContext.jsx";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
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
      </ul>
    </nav>
  );
};

export default NavBar;
