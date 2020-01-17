// // Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();

//Registro de Usuarios
let btnEnviar = document.getElementById('enviar')

btnEnviar.addEventListener('click', () => {
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((response) => {
			console.log(response);
		})
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);
			console.log(errorMessage);
		});

});
//Ingreso de Usuarios
let acceder = document.getElementById('acceder');

acceder.addEventListener('click', () => {
	let email2 = document.getElementById('email2').value;
	let password2 = document.getElementById('password2').value;
	firebase.auth().signInWithEmailAndPassword(email2, password2)
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);
			console.log(errorMessage);
		});

});

function observador(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log('existe usuario activo');
			aparece();
		  // User is signed in.
		  var displayName = user.displayName;
		  var email = user.email;
		  var emailVerified = user.emailVerified;
		  var photoURL = user.photoURL;
		  var isAnonymous = user.isAnonymous;
		  var uid = user.uid;
		  var providerData = user.providerData;
		  // ...
		} else {
			console.log('no existe usuario activo');
		}
	  });email-password.html
}
observador();
function aparece(){
	let contenido=document.getElementById('root');
	contenido.innerHTML= `
    <p>Bienvenido a la Red Social</p>
	<button id="cerrarSesion">Cerrar Sesion</button>
	`;

let cerrarSesion=document.querySelector('#cerrarSesion');
cerrarSesion.addEventListener('click', () => {
	console.log('entro el click')
firebase.auth().signOut()
.then(function(){
	console.log('Saliendo...')
})
.catch(function(error){
	console.log(error);
})
})
};