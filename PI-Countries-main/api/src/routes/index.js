const { Router } = require("express");
const axios = require("axios");
const { Country } = require("../db.js");
const countriesRouter = require("./countries.js")
const activitiesRouter = require("./activities.js")
const router = Router();
router.use("/countries", countriesRouter);
router.use("/activities", activitiesRouter);
/*
const country = async () => {

  axios.get("https://restcountries.com/v3/all")
   
    .then((res) => res.data)
    .then((data) =>{
      const arr =[];
      data.forEach((el) =>{
        arr.push({
        id: el.cca3,
        name: el.translations.spa.common,
        flag: el.flags[0],
        continent: el.continents? el.continents[0]: "not found",
        capital: el.capital? el.capital[0]:"not found",
        region: el.region,
        subregion: el.subregion,
        area: el.area,
        population: el.population
        });
      });
      return arr;
      })
      //aquí la info que resulta del forEach anterior, la ingreso a mi modelo Country
      .then((api) => Country.bulkCreate(api)) 
  };
  
  country();
*/
  

const country = async() => {
const p = await axios.get("https://restcountries.com/v3/all")
 
  
    const arr =[];
    await p.data.forEach((el) =>{
      arr.push({
      id: el.cca3,
      name: el.translations.spa.common,
      flag: el.flags[0],
      continent: el.continents? el.continents[0]: "not found",
      capital: el.capital? el.capital[0]:"not found",
      region: el.region,
      subregion: el.subregion,
      area: el.area,
      population: el.population
      });
    });
    
    
    //aquí la info que resulta del forEach anterior, la ingreso a mi modelo Country
    const app= Country.bulkCreate(arr)

  }
country();




module.exports = router;

