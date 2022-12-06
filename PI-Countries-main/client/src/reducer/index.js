const initialState = {
    countries: [],
    allCountries: [],
    details:[],
    activities:[],
    count_Act:[]
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload,
                count_Act: action.payload,
            }
            case "POST_ACTIVITIES":
            return{
                ...state,
            }
            case "GET_COUNTRIES_BY_NAME":
            const buscar = state.countries
            let countryName = buscar.filter( el => el.name.toLowerCase().includes(action.payload))? action.payload: alert("No exite el país digitado")
            
            return{
                ...state,
                countries: countryName,
            }

            case 'FILTER_BY_CONTINENT':
                const allCountries = state.allCountries
                const continentFiltered = action.payload === 'All'? allCountries : allCountries.filter(el => el.region === action.payload)
                return{
                    ...state,
                    countries: continentFiltered
                }

              case 'GET_ACTIVITY':
                return{
                    ...state,
                    activities: action.payload,
                }

                case 'FILTER_BY_ACTIVITY':
                const countries = state.count_Act
                const actFiltered = action.payload === 'todas'? countries.filter(el=> el.activities[0]? el: null): countries.filter(p => p.activities.map(a=>a.name).includes(action.payload))
                
                return{
                    ...state,
                    countries: actFiltered,
                }

                    case 'ORDER_BY_NAME':
                        let organizedCountries = action.payload === 'asc'?
                        state.countries.sort(function(a, b){
                            if(a.name > b.name){
                                return 1;
                            }
                            if(a.name < b.name){
                                return -1;
                            }
                            return 0;
                        }) : state.countries.sort(function(a, b){
                            if(a.name > b.name){
                                return -1;
                            }
                            if(a.name < b.name){
                                return 1;
                            }
                            return 0;
                        })
                        return {
                            ...state,
                            countries: organizedCountries
                        }
                        case "GET_DETAILS":
                            return{
                                ...state,
                                details: action.payload
                            }
                        case 'ORDER_BY_POPULATION':
                            let organizedPopulation = action.payload === 'asc2'?
                            state.countries.sort(function(a, b){
                                if(a.population > b.population){
                                    return 1;
                                }
                                if(a.population < b.population){
                                    return -1;
                                }
                                return 0;
                            }) : state.countries.sort(function(a, b){
                                if(a.population > b.population){
                                    return -1;
                                }
                                if(a.population < b.population){
                                    return 1;
                                }
                                return 0;
                            })
                            return {
                                ...state,
                                countries: organizedPopulation
                            }

            default:
                    return state;           
    }
}

export default rootReducer;