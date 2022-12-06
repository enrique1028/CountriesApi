import React from "react";
import {Link} from "react-router-dom"
import landing from "../Imágenes/landing.gif"
import "../Estilos/LandingPage.css"


export default function LandingPage(){
    return(
        <div className="landing">
            <Link to = '/home'><button>HOME</button></Link>
            <img src={`${landing}`} alt="loading img"/>
            <h1>Toda la información de tus países favoritos y sus actividades turísticas</h1>
            
        </div>
    )
}