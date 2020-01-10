import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
//import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            redirectTo: null
        }
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
                //Show home/login page after successful logout
                console.log("redirectTo: slash")
                this.setState({
                    redirectTo: "/"
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {

            return (
                <div>

                    <header className="navbar App-header" id="nav-container">
                        <div className="col-4" >
                            {loggedIn ? (
                                <section id="logout-link" className="navbar-section">
                                    <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                        <span className="text-secondary">logout</span></Link>

                                </section>
                            ) : (
                                    <section className="navbar-section">
                                    </section>
                                )}
                        </div>
                    </header>
                </div>

            );
        }

    }
}

export default Navbar