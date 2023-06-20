import { useState } from "react";
import "../css/App.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Please enter a username and password");
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setMessage("Account created successfully!");
    // alert(`Username: ${username} Password: ${password}`);
  };

  return (
    <div className="loginRegisterDiv" id={"register"}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <p>Username:</p>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <p>Password:</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <p className="message">{message}</p>
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
