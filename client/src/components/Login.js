import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react'
//for routing
import axios from "axios";


class Login extends Component {
    state = {
        username: '',
        password: '',
        redirectTo: null
        //Future implementation
        //confirmPassword: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("state in Login.js " + this.state);
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log('login-form, username: ');
        console.log(this.state.username);
        //request to server here
        axios.post('/api/user/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log("login response: ");
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/grocerylist'
                    })
                }
            }).catch(error => {
                console.log('Login error: ')
                console.log(error);
            })
    }


    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
<div>

  <div className="order-12 login-clean">
    <div className="row">
      <div className="col">
        <nav className="navbar navbar-light navbar-expand-md shadow-lg navigation-clean">
          <div className="container">
            <button
              data-toggle="collapse"
              className="navbar-toggler"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    data-bs-hover-animate="pulse"
                    href="#"
                  />
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    data-bs-hover-animate="pulse"
                    href="#"
                  >
                   
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                <Link
                                            to="/register"
                                            className={window.location.pathname === "/register"}
                                        >
                                            <button className="ui animated blue button">
                                                <div className="visible content">No Account?</div>
                                                <div className="hidden content">Register Now! <Icon name="signup" /></div>
                                            </button>
                                    </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div className="container pulse animated" id="con-log">
      <img
        className="shadow-none list-a"
        data-aos="fade-up"
        data-aos-duration={2900}
        data-aos-delay={1100}
        src="assets/img/LA-text.png"
      />
      <form
        className="shadow-lg order-12"
        data-aos="fade-down"
        data-aos-duration={900}
        data-aos-delay={150}
        method="post"
        style={{
          filter: "blur(0px)",
          backgroundColor: "rgba(11,67,152,0.04)",
          color: "#0080ff"
        }}
      >
        <h2 className="sr-only">Login Form</h2>
        <img
          data-aos="fade-down"
          data-aos-duration={650}
          data-aos-delay={550}
          id="logo_loggin"
          className="logo_log"
          src="assets/img/LA-logo.png"
        />
        <div className="form-group">
              <input type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="username"
                placeholder="example@email.com"
                value={this.state.username}
                onChange={this.handleChange}
            data-aos-duration={300}
            data-aos-delay={750}
           
            placeholder="Email"
            style={{ filter: "blur(0px)" }}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            data-aos="zoom-in"
            data-aos-duration={300}
            data-aos-delay={900}
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}

          />
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary btn-block"
            data-aos="zoom-in"
            data-aos-duration={300}
            data-aos-delay={1100}
            type="submit" onClick={this.handleSubmit}
            style={{ backgroundColor: "rgb(81,175,223)" }}
          > Log in
          
          </button>
          
          
        </div>
      </form>
    </div>
   
  </div>
</div>
            )
        }
    }
}
{/* <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="username"
                placeholder="example@email.com"
              
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
           
            />

//
// ----- REGISTER ------------------------------- */}
{/* <div className="row">
<div className="col-md-12">
    <Logo />
    <form>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="username"
                placeholder="example@email.com"
                value={this.state.username}
                onChange={this.handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
            />
        </div>
        <div className="row">
            <div className="col-md-6">
                <button type="submit" className="ui blue animated button" onClick={this.handleSubmit}>
                    <div className="visible content">Already Registered?</div>
                    <div className="hidden content">Login Now! <Icon name="sign-in" /></div>
                </button>
            </div>
            <div className="col-md-6">
                <Link
                    to="/register"
                    className={window.location.pathname === "/register"}
                >
                    <button className="ui animated blue button">
                        <div className="visible content">No Account?</div>
                        <div className="hidden content">Register Now! <Icon name="signup" /></div>
                    </button>
            </Link>
            </div>
        </div>
    </form>
</div>
</div>
</div> */}

export default Login;
