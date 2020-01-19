// // Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();
let contenido = document.getElementById('root');
function mostrarLogin(){
	contenido.innerHTML =
					`<div>
      <img src="img/logo tech.png"class="logo" >
     </div>
     <div class="login">
    	<h1>Inicia Sesión</h1>
    	<input type="email" name="" id="email2" placeholder="Usuario o correo electrónico" class="input">
    	<input type="password" name="" id="password2" placeholder="**************" class="input">
		<button id="ingresar" class="btn">Ingresar</button>
		<button id="gmail" class="btn2">Gmail</button>
		<h2 > ¿Olvidaste tu contraseña?</h2><a  href="#" class="recuperar">Recupérala Aquí</a>
		<h3> Crea tu cuenta</h3> <a href="#"class="aquí">Aqui</a>
    </div>`;
}

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
//<-------------Link crea tu cuenta aquí-------------->
document.getElementById('crearCuenta').addEventListener('click', () => {
	contenido.innerHTML = '';
	contenido.innerHTML =
		`<div>
    <img src="img/logo tech.png"class="logo" >
    </div>
    <div class="login">
		<h1>Crea tu cuenta</h1>
		<form>
		<input type="text" name="" placeholder="Nombre" class="input" requiere>
    	<input type="text" name=""  placeholder="Apellido" class="input"requiere>
    	<input type="email" name="" id="email" placeholder="Usuario o correo electrónico" class="input"requiere>
    	<input type="password" name="" id="password" placeholder="**************" class="input"requiere>
		<p>Contraseña debe tener mínimo 8 caracteres.</p>
		<p>Campos con * son obligatorios.</p>
		<button id="registrarse" class="btn">Registrarse</button>
		</form>
	</div>`;
	
//<-------------Botón Registrarse-------------->
	document.getElementById('registrarse').addEventListener('click', () => {
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((response) => {
				alert('Su usuarios ha sido creado correctamente')
				aparece();
				console.log(response);
			})
			.catch(function (error) {
				alert('Su usuarios no ha sido creado correctamente, por favor intentalo nuevamente')
				mostrarLogin();
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log(errorCode);
				console.log(errorMessage);
			});
	})
})


function observador() {
	firebase.auth().onAuthStateChanged(function (user) {
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
function aparece() {
	contenido.innerHTML = `
    <header>
        <nav>
        <img src = "img/logoblanco.png" class= "imagenes">
            <ul>
                <li><a href= "#"class= "btnMenu">Inicio </a> </li>
                <li><a href= "#"class= "btnMenu">Computación</a></li>
                <li><a href= "#"class= "btnMenu"> Videojuegos</a></li>
                <li><a href= "#"class= "btnMenu">Accesorio </a></li>
				<li><a href= "#" class= "btnMenu">Publica tus ventas</a> </li>
				<li><a href= "#" class= "btnMenu"id="cerrarSesion">Cerrar Sesion</a></li>
            </ul>
        </nav> 
    </header>
	`;
	//<-------------Función botón Cerrar Sesión-------------->
	document.querySelector('#cerrarSesion').addEventListener('click', () => {
		firebase.auth().signOut()
			.then(function () {
				contenido.innerHTML =
					`<div>
      <img src="img/logo tech.png"class="logo" >
     </div>
     <div class="login">
    	<h1>Inicia Sesión</h1>
    	<input type="email" name="" id="email2" placeholder="Usuario o correo electrónico" class="input">
    	<input type="password" name="" id="password2" placeholder="**************" class="input">
		<button id="ingresar" class="btn">Ingresar</button>
		<button id="gmail" class="btn2">Gmail</button>
		<h2 > ¿Olvidaste tu contraseña?</h2><a  href="#" class="recuperar">Recupérala Aquí</a>
		<h3> Crea tu cuenta</h3> <a href="#"class="aquí">Aqui</a>
    </div>`;

				console.log('Saliendo...')
			})
			.catch(function (error) {
				console.log(error);
			})
	})
};