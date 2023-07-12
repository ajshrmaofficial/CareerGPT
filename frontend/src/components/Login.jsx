import { useState, useContext } from "react";
import { LoggedInContext } from "../utility/LoggedInContext.jsx";
import "../css/App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import server from "../utility/axiosDefault.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!username || !password) return setError("Please fill out all fields");
    try {
      const res = await server.post("/api/login", { username, password });
      setError(res.data);
      if(res.data === "Login successful") {
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="loginRegisterDiv" id="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>Username:</p>
        <input type="text" value={username} onChange={handleUsernameChange} required/>

        <p>Password:</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {error && <p className="message">{error}</p>}
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
