import React, { Component } from "react";
import Logo from "../components/Logo";
import RecipeList from "../components/Recipes";
import Ingredients from "../components/Ingredients";
import recipes from "../testRecipes.json";
import Wrapper from "../components/Wrapper";


class List extends Component {

    state = {
        recipes,
        clickedRecipes: [],
        allIngredients: [],
        filteredList: [],
        groceryList: [],
    
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
            this.setState({clickedRecipes: clickedRecipes})
            

        } else {
            // allIngredients.push(ingredients) 

            for (let i = 0; i < ingredients.length; i++) {
                allIngredients.push(ingredients[i])
            }

            this.setState({allIngredients: allIngredients})
            console.log('All Ingredients: ' + allIngredients)
            console.log("line 39")
            console.log(allIngredients)

            let filteredList = [...new Set(allIngredients)]
            this.setState({filteredList: filteredList})
            console.log("Filtered list: " + filteredList)

            // groceryList.push(filteredList);    
            this.setState({groceryList: filteredList})
            clickedRecipes.push(id)
            document.getElementById(id).style.background="blue";
            document.getElementById(id).style.border="solid";
            document.getElementById(id).style.color="white";
            
        }
    
        console.log("Grocery List: " + groceryList)
        console.log("Clicked Recipes: " + clickedRecipes)

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
                                        {this.state.filteredList.map((ingredient, index) => (
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