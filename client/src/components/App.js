import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "../pages/Login";
import '../../src/App.css';
import Register from "../pages/Register";


function App() {
  return (
    <div class="container-fluid">
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
    </Router>

    
    </div>
  )
}

export default App;
