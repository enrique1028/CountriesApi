import React from "react";
import "../Estilos/CardActivities.css"
import foto from "../Imágenes/actividad.gif"

export default function CharActivity({name, difficulty, duration, season, id}){
    return (
            <div className="cardsa">
            <h3>Actividad: {name}</h3>
            <h5>Nivel de dificultad: {difficulty}</h5>
            <h5>Duración: {duration} min</h5>
            <h5>Temporada: {season}</h5>
            <h5>{id}</h5>
            <img className="imgs" src={`${foto}`} alt='main-img' />
        </div>
    )
}