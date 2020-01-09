import React from "react";

function recipeList(props) {
    return (
        <div>
            <div id={props.id} onClick={() => props.handleClick(props.id, props.ingredients)}>{props.name}</div>
        </div>
    )
}

export default recipeList;