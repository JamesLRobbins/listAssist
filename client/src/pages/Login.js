import React, { Component } from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
//for routing
import axios from "axios";


class Login extends Component {
    state = {
        username: '',
        password: ''
        //Future implementation
        //confirmPassword: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state);
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log('sign-up-form, username: ');
        console.log(this.state.username);
        //request to server here
        axios.post('/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    console.log('successful signup')
                    this.setState({
                        redirectTo: '/login'
                    })
                } else {
                    console.log('Sign-up error');

                }
            }).catch(error => {
                console.log('Sign up server error: ')
                console.log(error);
            })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Logo />
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
								    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                                </div>
                                <div class="col-md-6">
                                    <Link
                                        to="/register"
                                        className={window.location.pathname === "/register" ? "nav-link active" : "nav-link"}
                                    >
                                        Register
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

export default Login;
