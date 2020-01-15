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
                <div className="container">
                    <div className="row">
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
                                        <button type="submit" class="ui blue animated button" onClick={this.handleSubmit}>
                                            <div class="visible content">Already Registered?</div>
                                            <div class="hidden content">Login Now! <Icon name="sign-in" /></div>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <Link
                                            to="/register"
                                            className={window.location.pathname === "/register"}
                                        >

                                            <button class="ui animated blue button">
                                                <div class="visible content">No Account?</div>
                                                <div class="hidden content">Register Now! <Icon name="signup" /></div>
                                            </button>   
                                            
                                    </Link>

                                    
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Login;
