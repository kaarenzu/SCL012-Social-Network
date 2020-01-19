// // Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();
let contenido=document.getElementById('root');

//Registro de Usuarios
// let btnEnviar = document.getElementById('enviar')

// btnEnviar.addEventListener('click', () => {
// 	let email = document.getElementById('email').value;
// 	let password = document.getElementById('password').value;
// 	firebase.auth().createUserWithEmailAndPassword(email, password)
// 		.then((response) => {
// 			console.log(response);
// 		})
// 		.catch(function (error) {
// 			// Handle Errors here.
// 			var errorCode = error.code;
// 			var errorMessage = error.message;

// 			console.log(errorCode);
// 			console.log(errorMessage); 
// 		});

// });
//Ingreso de Usuarios
let acceder = document.getElementById('ingresar');

ingresar.addEventListener('click', () => {
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
	  })
}
observador();
function aparece(){
	
	contenido.innerHTML= `
    <p>Bienvenido a la Red Social</p>
	<button id="cerrarSesion">Cerrar Sesion</button>
	`;

let cerrarSesion=document.querySelector('#cerrarSesion');

cerrarSesion.addEventListener('click', () => {
	console.log('entro el click')
firebase.auth().signOut()
.then(function(){

	contenido.innerHTML = `<div >
    <img src="img/logo tech.png"class="logo" >
   </div>
   <div class="login">
    <h1>Inicia Sesión</h1>
    <h2></h2>

    <input type="email" name="" id="email2" placeholder="Usuario o correo electrónico" class="input" >
    <input type="password" name="" id="password2" placeholder="**************" class="input">
    <button id="ingresar" class="btn">Ingresar</button>
	<button id="gmail" class="btn2">Gmail</button>
	<h2 > ¿Olvidaste tu contraseña?</h2><a  href="#" class="recuperar">Recupérala Aquí</a>
	<h3> Crea tu cuenta</h3> <a href="#"class="aquí">Aqui</a>
  </div>

 </div>`;

	console.log('Saliendo...')
})
.catch(function(error){
	console.log(error);
})
})
};