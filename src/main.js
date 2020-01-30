import { signIn, createUser, ingresarGoogle, deletePost, editPost, postLike } from './lib/index.js';
import { mostrarLogin } from './lib/views.js';
let contenido = document.getElementById('root');
let db = firebase.firestore();
mostrarLogin();

//<-------------Iniciar Sesión-------------->
document.getElementById('ingresar').addEventListener('click', (e) => {
	console.log('entró el click')
	let email2 = document.getElementById('email2').value;
	let password2 = document.getElementById('password2').value;
	e.preventDefault();
	signIn(email2, password2);

});
//<-------------Ingresar con Google-------------->
document.getElementById('gmail').addEventListener('click', ingresarGoogle)
//<-------------Link crea tu cuenta aquí-------------->
document.getElementById('crearCuenta').addEventListener('click', () => {
	contenido.innerHTML = '';
	contenido.innerHTML = `
		<div class="container">
		
        <div class="logo">
		<img src="img/logo tech.png">
        </div>
		
        <div class="login">
		
		<h1>Crea tu cuenta</h1>
		<input type="text" id="nombre" placeholder="Nombre*" class="datos" requiere>
		<input type="text" id="apellido" placeholder="Apellido" class="datos" requiere>
		<input type="email" id="email" placeholder="Correo electrónico*" class="datos" requiere>
		<input type="password" id="password" placeholder="**************" class="datos" requiere>
		<p>Contraseña debe tener mínimo 8 caracteres.</p>
		<p>Campos con * son obligatorios.</p>
		<button id="registrarse" class="btn">Registrarse</button>
		
        </div>
    </div>
		`;

	// <-------------Crear Usuario-------------->
	document.getElementById('registrarse').addEventListener('click', (e) => {
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		let nombre = document.getElementById('nombre').value;
		let apellido = document.getElementById('apellido').value;

		let db = firebase.firestore();

		db.collection("users").add({
			nombre: nombre,
			apellido: apellido
		})
			.then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				document.getElementById('nombre').value = '';
				document.getElementById('apellido').value = '';
				document.getElementById('email').value = '';
				document.getElementById('password').value = '';
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});
		e.preventDefault();
		createUser(email, password);

	});
});
function observador() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log('existe usuario activo');
			mostrarHome(user);
			mostrarPost();
			guardarPost();
			// User is signed in.
			let displayName = user.displayName;
			let email = user.email;
			console.log('*****************');
			console.log(user.emailVerified);
			console.log('*****************');
			let emailVerified = user.emailVerified;
			let photoURL = user.photoURL;
			let isAnonymous = user.isAnonymous;
			let uid = user.uid;
			let providerData = user.providerData;
		} else {
			console.log('no existe usuario activo');
		}
	})
}
observador();

function mostrarHome(user) {
	if (user.emailVerified) {
		window.location.hash = '/Home';
		contenido.innerHTML = `
		
	<!------------ Menú de navegación ----------->
    <header>

        <div class="title">
            <h1>TIPS TECH</h1>
        </div>

        <input type="checkbox" id="btn-menu">
        <label for="btn-menu"><i class="icono fas fa-bars"></i></label>

        <nav class="menu">
            <ul>
                <li><a href="">Inicio</a></li>
                <li><a href="">Computación</a></li>
                <li><a href="">Videojuegos</a></li>
                <li><a href="">Celulares</a></li>
                <li><a href="">Accesorios</a></li>
                <li id="cerrarSesion"><a href="">Cerrar sesión</a></li>
            </ul>
        </nav>

    </header>
		
   <!----------------- Escribe aquí tu publicación  --------------------->
	<div class='contenedor'>
		<div class='divPrincipalImg'>
			<img src='img/iconopost.png' class='icono-post'>
			<div class='divPrincipalPublicar'>
				<textarea id='post' class='inputPost' type='text'></textarea>
			</div>
			<img id='publicar' src='./img/publicar.png' class='btn-publicar'>
		</div>
	</div>
	
		`;
		// <-------------Función botón Cerrar Sesión-------------->
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

function guardarPost() {

	document.getElementById('publicar').addEventListener('click', () => {
		let writePost = document.getElementById('post').value;
		db.collection('post').add({
			mensaje: writePost,
			datatime: new Date(),
			like: []
		})
			.then(function (docRef) {
				console.log('Document written with ID: ', docRef.id);
				document.getElementById('post').value = ''; //para que después de enviar los datos se vacié el input
			})
			.catch(function (error) {
				console.error('Error adding document: ', error);
			});

	});
}

function mostrarPost() {
	// <!----------------Lee los datos y los imprime-------------------->
	let collecionPost = db.collection('post');

	let collecionPostOrdenada = collecionPost.orderBy('datatime', 'desc');


	collecionPostOrdenada.onSnapshot((querySnapshot) => {

		let mostrar = document.getElementById('mostrar');
		mostrar.innerHTML = '';
		querySnapshot.forEach((doc) => {

			// <!----------------- Post dinámicos  --------------------->
			mostrar.innerHTML += `
		<div class='postDinamico'>
		<div class='divPrincipalImg'>
		<img src='img/iconopost.png' class='icono-post'>
		<div class='divPrincipalPublicar'>
			<textarea id='inputPost' class='inputPost' type='text'>${doc.data().mensaje}</textarea>
			<div id='editContainer-${doc.id}' class='containerEditHide' >
					<a id='confirmEdit-${doc.id}' class='tips-font'>Confirmar</a>
					<a class='tips-font'>Cancelar</a>
			</div>
		</div class="contenedor-iconos">
		<img id="delete-${doc.id}" src="./img/eliminar.png" class="btn-eliminar">
		<img id="edit-${doc.id}" src="./img/editar.png" class="btn-editar">
		<img id="like-${doc.id}" src="./img/megusta.png" class="btn-megusta">
		<span id="numero-${doc.id}" class="numeros-megusta">${doc.data().like.length}</span>
		</div>
		</div>
			`;
			// console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
		});

		querySnapshot.forEach((doc) => {

			// <!----------------- función delete post  --------------------->
			document.getElementById(`delete-${doc.id}`).addEventListener('click', () => deletePost(db, doc.id));

			// <!-----Poner a la escucha cancel/confirm --- /Edit Post/  ------>	
			document.getElementById(`edit-${doc.id}`).addEventListener('click', () => {
				document.getElementById(`editContainer-${doc.id}`).className = 'containerEditShow';
			});

			// <!----- Función Edit Post  ------>
			document.getElementById(`confirmEdit-${doc.id}`).addEventListener('click', () => editPost(doc.id, document.getElementById('inputPost').value));

			// <!----- Función likes Post  ------>
			document.getElementById(`like-${doc.id}`).addEventListener('click', () => postLike(doc.id));
		});
	});
};

