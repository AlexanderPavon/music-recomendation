let button = document.getElementById("guardar");
button.addEventListener("click", guardarDatos);

let aleatoriaButton = document.getElementById("aleatoria");
aleatoriaButton.addEventListener("click", obtenerCancionAleatoria);
    
async function guardarDatos() {

    const nombre = document.getElementById("nombre").value;
    const artista = document.getElementById("artista").value;
    const url = document.getElementById("url").value;

    if (!nombre || !artista || !url) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const response = await fetch("http://localhost:3000/canciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, artista, url_video: url }),
    });

    if (response.ok) {
        alert("Canción guardada con éxito.");
        cargarCanciones(); 
    } else {
        alert("Error al guardar la canción.");
    }
}



async function obtenerCancionAleatoria() {
    try {
        let response = await fetch('http://localhost:3000/canciones/aleatoria'); 
        if (response.ok) {
            let cancion = await response.json();
            console.log("Canción aleatoria:", cancion);

            document.getElementById("cancion-aleatoria").innerHTML = `
                <div class="card-container">
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

async function cargarCanciones() {
    const response = await fetch("http://localhost:3000/canciones");
    const canciones = await response.json();

    const cancionesContainer = document.getElementById("canciones");
    cancionesContainer.innerHTML = ""; 

    canciones.forEach((cancion) => {
        const card = document.createElement("div");
        card.className = "card-container";
        card.innerHTML = `
            <h3>${cancion.nombre}</h3>
            <p>Artista: ${cancion.artista}</p>
            <a href="${cancion.url_video}" target="_blank">Ver Video</a>
        `;
        cancionesContainer.appendChild(card);
    });
}


cargarCanciones();



