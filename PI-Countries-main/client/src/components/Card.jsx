import React from "react";
import "../Estilos/Card.css"

export default function CharCountry({flag, name, id, continent}){
    return (
        <body>
        <div className="card">
            <div className="head">
            <div className="circle"></div>
            <div className="img">
            <img src={flag} alt="No existe la imagen"/></div>
            </div>
            <div className="description">
            <h3>{name}</h3>
            <h5>Código de país: {id}</h5>
            <h5>Región Continental:</h5>
            <h5>{continent}</h5>
            </div>
            <div className="info">
            <a href={"/home/" + id}>Más Información</a></div>
        </div>
            </body> )
}