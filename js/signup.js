const userInput = document.getElementById('user');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const repeatInput = document.getElementById('repeat');
const dateInput = document.getElementById('date');
const formButton = document.getElementById('form-btn');

const userError = document.getElementById('error-user');
const emailError = document.getElementById('error-email');
const passError = document.getElementById('error-pass');
const repeatError = document.getElementById('error-repeat');
const dateError = document.getElementById('error-date');
const successMessage = document.getElementById('success');



const userLength = (value) => {
    return value.length > 0 && value.length < 30;
}

const emailFormat = (value) => {

    return value.includes('@') && value.includes('.') && value.indexOf('@') < value.indexOf('.') && value.length > 5;
}

const passLength = (value) => {
    return value.length >= 6 && value.length < 30;
}


const passwordsMatch = (pass, repeat) => {
    return pass == repeat;
}

const overEighteen = (value) => {
     const birthDate = new Date(value);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1;
    }
    return age >= 18;
    
}


userInput.addEventListener('focusout', () => {
    userLength(userInput.value) ? userError.textContent = '' : userError.textContent = 'El nombre de usuario debe tener entre 1 y 30 caracteres' ;
});

emailInput.addEventListener('focusout', () => {
    emailFormat(emailInput.value) ? emailError.textContent = "" :  emailError.textContent = 'El correo electrónico no es válido';
    
});

passInput.addEventListener('focusout', () => {
    passLength(passInput.value) ? passError= "" : passError.textContent = 'La contraseña debe tener entre 6 y 30 caracteres';
    
});

repeatInput.addEventListener('focusout', () => {
passwordsMatch(passInput.value, repeatInput.value) ? repeatError.textContent = "" : repeatError.textContent = 'Las contraseñas no coinciden';
    
});

dateInput.addEventListener('focusout', () => {
    dateError.textContent = '';
    if (!dateInput.value) {
        dateError.textContent = 'La fecha es obligatoria';
    } else if (!overEighteen(dateInput.value)) {
        dateError.textContent = 'Debes tener al menos 18 años';
    }
});


formButton.addEventListener('click', (e) => {
    e.preventDefault();

    const user = userInput.value;
    const email = emailInput.value;
    const pass = passInput.value;
    const repeat = repeatInput.value;
    const date = dateInput.value;

    if (
        !userLength(user) || 
        !passLength(pass) ||
       ! emailFormat(email) ||
        !passwordsMatch(pass, repeat) ||
        !date || 
        !overEighteen(date)
    ) {
        return;
    }


    successMessage.textContent = 'Registro Exitoso';
});
