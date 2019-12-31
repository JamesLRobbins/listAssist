import React, { Component } from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";


class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Logo />
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            <div class="col-md-6">
                                <Link 
                                    to ="/register"
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
