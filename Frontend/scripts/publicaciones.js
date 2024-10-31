$(document).ready(function() {
    // Simulación de datos de publicaciones
    const publicaciones = [
        {
            id: 1,
            titulo: "Publicación 1",
            contenido: "Contenido de la publicación 1.",
            imagen: "../assets/publicacion1.jpg",
            fecha: "2024-10-29"
        },
        {
            id: 2,
            titulo: "Publicación 2",
            contenido: "Contenido de la publicación 2.",
            imagen: "../assets/publicacion2.jpg",
            fecha: "2024-10-28"
        },
        {
            id: 3,
            titulo: "Publicación 3",
            contenido: "Contenido de la publicación 3.",
            imagen: "../assets/publicacion3.jpg",
            fecha: "2024-10-27"
        }
    ];

    // Función para cargar las publicaciones
    function cargarPublicaciones() {
        const container = $('#publicaciones-container');
        publicaciones.forEach(pub => {
            const card = `
                <div class="card">
                    <div class="card-header">${pub.titulo}</div>
                    <img src="${pub.imagen}" alt="${pub.titulo}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${pub.contenido}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Fecha: ${pub.fecha}</small>
                    </div>
                </div>
            `;
            container.append(card);
        });
    }

    // Llamada a la función para cargar las publicaciones
    cargarPublicaciones();

    // Función de cierre de sesión
    $('#logoutButton').click(function(event) {
        event.preventDefault();
        // Aquí puedes implementar la lógica de cierre de sesión
        alert('Has cerrado sesión.'); // Mensaje de prueba
        // Redirigir a la página de inicio o login
        window.location.href = '../Index.html';
    });
});
