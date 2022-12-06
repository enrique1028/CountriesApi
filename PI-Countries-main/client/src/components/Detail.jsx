import React, {useEffect} from "react";
import {Link} from 'react-router-dom'
import {getDetails } from '../actions/index'
import { useDispatch, useSelector } from "react-redux";
import CardActivity from './CardActivities';
import "../Estilos/Detail.css"



export default function Detail(props){
  
    const dispatch = useDispatch()
    const myCountry = useSelector((state) => state.details)
    const id = props.match.params.id
    useEffect(()=>{
        dispatch(getDetails(id))
    }, [dispatch,id])
    
    return(
        <div>
            <Link to= '/home'>
                <button className="button">Volver a Home</button>
            </Link>
            {
                myCountry.id?
                <div className="detail">
                    <div>
                    <h1>{myCountry.name}</h1>
                    <img src={myCountry.flag} alt="No existe la imagen" width="500px" height="300px"/>
                    <h2>Código de país: {myCountry.id}</h2>
                    <h2>Continente: {myCountry.region}</h2>
                    <h2>Capital: {myCountry.capital}</h2>
                    <h2>Subregión: {myCountry.subregion}</h2>
                    <h2>Área: {myCountry.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} km²</h2>
                    <h2>{myCountry.name} tiene {myCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} habitantes</h2>
                    </div>
                    <div>
                    <h3>{
                    myCountry.activities.map((p)=> {
                    return(
                    <div className="cardss" key={p.id}>
                    <CardActivity
                    name = {p.name}
                    difficulty = {p.difficulty}
                    duration = {p.duration}
                    season = {p.season}
                    />
                    
                    </div>
                    )
                })}</h3>
                </div>
                </div>: <p>Loading...</p>
            }
        </div>
    )
}