import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "../pages/Login";
import '../../src/App.css';
import Register from "../pages/Register";
import List from "../pages/GroceryList";



class App extends Component {

  state = {
    recipes: ["Fajitas", "Pizza", "Shrimp Scampi"],
    ingredients: ["Steak", "Cheese", "Shrimp", "Butter", "Garlic"]
  }

  render() {
  return (
    <div class="container-fluid">
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/grocerylist" component={List} />
    </Router>

    
    </div>
  )
}
}

export default App;
