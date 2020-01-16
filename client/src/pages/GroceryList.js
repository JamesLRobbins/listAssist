import React, { Component } from "react";
import Logo from "../components/Logo";
import RecipeList from "../components/Recipes";
import Ingredients from "../components/Ingredients";
import recipes from "../testRecipes.json";
import Wrapper from "../components/Wrapper";
import axios from "axios";

class List extends Component {

    state = {
        recipes,
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
            })

            console.log("id: " + response.data.user.id);

            populateUserRecipes(response.data.user.id);

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
          //TODO
          axios.get("api/user/recipe/id");

      }
    

      handleClick = (id, ingredients) => {

        let clickedRecipes = this.state.clickedRecipes;
        let groceryList = this.state.groceryList
        let allIngredients = this.state.allIngredients
        
        if (clickedRecipes.includes(id)) {
            clickedRecipes.splice(id)
            groceryList.splice(ingredients)

            document.getElementById(id).style.background="none";
            document.getElementById(id).style.color="black";
            document.getElementById(id).style.border="none"
            this.setState({clickedRecipes: [""]})
            this.setState({groceryList: [""]})
            

        } else {

            for (let i = 0; i < ingredients.length; i++) {
                allIngredients.push(ingredients[i])
            }

            this.setState({allIngredients: allIngredients})

            let filteredList = [...new Set(allIngredients)]
            this.setState({filteredList: filteredList})
   
            this.setState({groceryList: filteredList})
            clickedRecipes.push(id)
            document.getElementById(id).style.button="#10white8BF8";
            document.getElementById(id).style.border="inset";
            document.getElementById(id).style.color="white";
            
        }
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
                                        id={recipe.id}
                                        key={recipe.id}
                                        name={recipe.name}
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