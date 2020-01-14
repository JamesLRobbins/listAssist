import React from "react";
import { Button, Icon } from 'semantic-ui-react'

function recipeList(props) {
   return (
       <div>
           <button id={props.id} class="ui animated button basic black fluid" onClick={() => props.handleClick(props.id, props.ingredients)}>
               <div class="visible content">{props.name}</div>
               <div class="hidden content">{props.name}<Icon name='shop' /></div>
           </button>
       </div>
   )
}
 
export default recipeList;