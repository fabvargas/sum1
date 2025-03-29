
const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const repeatInput = document.getElementById('repeat');



const emailError = document.getElementById('error-email');
const passError = document.getElementById('error-pass');
const repeatError = document.getElementById('error-repeat');



const emailFormat = (value) => {

    return value.includes('@') && value.includes('.') && value.indexOf('@') < value.indexOf('.') && value.length > 5;
}

const passLength = (value) => {
    return value.length >= 6 && value.length < 30;
}


const passwordsMatch = (pass, repeat) => {
    return pass == repeat;
}





emailInput.addEventListener('focusout', () => {
    emailFormat(emailInput.value) ? emailError.textContent = "" :  emailError.textContent = 'El correo electrónico no es válido';
    
});

passInput.addEventListener('focusout', () => {
    passLength(passInput.value) ? passError= "" : passError.textContent = 'La contraseña debe tener entre 6 y 30 caracteres';
    
});

repeatInput.addEventListener('focusout', () => {
passwordsMatch(passInput.value, repeatInput.value) ? repeatError.textContent = "" : repeatError.textContent = 'Las contraseñas no coinciden';
    
});



formButton.addEventListener('click', (e) => {
    e.preventDefault();


    const email = emailInput.value;
    const pass = passInput.value;
    const repeat = repeatInput.value;


    if (

        !passLength(pass) ||
       ! emailFormat(email) ||
        !passwordsMatch(pass, repeat) 
    ) {
        return;
    }


    successMessage.textContent = 'Email enviado';
});
