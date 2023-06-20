import { Link } from "react-router-dom";
import "../css/App.css";

const LandingPage = () => {
  return (
    <div className="app-header">
      <h1>CareerGPT</h1>
      <h2>AI Powered Career Guidance</h2>
      <h3>Powered by OpenAI's GPT-3</h3>
      <h3 className="linkH3">
        <Link className="link" to={"/register"}>
          SignUp
        </Link>
      </h3>
    </div>
  );
};

export default LandingPage;
