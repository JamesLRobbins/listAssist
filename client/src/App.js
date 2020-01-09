import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import "./App.css";
import Register from "./pages/Register";
import List from "./pages/GroceryList";


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)

  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/api/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }


  render() {
    return (
      <div className="container-fluid">
        <Router>
          <Route
            exact path="/"
            render={() =>
              <Login
                updateUser={this.updateUser}
              />}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/grocerylist" component={List} />
        </Router>


      </div>
    )
  }
}

export default App;
