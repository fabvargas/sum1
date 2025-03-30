
const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const repeatInput = document.getElementById('repeat');



const emailError = document.getElementById('error-email');
const passError = document.getElementById('error-pass');
const repeatError = document.getElementById('error-repeat');

const formButton = document.getElementById('form-btn');
const successMessage = document.getElementById('success');



const emailFormat = (value) => {

    return value.includes('@') && value.includes('.') && value.indexOf('@') < value.indexOf('.') && value.length > 5;
}

const passWithUppercase = (value) => {
    return value != value.toLowerCase();
}

const passWithSpecialChar = (value) => {
    const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ',', '.', '?', ':', '"', '{', '}', '|', '<', '>'];
    for (let i = 0; i < value.length; i++) {
        if (specialChars.includes(value.charAt(i))) {
            return true;
        }
    }
    return false;
}

const passWithNumber = (value) => {
    for (let i = 0; i < value.length; i++) {
        if (!isNaN(value[i])) {
            return true;
        }
    }
    return false;
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
    
    if (!passLength(passInput.value)) {
        passError.textContent = 'La contraseña debe tener entre 6 y 30 caracteres';
    }
   
    else if (!passWithUppercase(passInput.value)) {
        passError.textContent = 'La contraseña debe tener al menos una mayúscula';
    }
  
    else if (!passWithNumber(passInput.value)) {
        passError.textContent = 'La contraseña debe tener al menos un número';
    }
   
    else if (!passWithSpecialChar(passInput.value)) {
        passError.textContent = 'La contraseña debe tener al menos un carácter especial';
    }
   
    else {
        passError.textContent = ''; 
    }
    
    
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
