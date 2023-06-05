const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const admin = document.getElementById('admin');
const loginform = document.getElementById('login');
const signupform = document.getElementById('signup');
const adminFormm = document.getElementById('adminForm');

login.addEventListener('click', loginForm);
signup.addEventListener('click', signupForm);
admin.addEventListener('click', adminForm);

function adminForm(e){
    e.preventDefault()
    login.classList.remove('active');
    signup.classList.remove('active');
    adminFormm.style.display="block"
}

function loginForm() {
	login.classList.add('active');
    signup.classList.remove('active');
	signupform.style.display="none"
loginform.style.display="block"
}


function signupForm() {
    signup.classList.add('active');
	login.classList.remove('active');
	signupform.style.display="block";
     loginform.style.display="none";

}

