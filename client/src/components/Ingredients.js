import React from "react";

function Ingredients(props) {
    return (
        <div>
           <div><ul>
            
                {props.name.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
               
               </ul>
               
            </div>
        </div>
    );
}

export default Ingredients;