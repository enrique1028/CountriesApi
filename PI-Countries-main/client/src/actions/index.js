import axios from "axios";



export function getCountries(){
    return async function(dispatch){
        var countries = await axios.get("http://localhost:3001/countries");
        return dispatch({type: "GET_COUNTRIES", payload: countries.data})
    }

}

export function getCountriesByName(name){
    return async function(dispatch){
        try{
            var countryName = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({type: "GET_COUNTRIES_BY_NAME", payload: countryName.data})
        } catch (error){
            return alert("Ingrese un país válido...");
        }
    }
}

export function postActivities(payload){
    return async function(dispatch){
            const activities = await axios.post("http://localhost:3001/activities", payload);
            console.log(activities)
            return activities;
        } 
}

export function getDetails(id){
    return async function(dispatch){
        try{
            const json = await axios.get("http://localhost:3001/countries/"+id);
            return dispatch ({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}


export function filterCountriesByContinent(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function getActivity(){
    return async function(dispatch){
            var activities = await axios.get("http://localhost:3001/activities")
            return dispatch({type: "GET_ACTIVITY", payload: activities.data})
        } 
}
export function filterByActivity(payload){
    console.log(payload)
            return {
                type: "FILTER_BY_ACTIVITY", 
                payload
            }
        } 



export function orderByName(payload){
    console.log(payload)
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPopulation(payload){
    console.log(payload)
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}

