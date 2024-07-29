import React from "react";
import { Link } from "react-router-dom";

function Lift(props){
    return(
        <Link to={`/edit/${props.id}`}>
            <div className="lift_container">
                <h3>{props.title}</h3>
                <p>{props.date.split("T")[0]}</p>
            </div>
        </Link>
        
            
        
    )
}

export default Lift;