import { useState } from "react";
import "../css/App.css";
import { Link } from "react-router-dom";
import server from "../utility/axiosDefault";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(username.length < 3) return setMessage("Username must be at least 3 characters long");
    if(password.length < 8) return setMessage("Password must be at least 8 characters long");
    try {
      const res = await server.post("/api/signup", { username, password });
      setMessage(res.data);
      if(res.data === "User created") setMessage("Account created successfully!");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="loginRegisterDiv" id={"register"}>
      <h1>Register</h1>
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
        {message && <p className="message">{message}</p>}
        <input type="submit" value="Submit" />
      </form>
      <p>
        Already have an account?{" "}
        <Link className="loginRegisterLink" to="/login">
          Login here.
        </Link>
      </p>
    </div>
  );
};

export default Register;
