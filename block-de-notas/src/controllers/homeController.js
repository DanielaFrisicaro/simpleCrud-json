const fs= require('fs');
const path = require('path')

const notas_path= path.join(__dirname, '../data/notas.json');//1er paso
const file_data= fs.readFileSync(notas_path, 'utf-8');//2do paso
const notas = JSON.parse(file_data)//3er paso


const getHome= (req, res ) => {
    //res.send('estoy en el home')
    res.render('home',{notas:notas})//cuando ya usamos las vistas
}



module.exports = {
    getHome

    //cada propiedad del objeto literal va a ser el controlador de cada ruta
}