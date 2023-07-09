import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoggedInContext } from "../utility/LoggedInContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate()
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api";

  const handlePromptChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post("/chat", { prompt });
    setResults(res.data);
    setLoading(false);
  };

   useEffect(()=>{
      if(!isLoggedIn){
        navigate('/login')
      }
   },[])

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      <h2>Search for a job title to get started!</h2>
      {(results || loading) && <div className="result">
        {loading ? <p>Loading...</p> : <p>{results}</p>}
      </div>}
    <div className="search">
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Search Something..."
          type="text"
          value={prompt}
          onChange={handlePromptChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
    </div>
  );
}

export default Dashboard;
