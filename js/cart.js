

const cartBtn = document.querySelector('.cart-btn');
const directionInput = document.getElementById('direction-cart');
const telInput = document.getElementById('tel-cart');
const errorDirec = document.getElementById('error-direc');
const errorTel = document.getElementById('error-tel');
const successMessage = document.getElementById('success-message');


console.log(directionInput)

directionInput.addEventListener('focusout', () => {
    if (directionInput.value === '') {
        errorDirec.textContent = 'Infresar una dirección valida.';
       
    } else {
        errorDirec.textContent = '';
        
    }
}
);

telInput.addEventListener('focusout', () => {
    if (telInput.value === '') {
        errorTel.textContent = 'Ingresar un teléfono valido.';
       
    } else {
        errorTel.textContent = '';
        
    }
}
);


cartBtn.addEventListener('click', (e) => {
    e.preventDefault();


    const direction = directionInput.value;
    const tel = telInput.value;
    const errorDirec = document.getElementById('error-direc');
    const errorTel = document.getElementById('error-tel');
    
    if (direction === '') {
        errorDirec.textContent = 'Infresar una dirección valida.';
        return;
    } else {
        errorDirec.textContent = '';
    }
    
    if (tel === '') {
        errorTel.textContent = 'Ingresar un teléfono valido.';
        return;
    } else {
        errorTel.textContent = '';
    }
    
  
    successMessage.textContent = 'Gracias por tu compra.';
}
);
