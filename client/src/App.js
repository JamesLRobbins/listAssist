import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./App.css";
import Register from "./pages/Register";
import List from "./pages/GroceryList";

{/* import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"> */}
// import "assets/css/Footer-Basic.css";
// {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"> */}
// import "https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.css";
// import "assets/css/Navigation-Clean.css";
// import "assets/css/Registration-Form-with-Photo.css";



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
    //Get the user that is currently logged in
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
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
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
