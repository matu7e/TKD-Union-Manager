document.addEventListener('DOMContentLoaded', () => {
    const btnGuardar = document.getElementById('btnGuardar');
    const modal = document.getElementById('newPublicationModal');

    // Asegúrate de que esta función se llama cuando deseas abrir el modal
    function openModal() {
        const modal = document.getElementById('newPublicationModal');
        modal.style.display = 'block'; // Asegúrate de que el modal se muestre
    }

    // Llama a esta función al cargar la página
    document.addEventListener('DOMContentLoaded', async () => {
        // Abre el modal al cargar la página
        openModal();
        await cargarDatosEscuela(); // Carga los datos de la escuela después de abrir el modal
    });


    // Función para mostrar la vista previa de la imagen
    window.previewImage = function(event) {
        const imagePreview = document.getElementById('imagePreview');
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result; // Actualiza la imagen de vista previa
            };
            reader.readAsDataURL(file);
        }
    };

    // Guardar los datos al hacer clic en el botón "Guardar"
    btnGuardar.addEventListener('click', () => {
        const formData = new FormData(document.getElementById('publicationForm'));
    
        // Enviar los datos al backend
        fetch(`http://localhost:3000/escuelas`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            
            // Obtener el ID de la escuela creada
            const idEscuela = data.id_escuela;
    
            // Ahora, envía el logo a otro endpoint usando el ID de la escuela
            const logoFormData = new FormData();
            const logoInput = document.getElementById('logoInput'); // Asegúrate de tener un input para el logo
            logoFormData.append('logo', logoInput.files[0]);
    
            return fetch(`http://localhost:3000/escuelas/${idEscuela}/cargaLogo`, {
                method: 'POST',
                body: logoFormData
            });
        })
        .then(response => response.json())
        .then(data => {
            modal.style.display = 'none'; // Cerrar el modal
        })
        .catch(error => {
            console.error('Error al guardar la escuela o cargar el logo:', error);
        });
    });

// Función para cerrar el modal
document.getElementById('closeModalButton').onclick = function() {
    document.getElementById('newPublicationModal').style.display = 'none';
};
document.getElementById('closeModalButtonFooter').onclick = function() {
    document.getElementById('newPublicationModal').style.display = 'none';
};




















// Muestra el modal y carga los datos de la escuela
function openModal(schoolId) {
    // Realiza una solicitud GET para obtener los datos de la escuela
    fetch(`http://localhost:3000/escuelas/${schoolId}`)
        .then(response => response.json())
        .then(data => {
            // Rellena los campos del formulario con los datos obtenidos
            document.getElementById('titulo').value = data.nombre || '';
            document.getElementById('descripcion').value = data.email || '';
            document.getElementById('telefono').value = data.telefono || '';
            document.getElementById('enlaceInstagram').value = data.enlace || '';

            // Cargar la imagen predeterminada si no hay logo
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = data.logo ? data.logo : '../../../backend/default/logo.png';
        })
        .catch(error => {
            console.error('Error al cargar los datos de la escuela:', error);
        });

    // Abre el modal
    modal.style.display = 'block';
}