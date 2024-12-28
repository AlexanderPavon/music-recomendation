let button = document.getElementById("guardar");
button.addEventListener("click", guardarDatos);

let aleatoriaButton = document.getElementById("aleatoria");
aleatoriaButton.addEventListener("click", obtenerCancionAleatoria);
    
async function guardarDatos() {
    let nombre = document.getElementById("nombre").value;
    let artista = document.getElementById("artista").value;
    let url = document.getElementById("url").value;

    if (!nombre || !artista || !url || !url.includes("youtube.com")) {
        alert("Por favor, completa todos los campos y asegúrate de que la URL sea válida.");
        return;
    }

    let body = JSON.stringify({ nombre, artista, url_video: url });
    console.log(body);
    try {
        let response = await fetch('http://localhost:3000/canciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        });
        console.log('Respuesta del servidor:', response);
        if (response.status === 201) {
            let cancion = await response.json();
            console.log(cancion);
            cargarCanciones();  
        } else {
            console.error('Error al guardar canción', await response.json());
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

async function obtenerCancionAleatoria() {
    try {
        let response = await fetch('http://localhost:3000/aleatoria');

        if (response.ok) {
            let cancion = await response.json();
            console.log("Canción aleatoria:", cancion);

            // Asegúrate de que el contenedor exista en el HTML
            document.getElementById("cancion-aleatoria").innerHTML = `
                <div class="tarjeta-cancion">
                    <h3>${cancion.nombre}</h3>
                    <p>Artista: ${cancion.artista}</p>
                    <a href="${cancion.url_video}" target="_blank">Ver Video</a>
                </div>
            `;
        } else if (response.status === 404) {
            console.warn("No hay canciones disponibles");
            document.getElementById("cancion-aleatoria").innerHTML = `
                <p>No hay canciones disponibles en este momento.</p>
            `;
        } else {
            console.error("Error al obtener canción aleatoria:", response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud de canción aleatoria:', error);
    }
}










async function votar(id) {
    try {
        let response = await fetch(`http://localhost:3000/canciones/${id}/votar`, { method: 'POST' });
        if (response.status === 200) {
            let cancion = await response.json();
            alert(`Votaste por ${cancion.nombre}. Total votos: ${cancion.votos}`);
        }
    } catch (error) {
        console.error(error);
    }
}

// Cargar canciones
async function cargarCanciones() {
    try {
        let response = await fetch('http://localhost:3000/canciones');
        let canciones = await response.json();
        
        // Generar las tarjetas para cada canción
        let cancionesHTML = canciones.map(cancion => `
            <div class="card">
                <h3>${cancion.nombre} - ${cancion.artista}</h3>
                <p>Votos: ${cancion.votos}</p>
                <a href="${cancion.url_video}" target="_blank">Ver en YouTube</a>
            </div>
        `).join('');
        
        // Insertar las tarjetas en el contenedor
        document.getElementById("canciones").innerHTML = cancionesHTML;
    } catch (error) {
        console.error(error);
    }
}

cargarCanciones();


