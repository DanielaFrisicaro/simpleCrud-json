const express= require('express');
const router = express.Router();

const notaController= require ('../controllers/notaController')

router.get('/:id_nota/detalle', notaController.getNota),
router.get('/', notaController.listNota)//no hay que colocarle '/notas' ya que ya se especificó en app.js que cuando se llame a '/notas' va a llevarte a el "home de notas" por lo que llamando solo con '/' accede
router.get('/nueva', notaController.register);
router.post('/nueva', notaController.postNota);
router.get('/:id_nota/editar', notaController.editarNota);//primero se prueba con get
router.put('/:id_nota/editar', notaController.putNota);
router.delete('/:id_nota/editar', notaController.borrarNota)

module.exports = router