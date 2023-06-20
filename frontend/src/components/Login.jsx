import { useState, useContext } from "react";
import { LoggedInContext } from "../utility/LoggedInContext.jsx";
import "../css/App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    // alert(`Username: ${username} Password: ${password}`);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div className="loginRegisterDiv" id="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>Username:</p>
        <input type="text" value={username} onChange={handleUsernameChange} />

        <p>Password:</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Submit" />
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="loginRegisterLink" to={"/register"}>
          Register here.
        </Link>
      </p>
    </div>
  );
}

export default Login;
