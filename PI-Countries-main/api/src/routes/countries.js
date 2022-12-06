const { Router } = require('express');
const router = Router();
const { Country, Activity } = require("../db.js");




router.get('/', async (req, res) =>{
    const {name} = req.query    
    const countries = await Country.findAll({
        attributes: ["id", "flag", "name", "continent", "region", "population"],
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through:{
                attributes:[],
            }
        }
        });
    try{
        if(name){
        let countryName = await countries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        countryName.length ? 
        res.status(200).send(countryName):
        res.status(404).send('País no encontrado')
    } 
    else{
        res.status(200).send(countries)
    }
} catch(error){
    res.status(400).send(error.message)
}
});



    router.get("/:id", async (req, res) =>{   
        const {id} = req.params;
        try{
            const countries = await Country.findByPk(id.toUpperCase(), {
                include: Activity
            });
            countries ?
        res.status(200).json(countries):
        res.status(404).send(`${id} no encontrado`)
        } catch(error){
            res.status(400).send(error.message)
        }
    });

    router.get("/name/COL", async (req, res) =>{
        try{
            const col = await Country.findByPk("COL",{
                attributes:['name', 'population']
            })
            res.status(200).send(col)
            res.status(400).send('no found')
        }catch(error){
            console.log(error)
    }

    }
    )



/*
    router.put("/:id", async (req, res)=>{
        const id = req.params
        const country = req.body
        try{
            let countries = Country.update(country, {
                where:{
                    id: id
                }
            });
            return res.json({cambiado: true})
        } catch(error){
            console.log(error)
        }
    })


    router.delete("/:id", async (req, res)=>{
        const id = req.params.id
        try{
            let country = await Country.destroy({
                where:{
                    id: id
                }
            });
            return res.json({borrado: true})
        } catch(error){
            console.log(error)
        }
    })
*/

module.exports = router;
