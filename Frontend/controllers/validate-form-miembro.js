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
        // Llamada para actualizar datos del alumno
        updateAlumno(dni.value);

        // Llamada para subir la imagen del alumno
        uploadImage(dni.value);

        // Llamada para actualizar datos del tutor
        updateTutor(tutorDNI.value);
    }
}

    
   



// Actualiza los datos del alumno
async function updateAlumno(dni) {
    const data = {
        email: document.getElementById('email').value,
        direccion: document.getElementById('address').value,
        dni_tutor: document.getElementById('tutorDNI').value,
        id_escuela: document.getElementById('escuela').value,
        id_cinto: document.getElementById('cinto').value,
        telefono: document.getElementById('phone').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/miembros/${dni}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  
        });

        if (response.ok) {
            alert('Datos del alumno actualizados con éxito');
        } else {
            alert('Error al actualizar los datos del alumno');
        }
    } catch (error) {
        console.error('Error al actualizar datos del alumno:', error);
        alert('Ocurrió un error al actualizar los datos del alumno');
    }
}


// Sube la imagen del alumno
async function uploadImage(dni) {
    const imageInput = document.getElementById('image-upload'); // Se cambió a 'image-upload'
    const formData = new FormData();
    formData.append('imagen', imageInput.files[0]); // Asegurarse de que la imagen esté seleccionada

    try {
        const response = await fetch(`${API_BASE_URL}/miembros/${dni}/cargaImagen`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Imagen subida con éxito');
        } else {
            alert('Error al subir la imagen');
        }
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Ocurrió un error al subir la imagen');
    }
}

// Actualiza los datos del tutor
async function updateTutor(tutorDNI) {
    const tutorData = {
        dni_tutor: tutorDNI,
        nombre: document.getElementById('tutorFirstName').value,
        apellido: document.getElementById('tutorLastName').value,
        telefono: document.getElementById('tutorPhone').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/tutores/${tutorDNI}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutorData)
        });

        if (response.ok) {
            alert('Datos del tutor actualizados con éxito');
        } else {
            alert('Error al actualizar los datos del tutor');
        }
    } catch (error) {
        console.error('Error al actualizar datos del tutor:', error);
        alert('Ocurrió un error al actualizar los datos del tutor');
    }
}

// Asigna el evento 'submit' al formulario
document.getElementById('user-form').addEventListener('submit', validateForm);
