const db = require("../database/models");
const sequelize = db.sequelize;
//const fs = require('fs');
const path = require('path')

//.............................JSON...........................................................................//  

//const notas_path = path.join(__dirname, '../data/notas.json');//1er paso
//const file_data = fs.readFileSync(notas_path, 'utf-8');//2do paso
//const notas = JSON.parse(file_data)//3er paso. Esta es la variable central.

//.............................FIN JSON...........................................................................//  

//..................................................DETAIL.....................................................//
const getNota = (req, res) => {
//.............................JSON...........................................................................//  
/*
    //con destructuring//
    // const { id_nota } = req.params;

    //sin destructuring
    const nota = req.params.id_nota
    const nota_seleccionada = notas.find((el) => el.id === parseInt(nota))// o se hace con doble igual o se deja el triple igual con parseInt porque nota lo que llega es string
    // res.send('Hola desde la nota ' + id_nota)
    res.render('detalleNota', { nota: nota_seleccionada });//envio nombre nota que se uso en la vista y el resultado que es la nota seleccionada.
    */
     //con destructuring//
       // const { id_nota } = req.params;//lo que viene por params

         //sin destructuring
        const id_nota = req.params.id_nota
        db.Notas.findOne({
          where: { id_nota: id_nota },//el 1ero es el ID real y el 2do el de la variable creada.
        }).then((nota) => {
          res.render("detalleNota", { nota });
        });


}

//..................................................LIST......................................................//
const listNota = (req, res) => {
    
    db.Notas.findAll()
    .then((notas) => {
       // res.send("pruebas con DB"); 
       res.render("list", {notas})//notas está en la vista
      });
   
    //res.send('probando el ListNota')
};
//..................................................CREATE-GET................................................//
const register = (req, res) => {
    db.Notas.findAll({
      //
    }).then((nota) => {
      res.render("crearNota", { nota });
    });
//.............................JSON...........................................................................//  
    //res.send('aqui va el formulario de creación')
    //res.render('crearNota')
};
//..................................................CREATE-POST................................................//
const postNota = (req, res) => {
    //const info = req.body
    db.Notas.create({
        id_nota: req.params.id,
        nota: req.body.nota,
        titulo: req.body.titulo,
    
      }).then((resultado) => {
        res.redirect("/notas");
      });

  //.............................JSON...........................................................................//  
  /*
  const titulo = req.body.titulo;
    const nota = req.body.nota;
    const id = notas.length + 1;
    console.log(notas)//notas es el archivo JSON parseado
    //console.log(info);
    // console.log(info.titulo);
    //console.log(info.nota);
    notas.push({
        titulo: titulo,
        nota: nota,
        id
    })

    const notas_string = JSON.stringify(notas, null, 2);//4to paso
    fs.writeFileSync(notas_path, notas_string)//5to paso. Se escribe en el JSON

    console.log(notas)
    console.log('estoy pasando por el post')

    res.redirect('/')*/
};
//..................................................EDITAR-GET.................................................//
const editarNota = (req, res) => {
//.............................JSON...........................................................................//    
   /*  
    // res.send('Estamos cargando la vista para hacer el put')

    const indice = req.params.id_nota;
    const nota_seleccionada = notas.find((el) => el.id === parseInt(indice));
    //console.log(indice);

    res.render('editarNotaFormulario', { nota: nota_seleccionada });
*/
   
        db.Notas.findByPk(req.params.id_nota).then((nota) => {
          res.render("editarNotaFormulario", { nota });
        });
      

};
//..................................................EDITAR-PUT................................................//
const putNota = (req, res) => {
//...........................JSON.............................................................................//    
/*
    const id_nota = req.params.id_nota;
    const titulo = req.body.titulo;
    const nota = req.body.nota;
    console.log(id_nota);
    console.log(titulo);
    console.log(nota);


    notas.forEach(element => {
        if (element.id === parseInt(id_nota)) {
            element.titulo = titulo;
            element.nota = nota;
        }
    });
    const data = JSON.stringify(notas, null, 2)//4to paso
    fs.writeFileSync(notas_path, data)//5to paso. Se escribe en el JSON
    res.redirect('/')
*/
  //...........................................................................................................//      
        db.Notas.update(
          {
        id_nota: req.params.id_nota,//si lo dejamos o no a esta linea, no cambia nada.
        nota: req.body.nota,//datos que salen del formulario
        titulo: req.body.titulo,//datos que salen del formulario
          },
          {
            where: { id_nota : req.params.id_nota},//el 1ero es el ID real y el 2do el de la variable creada.
          }
        ).then((resultado) => {
          res.redirect("/notas");
        });
     
};
//..................................................DELETE.................................................//
const borrarNota = (req, res) => {
//...........................JSON.........................................................................//
    // res.send('se esta borrando la nota')

   /* const id_nota = req.params.id_nota;
    const notas_filtradas = notas.filter(el => el.id !== parseInt(id_nota))

    // console.log(id_nota)
    const data = JSON.stringify(notas_filtradas, null, 2)//4to paso
    fs.writeFileSync(notas_path, data)//5to paso. Se escribe en el JSON
   res.redirect('/')*/
//.......................................................................................................//
        db.Notas.destroy({ where: { id_nota: req.params.id_nota } }).then(
          () => {
            res.redirect("/notas");
          }
        );
      

}


module.exports = {
    getNota,
    listNota,
    register,
    postNota,
    editarNota,
    putNota,
    borrarNota
}