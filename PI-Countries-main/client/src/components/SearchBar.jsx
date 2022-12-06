import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../actions";
import "../Estilos/SearchBar.css"
import main from "../Imágenes/lupa.png"
import { Link } from "react-router-dom";



export default function SearchBar(){
const dispatch = useDispatch()
const [name, setName] = useState("")

function handleInput(e){
    e.preventDefault()
    setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getCountriesByName(name))
}

return(
    <div className="searchBar">
        <Link className="link" to = "/activities">Crear actividad</Link>
        <input  type='text' placeholder = "Buscar país..." onChange={(e) => handleInput(e)}/>
        <button type="submit" onClick={(e) => handleSubmit(e)}><img src={`${main}`} alt="Cargando imagen ..."/></button>        
         <hr></hr> 
    </div>
)
}
