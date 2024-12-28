
let Cancion = require('../models/cancion');

async function agregarCancion (req, res) {
    console.log('Datos recibidos:', req.body);  
    const { nombre, artista, url_video } = req.body;

    if (!nombre || !artista || !url_video) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        const cancion = new Cancion({ nombre, artista, url_video });
        await cancion.save();
        res.status(201).json(cancion);
    } catch (error) {
        console.error('Error al guardar la canción:', error);
        res.status(400).json({ message: 'Error al guardar la canción' });
    }
};

async function obtenerCanciones(req, res) {
    try {
        const canciones = await Cancion.find();
        res.status(200).json(canciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener canciones' });
    }
}



async function obtenerCancionAleatoria(req, res) {
    try {
        const canciones = await Cancion.find();
        if (canciones.length === 0) {
            return res.status(404).json({ error: 'No hay canciones disponibles' });
        }

        const cancionAleatoria = canciones[Math.floor(Math.random() * canciones.length)];
        res.json(cancionAleatoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener canción aleatoria' });
    }
}


async function votarCancion (req, res) {
    const { id } = req.params;
    try {
        const cancion = await Cancion.findByIdAndUpdate(id, { $inc: { votos: 1 } }, { new: true });
        if (!cancion) return res.status(404).json({ message: 'Canción no encontrada' });

        res.status(200).json(cancion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al votar por la canción' });
    }
};



module.exports = {
    agregarCancion,
    obtenerCancionAleatoria,
    votarCancion,
    obtenerCanciones, 
};

