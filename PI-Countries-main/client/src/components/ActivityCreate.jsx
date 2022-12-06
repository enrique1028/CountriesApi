import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom'
import {postActivities, getCountries } from '../actions/index'
import { useDispatch, useSelector } from "react-redux";
import "../Estilos/ActivityCreate.css"



function validate(input){
   let error ={}; 
   
    if(!input.name){
        error.name = '😱😱 No olvides ingresar la actividad 🡩 🡩'
    } else if (input.difficulty< 1 || input.difficulty>5){
        error.difficulty = '😱😱 El nivel de dificultad debe estar entre 1 y 5 🡩 🡩'
    } else if(!Number(input.duration)|| input.duration <1){
        error.duration = '😱😱 Agrega un número positivo 🡩 🡩'
    } else if(input.season.length === 0){
        error.season = '😱😱 Recuerda que debes agregar la temporada 🡩 🡩'
    } else if(!input.id[0]){
        error.id = '😱😱 Debes agregar por lo menos 1 país 🡩 🡩'
    }
    
    return error;
};

export default function ActivityCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const allCountries = useSelector((state) => state.countries)
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        id: [],
        name: "",
        difficulty: "",
        duration: "",
        season: "",
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
       setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelectMultiple(e){
           if(input.id.includes(e.target.value)){
            return alert('El País ya fue escogido anteriormente')
        } if(input.id.length === 10){
            return alert('No puedes agregar más países')
        } else {
        setInput({
            ...input,
            id: [...input.id, e.target.value]
        })}
        setError(validate({
            ...input,
            id: [...input.id, e.target.value]
        }));
     
    }
    

    function handleSelect(e){
       
        setInput({
            ...input,
            season: e.target.value
        })
        setError(validate({
            ...input,
            season : e.target.value
        }));
    }
    function handleDelete(e) {
        setInput({
            ...input,
            id: input.id.filter(c => c !== e)
        })
        setError(validate({
            ...input,
            id: input.id.filter(c => c !== e)
        }));
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postActivities(input))
        alert('Actividad Creada!')
        setInput({
            id: [],
            name: "",
            difficulty: null,
            duration: null,
            season: "",
        })
        history.push('/home')
    }

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    
   return(
    <div className="content">
        <Link to = '/home'><button>...ir a Home</button></Link>
        <h1>Crear Actividad</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Actividad</label>
                <input
                type="text"
                value= {input.name}
                name = "name"
                onChange={(e) => handleChange(e)}
                />
                {error.name && (
                    <p>{error.name}</p>
                )}
            </div>
            <div>
                <label>Dificultad</label>
                <input
                type="number"
                value= {input.difficulty}
                name = "difficulty"
                onChange={(e) => handleChange(e)}
                />
                {error.difficulty && (
                    <p>{error.difficulty}</p>
                )}
                </div>
                <div>
                <label>Duración</label>
                <input
                type= "number"
                value= {input.duration}
                name = "duration"
                onChange={(e) => handleChange(e)}
                />
                {error.duration && (
                    <p>{error.duration}</p>
                )}
                </div><div>
                <label>Temporada</label>
                    <select onChange={(e) => handleSelect(e)} value="default">
                        <option value="default">Escoge la temporada</option>
                        <option value = "Verano">Verano</option>
                        <option value = "Otoño">Otoño</option>
                        <option value = "Invierno">Invierno</option>
                        <option value = "Primavera">Primavera</option>
                    </select>
                    <ul>{input.season}</ul>
                {error.season && (
                    <p>{error.season}</p>
                )}
                </div><div className="block">
                <label >País(es)
                <select onChange ={(e) => handleSelectMultiple(e)} value="default">
                    <option value="default">Selecciona el país que desees</option>
                    {allCountries.map((country) =>(
                       <option value={country.id} key={country.id}>{country.name}</option>
                    ))}
                </select>
                </label>
                {error.id && (
                    <p>{error.id}</p>
                )}
                <ul >{input.id.map(el => 
                    <span>
                    <button disabled ><img src={allCountries.find(p=>p.id===el).flag} alt="Cuntry.img" width="140px" height="100px"/></button>
                    <div onClick={() => handleDelete(el)} type="button">X</div>
                    </span> )}</ul>
            </div>
            <button className="block" type='submit' disabled = {error.name ||error.difficulty || error.duration || error.id || error.season || !input.id[0] ? true : false}>Crear actividad</button>
        <p></p>
        </form>
    </div>
   )
}