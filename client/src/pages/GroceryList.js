import React, { Component } from "react";
import Logo from "../components/Logo";
import Recipes from "../components/Recipes";
import Ingredients from "../components/Ingredients";


class List extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                            <Logo />
                            <div className="row">
                        <div className="col-md-6">
                            <div className="col-md-12 recipes">
                            <Recipes />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="col-md-12 ingredients">
                            <Ingredients />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default List;