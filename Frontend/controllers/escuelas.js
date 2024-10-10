document.addEventListener('DOMContentLoaded', () => {
    const btnGuardar = document.getElementById('btnGuardar');
    const modal = document.getElementById('newPublicationModal');

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
            console.log('Escuela guardada:', data);
            modal.style.display = 'none'; // Cerrar el modal
        })
        .catch(error => {
            console.error('Error al guardar la escuela:', error);
        });
    });
});

// Función para cerrar el modal
document.getElementById('closeModalButton').onclick = function() {
    document.getElementById('newPublicationModal').style.display = 'none';
};
document.getElementById('closeModalButtonFooter').onclick = function() {
    document.getElementById('newPublicationModal').style.display = 'none';
};
