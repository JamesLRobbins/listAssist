import React, { Component } from "react";
import Logo from "../components/Logo";
import RecipeList from "../components/Recipes";
import Ingredients from "../components/Ingredients";
//import recipes from "../testRecipes.json";
import Wrapper from "../components/Wrapper";
import axios from "axios";

class List extends Component {

    state = {
        recipes: [],
        clickedRecipes: [],
        allIngredients: [],
        groceryList: [],
        loggedIn: false,
        username: null
    }

    componentDidMount() {
        //Get the user that is currently logged in
        this.getUser()
    }

    getUser() {
        axios.get('/api/user/').then(response => {
            console.log('Grocery page get user response: ')
            console.log(response.data)
            if (response.data.user) {
                console.log('Get User: There is a user saved in the server session: ');
                console.log(response.data.user.username);

                this.setState({
                    loggedIn: true,
                    username: response.data.user.username
                });

                console.log("id in GroceryList.js getUser(): " + response.data.user._id);

                this.populateUserRecipes(response.data.user._id);

            } else {
                console.log('Get user: no user');
                this.setState({
                    loggedIn: false,
                    username: null
                })
            }
        })
    }

    populateUserRecipes(id) {
        //Send the user id to get the recipes saved for that user
        console.log("id in populateUserRecipes call is: " + id);

        //Get the user and their recipes from the db
        axios.get("/api/user/recipe/" + id).then(
            res => {
                this.setState({

                    recipes: res.data.recipes
                });
                //console.log("res in GroceryList.js populateUserRecipes is: " + JSON.stringify(res.data.recipes));
            }
        ).catch(err => console.log(err));

    }

    handleClick = (id, ingredients) => {

        console.log("Ingredients clicked are: " + ingredients);
        //console.log("this.state.recipes is an array of objects: " + this.state.recipes);

        let clickedRecipes = this.state.clickedRecipes;
        let groceryList = this.state.groceryList
        let allIngredients = this.state.allIngredients

        if (clickedRecipes.includes(id)) {
            console.log("clickedRecipes before: " + clickedRecipes);

            const isID = (element) => element === id;
            //console.log("index to remove is: " + (clickedRecipes.findIndex(isID)));
            let indexToRemove = clickedRecipes.findIndex(isID);

            //Splice out the 1 recipe that was clicked by using its index
            clickedRecipes.splice(indexToRemove, 1);        //Brad removed id

            console.log("clickedRecipes after splice: " + clickedRecipes);

            //Loop through the ingredients finding the index in the groceryList array 
            // where the value of it matches the ingredient. Then splice
            // it out of the grocery list.

            //Get a temporary array from the titles in clickedRecipes
            let onlyActiveIngredientsArr = this.getArrayFromRecipes(clickedRecipes);

            console.log("Only ingredients: " + onlyActiveIngredientsArr);
            console.log("All ingredients before filter: " + allIngredients);

            let filteredList2 = [...new Set(onlyActiveIngredientsArr)];

            //let ingredIndexToRemove = 

            //groceryList.splice(ingredIndexToRemove, 1);
            /* 
                        for (let k = 0; k < ingredients.length; k++) {
                            //TODO: if ingredients[k] is in a clicked list ingredient then keep it 
                            for (let h = 0; h < this.state.recipes.length; h++) {
                                // if this.state.recipes[h].title is in the clicked lists then
                            let matchingGListid = groceryList.indexOf(ingredients[k]);
                            groceryList.splice(matchingGListid, 1);
            
                            }     
                        }
                        
             */
            //console.log("matchingGlist id is: " + matchingGListid);

            document.getElementById(id).style.background = "none";
            document.getElementById(id).style.color = "black";
            document.getElementById(id).style.border = "none"
            this.setState({ clickedRecipes: clickedRecipes })  //"" removed by Brad
            this.setState({ groceryList: filteredList2 })     //"" removed by Brad,grecery list needs to be set


        } else {

            for (let i = 0; i < ingredients.length; i++) {
                allIngredients.push(ingredients[i])
            }

            this.setState({ allIngredients: allIngredients })

            let filteredList = [...new Set(allIngredients)]
            this.setState({ filteredList: filteredList })

            this.setState({ groceryList: filteredList })
            clickedRecipes.push(id)
            document.getElementById(id).style.button = "#10white8BF8";
            document.getElementById(id).style.border = "inset";
            document.getElementById(id).style.color = "white";

        }
    }

    getArrayFromRecipes = (clickedRecipeTitles) => {

        console.log("Recipe titles to extract ingredients: " + clickedRecipeTitles);

        let arr = [];

        for (let i = 0; i < clickedRecipeTitles.length; i++) {
            for (let j = 0; j < this.state.recipes.length; j++) {
                //compare titles with all user recipes
                if (clickedRecipeTitles[i] === this.state.recipes[j].title) {
                    //if titles matches then add ingredienst array to array to return
                    for (let k = 0; k < this.state.recipes[j].ingredients.length; k++) {
                        arr.push(this.state.recipes[j].ingredients[k]);
                    }
                    
                }
            }
        }

        return arr;

    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Logo />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-12 recipes">
                                    <Wrapper>
                                        <h1>Recipes</h1>
                                        {this.state.recipes.map(recipe => (
                                            <RecipeList
                                                id={recipe.title}    //Changed .id to .title
                                                key={recipe.title}   //Changed .id to .title
                                                name={recipe.title}  //Changed .name to .title to match db
                                                ingredients={recipe.ingredients}
                                                handleClick={this.handleClick}

                                            />
                                        ))}
                                    </Wrapper>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="col-md-12 ingredients">
                                    <h1>Grocery List</h1>
                                    <Wrapper>
                                        {this.state.groceryList.map((ingredient, index) => (
                                            <Ingredients
                                                key={index}
                                                name={ingredient}
                                            />

                                        ))}


                                    </Wrapper>
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