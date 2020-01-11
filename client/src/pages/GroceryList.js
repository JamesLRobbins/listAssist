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
        groceryList: [],
    
      }

      handleClick = (id, ingredients) => {

        let clickedRecipes = this.state.clickedRecipes;
        let groceryList = this.state.groceryList

        //If ID is in clicked Recipes, return

        groceryList.push(ingredients)
        this.setState({groceryList: groceryList})
        clickedRecipes.push(id)
        // this.handleChange();

        console.log("Grocery List: " + groceryList)
        console.log("Clicked Recipes: " + clickedRecipes)

      }

    //   handleChange = (e) => {
    //       this.setState({
    //           groceryList: e.target.value
    //       })
    //       this.props.onChange(e.target.value)
    //   }

     
      
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