const { Router } = require('express');
const router = Router();
const { Country, Activity } = require("../db.js");


router.post("/", async (req, res) =>{   
        try {
        const {name, difficulty, duration, season, id} = req.body;     
         const activity = await Activity.create(      
         {name, difficulty, duration, season} 
         );     
         id.map(async (el) => {
                const country = await Country.findByPk(el.toUpperCase());
                country.addActivity(activity)
         })
         //await Country.findByPk(id.toUpperCase());     
         //country.addActivity(activity);    
          res.status(201).send(activity); 
        } catch (error){
                res.status(404).send("parámetros incorrectos, no se puede crear la actividad");   
        }
         });



router.get('/', async (req, res) =>{
                const {name} = req.query    
                const activities = await Activity.findAll({
                    attributes: ["name", "difficulty", "duration", "season"],
                    include: {
                        model: Country,
                        attributes: ['name', 'id', 'flag', 'continent'],
                        through:{
                            attributes:[],
                        }
                    }
                    });
                try{
                    if(name){
                    let countryName = await activities.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
                    countryName.length ? 
                    res.status(200).send(countryName):
                    res.status(404).send('Actividad no creada')
                }   else{
                    res.status(200).send(activities)
                }
            } catch(error){
                res.status(400).send(error.message)
            }
            });
    


    module.exports = router;