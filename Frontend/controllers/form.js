document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('formContainer');
    const loginForm = document.getElementById('loginForm');
    const step1Form = document.getElementById('step1Form');
    const step2Form = document.getElementById('step2Form');
    const step3Form = document.getElementById('step3Form');

    const nextToStep2 = document.getElementById('nextToStep2');
    const nextToStep3 = document.getElementById('nextToStep3');
    const backToStep1 = document.getElementById('backToStep1');
    const backToStep2 = document.getElementById('backToStep2');

    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const showLoginFromMenu = document.getElementById('showLoginFromMenu');

    function showStep(formToShow) {
        loginForm.style.display = 'none';
        step1Form.style.display = 'none';
        step2Form.style.display = 'none';
        step3Form.style.display = 'none';
        formToShow.style.display = 'block';
    }

    function validateStep1() {
        let isValid = true;

        const dni = document.getElementById('dni');
        const password = document.getElementById('registerPassword');
        const repeatPassword = document.getElementById('repeatPassword');

        // Validar DNI
        if (!/^\d{8}$/.test(dni.value)) {
            document.getElementById('dniError').style.display = 'block';
            dni.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('dniError').style.display = 'none';
            dni.classList.remove('is-invalid');
        }

        // Validar Contraseña
        if (password.value.length < 8) {
            document.getElementById('passwordError').style.display = 'block';
            password.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('passwordError').style.display = 'none';
            password.classList.remove('is-invalid');
        }

        // Validar Repetir Contraseña
        if (password.value !== repeatPassword.value) {
            document.getElementById('repeatPasswordError').style.display = 'block';
            repeatPassword.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('repeatPasswordError').style.display = 'none';
            repeatPassword.classList.remove('is-invalid');
        }

        return isValid;
    }

    function validateStep2() {
        let isValid = true;

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const dob = document.getElementById('dob');
        const phone = document.getElementById('phone');

        // Validar Nombre
        if (!/^[A-Za-z]{4,16}$/.test(firstName.value)) {
            document.getElementById('firstNameError').style.display = 'block';
            firstName.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('firstNameError').style.display = 'none';
            firstName.classList.remove('is-invalid');
        }

        // Validar Apellido
        if (!/^[A-Za-z]{4,16}$/.test(lastName.value)) {
            document.getElementById('lastNameError').style.display = 'block';
            lastName.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('lastNameError').style.display = 'none';
            lastName.classList.remove('is-invalid');
        }

        // Validar Fecha de Nacimiento
        if (!dob.value) {
            document.getElementById('dobError').style.display = 'block';
            dob.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('dobError').style.display = 'none';
            dob.classList.remove('is-invalid');
        }

        // Validar Teléfono
        if (!/^\d{10}$/.test(phone.value)) {
            document.getElementById('phoneError').style.display = 'block';
            phone.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('phoneError').style.display = 'none';
            phone.classList.remove('is-invalid');
        }

        return isValid;
    }

    function validateStep3() {
        let isValid = true;

        const tutorDNI = document.getElementById('tutorDNI');
        const tutorPhone = document.getElementById('tutorPhone');
        const tutorFirstName = document.getElementById('tutorFirstName');
        const tutorLastName = document.getElementById('tutorLastName');
        const relationship = document.getElementById('relationship');

        // Validar DNI del Tutor
        if (!/^\d{8}$/.test(tutorDNI.value)) {
            document.getElementById('tutorDNIError').style.display = 'block';
            tutorDNI.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('tutorDNIError').style.display = 'none';
            tutorDNI.classList.remove('is-invalid');
        }

        // Validar Teléfono del Tutor
        if (!/^\d{10}$/.test(tutorPhone.value)) {
            document.getElementById('tutorPhoneError').style.display = 'block';
            tutorPhone.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('tutorPhoneError').style.display = 'none';
            tutorPhone.classList.remove('is-invalid');
        }

        // Validar Nombre del Tutor
        if (!/^[A-Za-z]{4,16}$/.test(tutorFirstName.value)) {
            document.getElementById('tutorFirstNameError').style.display = 'block';
            tutorFirstName.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('tutorFirstNameError').style.display = 'none';
            tutorFirstName.classList.remove('is-invalid');
        }

        // Validar Apellido del Tutor
        if (!/^[A-Za-z]{4,16}$/.test(tutorLastName.value)) {
            document.getElementById('tutorLastNameError').style.display = 'block';
            tutorLastName.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('tutorLastNameError').style.display = 'none';
            tutorLastName.classList.remove('is-invalid');
        }

        // Validar Relación
        if (!/^[A-Za-z\s]{4,16}$/.test(relationship.value)) {
            document.getElementById('relationshipError').style.display = 'block';
            relationship.classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('relationshipError').style.display = 'none';
            relationship.classList.remove('is-invalid');
        }

        return isValid;
    }

    function collectFormData() {
        return {
            dni: document.getElementById('dni').value,
            password: document.getElementById('registerPassword').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            dob: document.getElementById('dob').value,
            phone: document.getElementById('phone').value,
            tutorDNI: document.getElementById('tutorDNI').value,
            tutorPhone: document.getElementById('tutorPhone').value,
            tutorFirstName: document.getElementById('tutorFirstName').value,
            tutorLastName: document.getElementById('tutorLastName').value,
            relationship: document.getElementById('relationship').value
        };
    }

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.classList.add('show-register');
        setTimeout(() => {
            showStep(step1Form);
        }, 300); // Tiempo igual al de la transición
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.classList.remove('show-register');
        setTimeout(() => {
            showStep(loginForm);
        }, 300); // Tiempo igual al de la transición
    });

    showLoginFromMenu.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.classList.remove('show-register');
        setTimeout(() => {
            showStep(loginForm);
        }, 300); // Tiempo igual al de la transición
    });

    nextToStep2.addEventListener('click', () => {
        if (validateStep1()) {
            showStep(step2Form);
        }
    });

    nextToStep3.addEventListener('click', () => {
        if (validateStep2()) {
            showStep(step3Form);
        }
    });

    backToStep1.addEventListener('click', () => {
        showStep(step1Form);
    });

    backToStep2.addEventListener('click', () => {
        showStep(step2Form);
    });

    document.querySelector('.btn-register').addEventListener('click', async (e) => {
        e.preventDefault();
        if (validateStep3()) {
            const formData = collectFormData();
            try {
                const response = await fetch('http://localhost:3000/miembros', { // Reemplaza con la URL de tu API
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    alert('Formulario enviado con éxito');
                    // Limpia los datos del formulario
                    document.querySelectorAll('input').forEach(input => input.value = '');
                    // Recarga la página para mostrar el formulario de inicio de sesión por defecto
                    setTimeout(() => location.reload(), 500);
                } else {
                    alert('Hubo un error al enviar el formulario');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert('Hubo un error al enviar el formulario');
            }
        }
    });
});
