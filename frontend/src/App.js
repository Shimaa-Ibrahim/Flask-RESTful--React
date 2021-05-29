import { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import TheTable from "./components/TheTable";

function App() {
  const [token, setToken] = useState(null);

  const handleSubmit = recievedToken => {
    setToken(recievedToken);
    console.log("token: ", recievedToken);
  };
  return (
    <Router>
      <div className="App">
        <Route path="/" exact>
          {token ? (
            <TheTable handleSubmit={handleSubmit} token={token} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login">
          <Login handleSubmit={handleSubmit} token={token} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
