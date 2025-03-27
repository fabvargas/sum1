const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');
const loginButton = document.getElementById('login-btn');

const userError = document.querySelector('.error-user');
const passError = document.querySelector('.error-pass');
const success = document.querySelector('.success');



userInput.addEventListener('focusout', (e) => {
  if(userInput.value.length == 0 || userInput.value.lengh > 30){
    userError.textContent = 'User must be between 1 and 30 characters'
  }
});

passInput.addEventListener('focusout', (e) => {
  if(passInput.value.length < 6 || passInput.value.lengh > 30){
    passError.textContent = 'Password must be between 6 and 30 characters'
  }
})




loginButton.addEventListener('click',(e)=> {
    e.preventDefault()
   const user = userInput.value
   const pass = passInput.value

   if(userInput.value.length == 0 || userInput.value.lengh > 30){
    return
  }

  if(passInput.value.length < 6 || passInput.value.lengh > 30){
    return
  }
   
 success.textContent = 'Login Success'
  localStorage.setItem('user', user)
  localStorage.setItem('pass', pass)
} )


