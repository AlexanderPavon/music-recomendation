let express = require('express');
const router = express.Router();
let cancionController = require('../controller/cancionController');
const path = require('path');

// Rutas para la API
router.post('/', (req, res) => {
    console.log(req.body);  // Agrega esto para verificar si los datos están llegando
    cancionController.agregarCancion(req, res);
});
router.post('/', cancionController.agregarCancion);
router.get('/aleatoria', cancionController.obtenerCancionAleatoria); // Ruta para canción aleatoria
router.post('/:id/votar', cancionController.votarCancion); // Ruta para votar

// Ruta para servir el archivo index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = router;

