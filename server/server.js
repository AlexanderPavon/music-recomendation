let express = require('express');
let mongoose = require('mongoose');
let cancionesRoutes = require('./routes/cancionesRoutes');
let app = express();
let port = 3000;
const path = require('path');

const cors = require('cors');
app.use(cors());


app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/music');
        console.log("Conexión exitosa a la base de datos.");
    } catch (err) {
        console.error("Error en la conexión a la base de datos:", err);
        process.exit(1);
    }
}

connectDB();

app.use(express.json());
app.use('/canciones', cancionesRoutes);

app.listen(port,()=>{
    console.log("Server is up");
});

