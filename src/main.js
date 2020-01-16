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