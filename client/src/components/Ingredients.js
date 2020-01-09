import React from "react";

function Ingredients(props) {
    return (
        <div>
          <ul>{props.groceryList}</ul>
        </div>
    );
}

export default Ingredients;