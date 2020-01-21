import { signIn, createUser} from './lib/index.js';

let contenido = document.getElementById('root');
function mostrarLogin() {
	window.location.hash='/Inicio';
	contenido.innerHTML =`	
		<div>
			<img src="img/logo tech.png" class="logo">
	  	</div>
	  	<div class="login">
			<h1>Inicia sesión</h1>
			<form>
		  		<input type="email" name="" id="email2" placeholder=" Correo electrónico" class="input" required>
		  		<input type="password" name="" id="password2" placeholder=" **************" class="input" required>
		  		<button id="ingresar" class="btn">Ingresar</button>
			</form>
				<button id="gmail" class="btn2">Gmail</button>
				<a href="#" class="recuperar">¿Olvidaste tu contraseña? Recupérala Aquí</a>
      			<a href="#" id="crearCuenta" class="aqui">Crear cuenta aquí</a> 
	  	</div>`;
}
//<-------------Iniciar Sesión-------------->
document.getElementById('ingresar').addEventListener('click', (e) => {
	console.log('entró el click')
	let email2=document.getElementById('email2').value;
	let password2=document.getElementById('password2').value;
	e.preventDefault();
	signIn(email2, password2);
});
//<-------------Link crea tu cuenta aquí-------------->
document.getElementById('crearCuenta').addEventListener('click', () => {
	contenido.innerHTML = '';
	contenido.innerHTML =
		`<div>
    <img src="img/logo tech.png"class="logo">
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
		createUser(email, password);
	});
});
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
		} else {
			console.log('no existe usuario activo');
		}
	})
}
observador();

function mostrarHome(user) {
	if (user.emailVerified) {
		window.location.hash='/Home';
		contenido.innerHTML = `
		<header>
			<nav>
				<img src="img/logoblanco.png" class="imagenes">
				<ul>
					<li><a class="btnMenu">Inicio </a></li>
					<li><a class="btnMenu">Computación</a></li>
					<li><a class="btnMenu"> Videojuegos</a></li>
					<li><a class="btnMenu">Celulares</a></li>
					<li><a class="btnMenu">Accesorios</a></li>
				</ul>
			<img src="img/cerrablanco.png" class="cerrar"id="cerrarSesion">
			</nav> 
		</header>

		<div class="contenedor"> 
			<div>
				<img src="img/icono-imagen.png" class="iconos">
			</div>

			<div>
				<input type="text" id="post" class="post">
			</div>

			<div>
				<img src="img/like.png" class="like" id="like">
			</div>

			<div>
				<img src="img/comment.png" class="comentar" id="comentar">
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


