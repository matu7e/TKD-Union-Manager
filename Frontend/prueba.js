// Variables para la paginación
let publicaciones = [];
let currentPage = 1;
const registrosPorPagina = 15;
const publicacionesUrl = 'http://localhost:3000/publicaciones'; // URL de tus publicaciones
// Estado de acción actual para el modal de confirmación
let currentAction = null;
let currentId = null;

// Obtener los elementos de los modales y botones
const newPublicationModal = document.getElementById('newPublicationModal');
const confirmModal = document.getElementById('confirmModal');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const closeModalButtonFooter = document.getElementById('closeModalButtonFooter');
const closeConfirmModalButton = document.getElementById('closeConfirmModal');
const cancelConfirmButton = document.getElementById('cancelConfirmButton');
const btnGuardar = document.getElementById('btnGuardar');
const confirmActionButton = document.getElementById('confirmActionButton');
const loader = document.getElementById('loader'); // Elemento del loader

// Función para mostrar el loader
function showLoader() {
    loader.style.display = 'block'; // Mostrar el loader
}

// Función para ocultar el loader
function hideLoader() {
    loader.style.display = 'none'; // Ocultar el loader
}

// Función para abrir el modal y bloquear el scroll
function openModal(modal) {
    console.log("Abriendo modal:", modal.id);
    modal.style.display = 'block';
    document.body.classList.add('no-scroll'); // Bloquear el scroll
}

// Función para cerrar el modal y restaurar el scroll si todos los modales están cerrados
function closeModal(modal) {
    console.log("Cerrando modal:", modal.id);
    modal.style.display = 'none';

    // Verificar si hay algún modal abierto
    const modals = [newPublicationModal, confirmModal];
    const isAnyModalOpen = modals.some(m => m.style.display === 'block');

    if (!isAnyModalOpen) {
        document.body.classList.remove('no-scroll'); // Restaurar el scroll
    }
}

// Función para limpiar los campos del formulario
function resetForm() {
    const form = document.getElementById('publicationForm');
    form.reset();
    document.getElementById('imagePreview').src = ''; // Limpiar vista previa de la imagen
    console.log("Formulario reseteado y vista previa de imagen limpia");
}

openModalButton.addEventListener('click', () => {
    console.log("Botón abrir modal clickeado");
    resetForm(); // Limpiar los campos antes de abrir el modal
    openModal(newPublicationModal);
});

closeModalButton.addEventListener('click', () => closeModal(newPublicationModal));
closeModalButtonFooter.addEventListener('click', () => closeModal(newPublicationModal));
closeConfirmModalButton.addEventListener('click', () => closeModal(confirmModal));
cancelConfirmButton.addEventListener('click', () => closeModal(confirmModal));

btnGuardar.addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir la recarga de la página
    console.log("Botón guardar clickeado");

    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const enlace = document.getElementById('enlace').value.trim();

    console.log('Título:', titulo); 
    console.log('Descripción:', descripcion);
    console.log('Enlace:', enlace);

    if (!titulo) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    currentAction = 'crear'; // Establecer la acción actual a 'crear'
    openModal(confirmModal);
});

// Función para crear la publicación
function createPublication() {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const enlace = document.getElementById('enlace').value;

    console.log("Iniciando creación de publicación:", { titulo, descripcion, enlace });
    showLoader(); // Mostrar loader al iniciar la creación

    const url = 'http://localhost:3000/publicaciones';
    const method = 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: titulo,
            descripcion: descripcion,
            enlace: enlace,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación de la publicación');
        }
        return response.json();
    })
    .then(data => {
        console.log('Publicación creada con éxito:', data);
        const id_pub = data.id_pub;

        // Actualizar la lista de publicaciones sin recargar la página
        cargarPublicaciones(); // Cargar las publicaciones después de la creación
        uploadImage(id_pub); // Cargar la imagen después de crear la publicación
    })
    .catch(error => {
        console.error('Error al crear publicación:', error);
    })
    .finally(() => {
        hideLoader(); // Ocultar loader al finalizar
        closeModal(confirmModal);
        closeModal(newPublicationModal);
    });
}

// Función para cargar la imagen de la publicación
function uploadImage(id_pub) {
    const imageInput = document.getElementById('imagen');
    const imageFile = imageInput.files[0];

    console.log("Intentando cargar imagen para publicación:", id_pub);
    showLoader(); // Mostrar loader al iniciar la carga de imagen

    if (!imageFile) {
        console.log('No se seleccionó una imagen para subir');
        hideLoader(); // Ocultar loader si no hay imagen
        return;
    }

    const formData = new FormData();
    formData.append('imagen', imageFile);

    const url = `http://localhost:3000/publicaciones/${id_pub}/cargaImagen`;

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la carga de la imagen');
        }
        return response.json();
    })
    .then(data => {
        console.log('Imagen cargada con éxito:', data);
    })
    .catch(error => {
        console.error('Error al cargar la imagen:', error);
    })
    .finally(() => {
        hideLoader(); // Ocultar loader al finalizar
    });
}

