const express= require('express');
const router = express.Router();

const notaController= require ('../controllers/notaController')


router.get('/:id_nota/detalle', notaController.getNota),//DETAIL
router.get('/', notaController.listNota)//LIST//no hay que colocarle '/notas' ya que ya se especificó en app.js que cuando se llame a '/notas' va a llevarte a el "home de notas" por lo que llamando solo con '/' accede
router.get('/nueva', notaController.register);//CREATE-GET
router.post('/nueva', notaController.postNota);//CREATE-POST
router.get('/:id_nota/editar', notaController.editarNota);//EDITAR-GET//primero se prueba con get
router.put('/:id_nota/editar', notaController.putNota);//EDITAR-PUT
router.delete('/:id_nota/editar', notaController.borrarNota)//DELETE(EDITAR-DELETE)

module.exports = router