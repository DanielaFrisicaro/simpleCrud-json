const express = require('express');
const app = express();
const path = require ('path')
const methodOverride = require('method-override')
//llamo a los enrutadores
const mainRoute = require('./routes/mainRoute');
const notaRoute = require ('./routes/notaRoute')


//habilitar las peticiones put y delete

app.use(methodOverride('_method'))

//habilitar recepcion de informacion express urlencoded
app.use(express.urlencoded({extended:false}));
//decir que vamos a receptar la informacion con un JSON
app.use(express.json());

//informo que motor vamos a usar. Configuracion de EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))//estoy dentro de src, por eso solo con llamar a /views va a ingresar
//uso los enrutadores
app.use('/', mainRoute);
app.use('/notas', notaRoute)

//escucho al puerto
app.listen(3000, () =>{
    console.log('Escuchando en el puerto 3000')
})