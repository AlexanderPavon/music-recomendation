let express = require('express');
const router = express.Router();
let cancionController = require('../controller/cancionController');
const path = require('path');


router.post('/', (req, res) => {
    console.log(req.body);  
    cancionController.agregarCancion(req, res);
});
router.post('/', cancionController.agregarCancion);
router.get('/aleatoria', cancionController.obtenerCancionAleatoria); 
router.post('/:id/votar', cancionController.votarCancion); 
router.get('/', cancionController.obtenerCanciones);


// Ruta para servir el archivo index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = router;

