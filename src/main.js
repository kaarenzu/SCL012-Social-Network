import { signIn, createUser, ingresarGoogle, deletePost, editPost} from './lib/index.js';
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
document.getElementById('gmail').addEventListener('click', ingresarGoogle);
//<-------------Link crea tu cuenta aquí-------------->
document.getElementById('crearCuenta').addEventListener('click', () => {
	contenido.innerHTML = '';
	contenido.innerHTML = `
	<div class="container">	
		<div>
    	<img src="img/logo tech.png"class="logo">
    	</div>
    	<div class="login">
			<h1>Crea tu cuenta</h1>
				<form>
					<input type="text" name="" id="nombre" placeholder="Nombre*" class="input" requiere>
    				<input type="text" name=""  id="apellido" placeholder="Apellido" class="input"requiere>
    				<input type="email" name="" id="email" placeholder="Correo electrónico*" class="input"requiere>
    				<input type="password" name="" id="password" placeholder="**************" class="input"requiere>
					<p>Contraseña debe tener mínimo 8 caracteres.</p>
					<p>Campos con * son obligatorios.</p>
					<button id="registrarse" class="btn">Registrarse</button>
				</form>
		</div>
	<div>
		`;
	//<-------------Crear Usuario-------------->
	document.getElementById('registrarse').addEventListener('click', (e) => {
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		e.preventDefault();
		createUser(email, password);
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
			var displayName = user.displayName;
			var email = user.email;
			console.log('*****************');
			console.log(user.emailerified);
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
		window.location.hash = '/Home';
		contenido.innerHTML = `
		
	<!------------ Menú de navegación ----------->
    <section class="title">
        <h1>TIPS TECH</h1>
    </section>
    <header>
        <nav class="navegacion">
            <ul class="menu">
                <li class="first-item">
                    <a href="">
                        <img src="img/01.png" alt="" class="imagen">
                        <span class="text-item">Inicio</span>
                        <span class="down-item"></span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img src="img/02.png" alt="" class="imagen">
                        <span class="text-item">Computación</span>
                        <span class="down-item"></span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img src="img/03.png" alt="" class="imagen">
                        <span class="text-item">Videojuegos</span>
                        <span class="down-item"></span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img src="img/04.png" alt="" class="imagen">
                        <span class="text-item">Celulares</span>
                        <span class="down-item"></span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img src="img/05.png" alt="" class="imagen">
                        <span class="text-item">Accesorios</span>
                        <span class="down-item"></span>
                    </a>
                </li>
                <li id="cerrarSesion">
                    <a href="">
                        <img src="img/06.png" alt="" class="imagen">
                        <span class="text-item">Mi sesión</span>
                        <span class="down-item"></span>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
		
   <!----------------- Escribe aquí tu publicación  --------------------->
	<div class="contenedor">
		<div class="divPrincipalImg">
			<img src="img/iconopost.png" class="icono-post">
			<div class="divPrincipalPublicar">
				<textarea id="post" class="inputPost" type="text"></textarea>
			</div>
			<img id="publicar" src="./img/publicar.png" class="btn-publicar">
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

function guardarPost() {

	document.getElementById('publicar').addEventListener('click', () => {
		let writePost = document.getElementById('post').value;

		db.collection("post").add({
			mensaje: writePost,
			datatime: new Date(),
			like: 0
		})
			.then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				document.getElementById('post').value = ''; //para que después de enviar los datos se vacié el input
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});

	});
}

function mostrarPost() {
	//<!----------------Lee los datos y los imprime-------------------->
	let collecionPost = db.collection("post");

	let collecionPostOrdenada = collecionPost.orderBy("datatime", "desc");


	collecionPostOrdenada.onSnapshot((querySnapshot) => {

		let mostrar = document.getElementById('mostrar');
		mostrar.innerHTML = '';
		querySnapshot.forEach((doc) => {

			// <!----------------- Post dinámicos  --------------------->
			mostrar.innerHTML += `
		<div class="postDinamico">
		<div class="divPrincipalImg">
		<img src="img/iconopost.png" class="icono-post">
		<div class="divPrincipalPublicar">
			<textarea id="inputPost" class="inputPost" type="text">${doc.data().mensaje}</textarea>
			<div id="editContainer-${doc.id}" class="containerEditHide" >
					<a id="confirmEdit-${doc.id}" class="tips-font">Confirmar</a>
					<a class="tips-font">Cancelar</a>
			</div>
		</div class="contenedor-iconos">
		<img id="delete-${doc.id}" src="./img/eliminar.png" class="btn-eliminar">
		<img id="edit-${doc.id}" src="./img/editar.png" class="btn-editar">
		<img src="./img/megusta.png" class="btn-megusta">
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
			document.getElementById(`confirmEdit-${doc.id}`).addEventListener('click', () => editPost(doc.id,document.getElementById('inputPost').value));
			
			// <!----- Función likes Post  ------>
			//document.getElementById(`like-${doc.id}`).addEventListener('click', () => editPost());
		});
		
	})
}



