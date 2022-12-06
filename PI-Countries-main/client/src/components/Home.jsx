import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries, filterCountriesByContinent, orderByName, orderByPopulation, getActivity, filterByActivity } from "../actions";
import {Link} from "react-router-dom"
import Card from './Card';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../Estilos/Home.css"
import main from "../Imágenes/portada.jpg"

export default function Home (){
    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)
    const allActivities = useSelector ((state) => state.activities)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const iLastCountry = currentPage*countriesPerPage
   
    if(iLastCountry<=10){
       var iFirstCountry = 1;
    } else {
        iFirstCountry = iLastCountry - countriesPerPage
    }
    const currentCountries = allCountries.slice(iFirstCountry-1, iLastCountry-1) 

        const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    useEffect(()=>{
        dispatch(getActivity())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
        setCurrentPage(1);
    }

    function handleSort(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(orderByName(e.target.value));
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortPopulation(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(orderByPopulation(e.target.value));
        setOrden(`Ordenado ${e.target.value}`)
        
    }
    
    function handleFilterCountries(e){
         e.preventDefault();
         dispatch(filterCountriesByContinent(e.target.value));
         setCurrentPage(1);
    }

    function handleActivities(e){
        e.preventDefault();
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1);
   }

    return(
        <div className="div2">
            
            <div className="div">
            <span className="todosPaises">
            <SearchBar/>           
            <button onClick={e=>{handleClick(e)}}>Todos los Países</button>
            </span>
            <span className="continentes">
        <button value='Africa' onClick={e=>{handleFilterCountries(e)}}>África</button>
        <button value='Antarctic' onClick={e=>{handleFilterCountries(e)}}>Antártida</button>
        <button value='Americas' onClick={e=>{handleFilterCountries(e)}}>América</button>
        <button value='Asia' onClick={e=>{handleFilterCountries(e)}}>Asia</button>
        <button value='Europe' onClick={e=>{handleFilterCountries(e)}}>Europa</button>
        <button value='Oceania' onClick={e=>{handleFilterCountries(e)}}>Oceanía</button>
           <hr></hr> 
           </span>
           
           </div>
        <span>
        <select className="select" onChange={e => handleSort(e)} value="default">
            <option value="default">Filtro alfabético</option>
            <option value="asc">A ⇒ Z</option>
            <option value="desc">Z ⇒ A</option>
        </select>
        <select className="select2" onChange={e => handleSortPopulation(e)} value="default">
            <option value="default">Filtro poblacional</option>
            <option value="asc2">Menor ⇒ Mayor</option>
            <option value="desc2">Mayor ⇒ Menor</option>
        </select>
        <select className="select3" onChange={(e)=> handleActivities(e)} value="default">
            <option value="default">Actividades</option>
            <option disabled ={allActivities[0]? false:true} value="todas">Todos los países con actividad creada</option>
            {allActivities.map((act) =>{
                return(
                <option value={act.name} key={act.name}>Países con la actividad: {act.name}</option>
            )})}
        </select>
        <Paginado className="paginado"
        countriesPerPage = {countriesPerPage}
        allCountries = {allCountries.length+1}
        paginado = {paginado}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}/>
        <img className="imgg" src={`${main}`} alt='main-img'/>
        <div className="cards">
            {
            currentCountries?.map((el) =>{
                return (
                <div key={el.id}>
                
                <Card
                name = {el.name}
                flag = {el.flag}
                id = {el.id}
                continent = {el.continent}
                />
                </div>
                )}
                )}
                </div>
        
         
        </span>
        
        <div>
        </div>
        </div>
    )
}