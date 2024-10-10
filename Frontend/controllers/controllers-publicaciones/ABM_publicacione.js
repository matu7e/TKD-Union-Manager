

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('newPublicationModal');
    const confirmModal = document.getElementById('confirmModal');
    const confirmActionButton = document.getElementById('confirmActionButton');
    const closeConfirmModal = document.getElementById('closeConfirmModal');
    const cancelConfirmButton = document.getElementById('cancelConfirmButton');
    const publicationForm = document.getElementById('publicationForm');
    const loader = document.getElementById('loader'); // Loader para la carga

    let currentPublicationId = null;
    let isEditMode = false;


    function submitForm() {
        const url = isEditMode ? `http://localhost:3000/api/publicaciones/${currentPublicationId}` : 'http://localhost:3000/api/publicaciones';
        const method = isEditMode ? 'PUT' : 'POST';

        loader.style.display = 'block'; // Muestra el loader

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: document.getElementById('titulo').value,
                descripcion: document.getElementById('descripcion').value,
                enlace: document.getElementById('enlace').value,
            })
        })
            .then(response => {
                loader.style.display = 'none'; // Oculta el loader
                if (response.ok) {
                    alert('Publicación guardada exitosamente.');
                    modal.classList.remove('show');
                    document.body.classList.remove('modal-open');
                    loadPublications(); // Recargar publicaciones
                } else {
                    alert('Hubo un error al guardar la publicación.');
                }
            })
            .catch(error => {
                loader.style.display = 'none'; // Ocultar loader en caso de error
                console.error('Error al guardar la publicación:', error);
            });
    }

    function loadPublications() {
        const fechaDesde = document.getElementById("fechaDesde").value;
        const fechaHasta = document.getElementById("fechaHasta").value;
        const titulo = document.getElementById("titulo").value;

        // Construir la URL para la consulta de publicaciones
        let url = "http://localhost:3000/api/publicaciones?";
        if (fechaDesde) url += `fechaDesde=${fechaDesde}&`;
        if (fechaHasta) url += `fechaHasta=${fechaHasta}&`;
        if (titulo) url += `titulo=${titulo}&`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById("tableBody");
                tableBody.innerHTML = ""; // Limpiar el contenido previo
                data.publicaciones.forEach(publicacion => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${publicacion.titulo}</td>
                        <td>${publicacion.descripcion}</td>
                        <td><a href="${publicacion.enlace}" target="_blank">Ver Enlace</a></td>
                        <td><img src="${publicacion.urlImagen}" alt="Imagen de la publicación" class="img-table"></td>
                        <td>
                            <button class="btn btn-edit" onclick="openEditModal(${publicacion.id})">Editar</button>
                            <button class="btn btn-delete" onclick="confirmDelete(${publicacion.id})">Eliminar</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
                document.getElementById("totalRegistros").innerText = data.total;
                document.getElementById("totalPaginas").innerText = data.totalPaginas;
                updatePagination(data.totalPaginas); // Actualizar la paginación
            })
            .catch(error => {
                console.error("Error al cargar las publicaciones:", error);
            });
    }

    // Función para actualizar la paginación
    function updatePagination(totalPaginas) {
        const pageSelect = document.getElementById("pageSelect");
        pageSelect.innerHTML = ""; // Limpiar las opciones anteriores
        for (let i = 1; i <= totalPaginas; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            pageSelect.appendChild(option);
        }
    }

    // Función para abrir el modal con datos precargados
    window.openEditModal = function (id) {
        fetch(`http://localhost:3000/api/publicaciones/${id}`)
            .then(response => response.json())
            .then(data => {
                // Precarga los datos en el formulario
                document.getElementById('titulo').value = data.titulo;
                document.getElementById('descripcion').value = data.descripcion;
                document.getElementById('enlace').value = data.enlace;
                document.querySelector('.btn-guardar').innerText = 'Guardar'; // Cambia el texto del botón a "Guardar"
                currentPublicationId = id; // Establece el ID actual
                isEditMode = true; // Modo edición activado
                modal.classList.add('show'); // Muestra el modal
                document.body.classList.add('modal-open');
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    };

    // Función para confirmar la eliminación
    window.confirmDelete = function (id) {
        currentPublicationId = id; // Establecer ID de publicación a eliminar
        isEditMode = false; // Desactiva el modo edición
        document.getElementById('confirmMessage').innerText = '¿Estás seguro que deseas eliminar esta publicación?'; // Mensaje de confirmación
        confirmModal.classList.add('show');
        document.body.classList.add('modal-open');
    };

    // Función para realizar el fetch de eliminación
    function deletePublication(id) {
        loader.style.display = 'block'; // Muestra el loader

        fetch(`http://localhost:3000/api/publicaciones/${id}`, { method: 'DELETE' })
            .then(response => {
                loader.style.display = 'none'; // Oculta el loader
                if (response.ok) {
                    alert('Publicación eliminada exitosamente.');
                    loadPublications(); // Recargar publicaciones
                } else {
                    alert('Hubo un error al eliminar la publicación.');
                }
                closeConfirmModal();
            })
            .catch(error => {
                loader.style.display = 'none'; // Ocultar loader en caso de error
                console.error('Error al eliminar la publicación:', error);
            });
    }

    // Evento para confirmar acciones en el modal de confirmación
    confirmActionButton.addEventListener('click', () => {
        if (!isEditMode) {
            deletePublication(currentPublicationId); // Confirmación de eliminación
        }
        closeConfirmModal();
    });

    // Evento para cerrar el modal de confirmación
    closeConfirmModal.addEventListener('click', closeConfirmModal);
    cancelConfirmButton.addEventListener('click', closeConfirmModal);

    // Función para cerrar el modal de confirmación
    function closeConfirmModal() {
        confirmModal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }

    // Evento para manejar el envío del formulario
    document.getElementById('btnPublicar').addEventListener('click', () => {
        document.getElementById('confirmMessage').innerText = '¿Estás seguro que deseas publicar?';
        confirmModal.classList.add('show');
        document.body.classList.add('modal-open');
    });

    // Evento para confirmar la acción de publicación
    confirmActionButton.addEventListener('click', () => {
        submitForm(); // Llama a la función para guardar la publicación
        closeConfirmModal();
    });

    // Cargar las publicaciones al iniciar
    loadPublications();
});
