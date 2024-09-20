
                //manejar los campos de arrastre de documento
                
                // Selección de los elementos del DOM
                const fileInputDoc = document.getElementById('file-upload');
                const dropAreaDoc = document.getElementById('drop-area');
                const fileInputImg = document.getElementById('image-upload');
                const dropAreaImg = document.getElementById('drop-area-img');
            
                // Función para mostrar el nombre del archivo en la zona de arrastre
                function showFileName(inputElement, dropAreaElement) {
                    inputElement.addEventListener('change', function() {
                        if (inputElement.files.length > 0) {
                            const fileNames = Array.from(inputElement.files).map(file => file.name).join(', ');
                            dropAreaElement.textContent = fileNames;
                        }
                    });
                }
            
                // Aplicar la función tanto al campo de documento como de imagen
                showFileName(fileInputDoc, dropAreaDoc);
                showFileName(fileInputImg, dropAreaImg);
            
                // Añadir eventos para cambiar la apariencia cuando se arrastra un archivo
                ['dragenter', 'dragover'].forEach(eventName => {
                    dropAreaDoc.addEventListener(eventName, (e) => {
                        e.preventDefault();
                        dropAreaDoc.classList.add('hover');
                    });
                    dropAreaImg.addEventListener(eventName, (e) => {
                        e.preventDefault();
                        dropAreaImg.classList.add('hover');
                    });
                });
            
                ['dragleave', 'drop'].forEach(eventName => {
                    dropAreaDoc.addEventListener(eventName, (e) => {
                        e.preventDefault();
                        dropAreaDoc.classList.remove('hover');
                    });
                    dropAreaImg.addEventListener(eventName, (e) => {
                        e.preventDefault();
                        dropAreaImg.classList.remove('hover');
                    });
                });



                // fech para treer los cintos al select
                document.addEventListener('DOMContentLoaded', () => {
                    const cintoSelect = document.getElementById('cinto');
            
                    // Realizar la solicitud al endpoint
                    fetch('http://localhost:3000/cintos')
                        .then(response => response.json())
                        .then(data => {
                            // Iterar sobre los datos y crear opciones para el select
                            data.forEach(cinto => {
                                const option = document.createElement('option');
                                option.value = cinto.id_cinto;
                                option.textContent = cinto.descripcion;
                                cintoSelect.appendChild(option);
                            });
                        })
                        .catch(error => {
                            console.error('Error al cargar los cintos:', error);
                        });
                });
            
                // fech para treer las escuelas al select
                document.addEventListener('DOMContentLoaded', () => {
                    const escuelaSelect = document.getElementById('escuela');
            
                    // Realizar la solicitud al endpoint
                    fetch('http://localhost:3000/escuela')
                        .then(response => response.json())
                        .then(data => {
                            // Iterar sobre los datos y crear opciones para el select
                            data.forEach(escuela => {
                                const option = document.createElement('option');
                                option.value = cinto.id_escuela;
                                option.textContent = escuela.nombre;
                                escuelaSelect.appendChild(option);
                            });
                        })
                        .catch(error => {
                            console.error('Error al cargar las Escuelas:', error);
                        });
                });
            















// Validación del formulario
function validateForm(event) {
    event.preventDefault(); // Evita que el formulario se envíe hasta que sea válido
    let isValid = true;

    // Función auxiliar para mostrar/ocultar mensajes de error
    function toggleError(input, errorElement, condition) {
        if (condition) {
            input.classList.add('is-invalid');
            errorElement.style.display = 'block';
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            errorElement.style.display = 'none';
        }
    }

    // Validación de datos personales
    const firstName = document.getElementById('firstName');
    const firstNameError = document.getElementById('firstNameError');
    toggleError(firstName, firstNameError, !firstName.value.match(/^[A-Za-z]{4,16}$/));

    const lastName = document.getElementById('lastName');
    const lastNameError = document.getElementById('lastNameError');
    toggleError(lastName, lastNameError, !lastName.value.match(/^[A-Za-z]{4,16}$/));

    const dni = document.getElementById('dni');
    const dniError = document.getElementById('dniError');
    toggleError(dni, dniError, !dni.value.match(/^\d{8}$/));

    const dob = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    toggleError(dob, dobError, !dob.value);

    const bloodGroup = document.getElementById('bloodGroup');
    const bloodGroupError = document.getElementById('bloodGroupError');
    toggleError(bloodGroup, bloodGroupError, !bloodGroup.value.match(/^(A|B|AB|O)[+-]$/));

    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    toggleError(phone, phoneError, !phone.value.match(/^\d{10}$/));

    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    toggleError(email, emailError, !email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/));

    const address = document.getElementById('address');
    const addressError = document.getElementById('addressError');
    toggleError(address, addressError, !address.value);

    // Validación de datos del tutor
    const tutorDNI = document.getElementById('tutorDNI');
    const tutorDNIError = document.getElementById('tutorDNIError');
    toggleError(tutorDNI, tutorDNIError, !tutorDNI.value.match(/^\d{8}$/));

    const tutorFirstName = document.getElementById('tutorFirstName');
    const tutorFirstNameError = document.getElementById('tutorFirstNameError');
    toggleError(tutorFirstName, tutorFirstNameError, !tutorFirstName.value.match(/^[A-Za-z]{4,16}$/));

    const tutorLastName = document.getElementById('tutorLastName');
    const tutorLastNameError = document.getElementById('tutorLastNameError');
    toggleError(tutorLastName, tutorLastNameError, !tutorLastName.value.match(/^[A-Za-z]{4,16}$/));

    const relationship = document.getElementById('relationship');
    const relationshipError = document.getElementById('relationshipError');
    toggleError(relationship, relationshipError, !relationship.value.match(/^[A-Za-z\s]{4,16}$/));

    const tutorPhone = document.getElementById('tutorPhone');
    const tutorPhoneError = document.getElementById('tutorPhoneError');
    toggleError(tutorPhone, tutorPhoneError, !tutorPhone.value.match(/^\d{10}$/));

    if (isValid) {
        // Si el formulario es válido, puedes enviarlo
        alert("Formulario enviado con éxito");
        // Aquí puedes agregar el código para enviar el formulario
    } else {
        // En caso de que haya errores, mostrar un mensaje de error
        
    }
}

// Asigna el evento 'submit' al formulario
document.querySelector('.user-form').addEventListener('submit', validateForm);
