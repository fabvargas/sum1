const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');
const loginButton = document.getElementById('form-btn');
const userError = document.getElementById('error-user');
const passError = document.getElementById('error-pass');
const success = document.querySelector('.success');



const userLength =(value)=>{
  return value.length > 0 && value.length < 30 
}

const passLength =(value)=>{
  return value.length >= 6 && value.length < 30
}




userInput.addEventListener('focusout', (e) => {
  
  userLength(userInput.value)  ? userError.textContent = '' : userError.textContent = 'Nombre de usuario bebe tener entre 1 a 30 caracteres' 

  
});

passInput.addEventListener('focusout', (e) => {
 
  passLength(passInput.value) ? passError.textContent = '' : passError.textContent = 'La contraseña debe tener entre 6 a 30 caracteres' 
})




loginButton.addEventListener('click',(e)=> {
    e.preventDefault()

   if(
    !userLength(userInput.value) ||
    !passLength(passInput.value)
   )return;
   
   success.textContent = 'Login Success'

} )


