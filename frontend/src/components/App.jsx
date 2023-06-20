import NavBar from "./NavBar.jsx";
import { Outlet } from "react-router-dom";
import { LoggedInProvider } from "../utility/LoggedInContext.jsx";

function App() {
  return (
    <LoggedInProvider>
      <div className="app">
        <NavBar />
        <Outlet />
      </div>
    </LoggedInProvider>
  );
}

export default App;
