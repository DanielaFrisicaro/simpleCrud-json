const fs = require('fs');
const path = require('path')

const notas_path = path.join(__dirname, '../data/notas.json');//1er paso
const file_data = fs.readFileSync(notas_path, 'utf-8');//2do paso
const notas = JSON.parse(file_data)//3er paso. Esta es la variable central.

const getNota = (req, res) => {

    //destructuring//
    // const { id_nota } = req.params;

    //sin destructuring
    const nota = req.params.id_nota
    const nota_seleccionada = notas.find((el) => el.id === parseInt(nota))// o se hace con doble igual o se deja el triple igual con parseInt porque nota lo que llega es string
    // res.send('Hola desde la nota ' + id_nota)
    res.render('detalleNota', { nota: nota_seleccionada });//envio nombre nota que se uso en la vista y el resultado que es la nota seleccionada.
}
const listNota = (req, res) => {
    res.send('probando el ListNota')
};
const register = (req, res) => {
    //res.send('aqui va el formulario de creación')
    res.render('crearNota')
};
const postNota = (req, res) => {
    //const info = req.body
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

    res.redirect('/')
};
const editarNota = (req, res) => {
    // res.send('Estamos cargando la vista para hacer el put')

    const indice = req.params.id_nota;
    const nota_seleccionada = notas.find((el) => el.id === parseInt(indice));
    //console.log(indice);

    res.render('editarNotaFormulario', { nota: nota_seleccionada });
};
const putNota = (req, res) => {
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
};

const borrarNota = (req, res) => {
    // res.send('se esta borrando la nota')

    const id_nota = req.params.id_nota;
    const notas_filtradas = notas.filter(el => el.id !== parseInt(id_nota))

    // console.log(id_nota)
    const data = JSON.stringify(notas_filtradas, null, 2)//4to paso
    fs.writeFileSync(notas_path, data)//5to paso. Se escribe en el JSON
    res.redirect('/')
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