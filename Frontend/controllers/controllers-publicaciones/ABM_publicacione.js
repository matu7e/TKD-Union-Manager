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

// Función para abrir el modal y bloquear el scroll
function openModal(modal) {
    modal.style.display = 'block';
    document.body.classList.add('no-scroll'); // Bloquear el scroll
}

// Función para cerrar el modal y restaurar el scroll si todos los modales están cerrados
function closeModal(modal) {
    modal.style.display = 'none';

    // Verificar si hay algún modal abierto
    const modals = [newPublicationModal, confirmModal]; // Agrega aquí más modales si es necesario
    const isAnyModalOpen = modals.some(m => m.style.display === 'block');

    // Si no hay ningún modal abierto, quitar la clase que bloquea el scroll
    if (!isAnyModalOpen) {
        document.body.classList.remove('no-scroll'); // Restaurar el scroll
    }
}

// Función para limpiar los campos del formulario
function resetForm() {
    const form = document.getElementById('publicationForm');
    form.reset();
    document.getElementById('imagePreview').src = ''; // Limpiar vista previa de la imagen
}

openModalButton.addEventListener('click', () => {
    resetForm(); // Limpiar los campos antes de abrir el modal
    openModal(newPublicationModal);
});




// Eventos para cerrar el modal de nueva publicación
closeModalButton.addEventListener('click', () => closeModal(newPublicationModal));
closeModalButtonFooter.addEventListener('click', () => closeModal(newPublicationModal));
// Eventos para cerrar el modal de confirmación
closeConfirmModalButton.addEventListener('click', () => closeModal(confirmModal));
cancelConfirmButton.addEventListener('click', () => closeModal(confirmModal));

// Evento para guardar y abrir el modal de confirmación
btnGuardar.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar el envío del formulario

    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const enlace = document.getElementById('enlace').value.trim();

    console.log('Título:', titulo); // Verificar valor
    console.log('Descripción:', descripcion);
    console.log('Enlace:', enlace);

    if (!titulo || !descripcion || !enlace) {
        alert('Por favor, complete todos los campos.');
        return; // No continuar si hay campos vacíos
    }

    openModal(confirmModal);
});



// Función para crear la publicación
function createPublication() {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const enlace = document.getElementById('enlace').value;

    // Verifica los valores capturados
    console.log('Título:', titulo);
    console.log('Descripción:', descripcion);
    console.log('Enlace:', enlace);

    const url = 'http://localhost:3000/publicaciones'; // Asegúrate de que esta es la URL correcta
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
        console.log('Publicación creada:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        closeModal(confirmModal); // Cierra el modal de confirmación
        closeModal(newPublicationModal); // Cierra el modal de nueva publicación
    });
}

// Evento para confirmar la acción
confirmActionButton.addEventListener('click', createPublication);

// Cerrar modales si se hace clic fuera de ellos
window.addEventListener('click', (event) => {
    if (event.target === newPublicationModal) {
        closeModal(newPublicationModal);
    } else if (event.target === confirmModal) {
        closeModal(confirmModal);
    }
});

// Función para previsualizar la imagen seleccionada
function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '';
    }
}
