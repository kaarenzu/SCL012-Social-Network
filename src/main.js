// // Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

let contenido = document.getElementById('root');
function mostrarLogin() {
	contenido.innerHTML =
		`<div>
		<img src="img/logo tech.png" class="logo">
	  	</div>
	  	<div class="login">
		<h1>Inicia sesión</h1>
		<form>
		  <input type="email" name="" id="email2" placeholder="  Usuario o correo electrónico" class="input" required>
		  <input type="password" name="" id="password2" placeholder="  **************" class="input" required>
		  <button id="ingresar" class="btn">Ingresar</button>
		</form>
		<button id="gmail" class="btn2">Gmail</button>
		<h2>¿Olvidaste tu contraseña? </h2> <a href="#" class="recuperar"> Recupérala Aquí</a>
		<h3> Crea tu cuenta</h3> <a id="crearCuenta" class="aqui">Aquí</a>
	  </div>`;
}
//<-------------Inicia Sesión-------------->
let ingresar = document.getElementById('ingresar');

ingresar.addEventListener('click', (e) => {
	e.preventDefault();
	console.log('entro click');
	let email2 = document.getElementById('email2').value;
	let password2 = document.getElementById('password2').value;
	firebase.auth().signInWithEmailAndPassword(email2, password2)
		.then((response) => {	
		mostrarHome();
		})
		.catch(function (error) {
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

	//<-------------Crear Usuario-------------->
	document.getElementById('registrarse').addEventListener('click', (e) => {
		e.preventDefault();
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((response) => {
				verificar();
				alert('Su usuario ha sido creado correctamente, por favor verifica tu correo para poder continuar')
			})
			.catch(function (error) {
				alert('Upps!! Su usuario no ha sido creado correctamente, por favor intentalo nuevamente')
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
			mostrarHome(user);
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			console.log('*****************');
			console.log(user.emailVerified);
			console.log('*****************');
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
function mostrarHome(user) {
	if (user.emailVerified) {
		contenido.innerHTML = `
		<header>
			<nav>
			<img src = "img/logoblanco.png" class= "imagenes">
				<ul>
					<li><a href= "#"class= "btnMenu">Inicio </a> </li>
					<li><a href= "#"class= "btnMenu">Computación</a></li>
					<li><a href= "#"class= "btnMenu"> Videojuegos</a></li>
					<li><a href= "#"class= "btnMenu">Accesorios</a></li>
					<li><a href= "#" class= "btnMenu">Publica tus ventas</a> </li>
					<img src = "img/cerrablanco.png" class= "cerrar"id="cerrarSesion">
				</ul>
			</nav> 
		</header>
			<div class= "contenedor"> 
		<div class= "icono">
		<img src = "img/icono-imagen.png" class= "iconos">
		 </div>
		<div class= "poster">
		<input type="text" id="post" class="post" >
		 </div>
		 <div class= "like">
		 <img src = "img/like.png" class= "like" id= "like">
		 </div>
		 <div class= "comentario">
		 <img src = "img/comment.png" class= "comentar" id= "comentar">
		 </div>                                                     

		</div>		
		
		`;
		//<-------------Función botón Cerrar Sesión-------------->
		document.getElementById('cerrarSesion').addEventListener('click', () => {
			firebase.auth().signOut()
				.then(function () {
					mostrarLogin();
					console.log('Saliendo...')
				})
				.catch(function (error) {
					console.log(error);
				})
		});
	}
};
//<-------------Función mensaje de verificaión usuario-------------->
function verificar() {
	console.log('entor a verificar');
	let user = firebase.auth().currentUser;

	user.sendEmailVerification()
		.then(function () {
			console.log('enviando correo...');
		}).catch(function (error) {
			console.log('error');
		});
}