// Evento para confirmar la acción
confirmActionButton.addEventListener('click', () => {
    if (currentAction === 'eliminar') {
        eliminarPublicacion(currentId);
    } else if (currentAction === 'crear') {
        createPublication();
    }
    closeModal(confirmModal);
});

// Función para cargar todas las publicaciones al iniciar
function cargarPublicaciones() {
    showLoader(); // Mostrar loader al iniciar la carga
    fetch(publicacionesUrl)
        .then(response => {
            // Asegúrate de que la respuesta sea OK antes de intentar convertirla a JSON
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            publicaciones = data; // Aquí se cargan las publicaciones
            console.log("Datos de publicaciones:", data); // Log para ver los datos
            console.log("Número de publicaciones cargadas:", publicaciones.length); // Mover aquí el log
            mostrarPagina(currentPage); // Mostrar la página actual
            actualizarPaginador(); // Actualizar paginador
            mostrarTotalRegistros(); // Mostrar total de registros
        })
        .catch(error => console.error('Error al cargar las publicaciones:', error))
        .finally(() => {
            hideLoader(); // Ocultar loader al finalizar
        });
}

// Función para mostrar el total de registros
function mostrarTotalRegistros() {
    const totalRegistros = document.getElementById('totalRegistros');
    if (totalRegistros) { // Verificar que el elemento exista
        totalRegistros.textContent = `Total de publicaciones: ${publicaciones.length}`; // Actualiza el texto con la longitud del array
    } else {
        console.error("Elemento 'totalRegistros' no encontrado");
    }
}

// Lógica de paginación
function actualizarPaginador() {
    const totalPaginas = Math.ceil(publicaciones.length / registrosPorPagina);
    const paginador = document.getElementById('paginador');
    
    if (paginador) { // Verificar que el paginador exista
        paginador.innerHTML = '';

        for (let i = 1; i <= totalPaginas; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.onclick = () => {
                currentPage = i;
                mostrarPagina(currentPage);
            };
            paginador.appendChild(pageButton);
        }
    } else {
        console.error("Elemento 'paginador' no encontrado");
    }
}


// Función para mostrar la página de publicaciones
function mostrarPagina(pagina) {
    const tableBody = document.querySelector('#miTabla tbody');
    tableBody.innerHTML = '';
    
    const start = (pagina - 1) * registrosPorPagina;
    const end = start + registrosPorPagina;
    const publicacionesPagina = publicaciones.slice(start, end);

    publicacionesPagina.forEach(publicacion => {
        const titulo = publicacion.titulo || '-';
        const descripcion = publicacion.descripcion || '-';
        const enlace = publicacion.enlace ? `<a href="${publicacion.enlace}" target="_blank">Enlace</a>` : '-';
        const fechaPublicacion = publicacion.fecha_publicacion 
            ? new Date(publicacion.fecha_publicacion).toLocaleDateString("es-ES") 
            : '-';
        
        const iconoVerImagen = publicacion.imagen 
        ? `<i class="fa-solid fa-eye icon-view" title="Ver imagen" onclick="verImagen('${publicacion.imagen.replace(/\\/g, "/")}')"></i>`
        : '<i class="fa-solid fa-eye icon-view-disabled" title="Imagen no disponible"></i>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${titulo}</td>
            <td>${descripcion}</td>
            <td>${enlace}</td>
            <td>${fechaPublicacion}</td>
            <td>
                ${iconoVerImagen}
                <i class="fa-solid fa-trash icon-delete" title="Eliminar publicación" onclick="confirmarEliminacion(${publicacion.id_publicacion})"></i>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para mostrar el modal de confirmación de eliminación
function confirmarEliminacion(id) {
    currentAction = 'eliminar';
    currentId = id;
    openModal(confirmModal);
}

function eliminarPublicacion(id) {
    showLoader(); // Mostrar loader al iniciar la eliminación
    fetch(`http://localhost:3000/publicaciones/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar publicación');
            }
            return response.text(); // Cambiar a response.text() en lugar de response.json()
        })
        .then(data => {
            console.log('Publicación eliminada con éxito:', data);
            cargarPublicaciones(); // Recargar publicaciones después de la eliminación
        })
        .catch(error => {
            console.error('Error al eliminar publicación:', error);
            alert('No se pudo eliminar la publicación. Intente nuevamente.'); // Mostrar alerta en caso de error
        })
        .finally(() => hideLoader()); // Ocultar loader al finalizar
}


// Lógica de paginación
function actualizarPaginador() {
    const totalPaginas = Math.ceil(publicaciones.length / registrosPorPagina);
    const paginador = document.getElementById('paginador');
    paginador.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i;
            mostrarPagina(currentPage);
        };
        paginador.appendChild(pageButton);
    }
}



// Cargar las publicaciones al inicio
document.addEventListener('DOMContentLoaded', cargarPublicaciones);
