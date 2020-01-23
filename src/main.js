import { signIn, createUser, ingresarGoogle} from './lib/index.js';

let contenido = document.getElementById('root');
var db = firebase.firestore();
mostrarLogin();

function mostrarLogin() {
	window.location.hash = '/Inicio';
	contenido.innerHTML = `	
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
	contenido.innerHTML =
		`<div>
    <img src="img/logo tech.png"class="logo">
    </div>
    <div class="login">
		<h1>Crea tu cuenta</h1>
			<form>
				<input type="text" name="" id="nombre" placeholder="Nombre" class="input" requiere>
    			<input type="text" name=""  id="apellido" placeholder="Apellido" class="input"requiere>
    			<input type="email" name="" id="email" placeholder="Usuario o correo electrónico" class="input"requiere>
    			<input type="password" name="" id="password" placeholder="**************" class="input"requiere>
				<p>Contraseña debe tener mínimo 8 caracteres.</p>
				<p>Campos con * son obligatorios.</p>
				<button id="registrarse" class="btn">Registrarse</button>
			</form>
	</div>`;
	//<-------------Crear Usuario-------------->
	document.getElementById('registrarse').addEventListener('click', (e) => {
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		e.preventDefault();
		createUser(email, password);	
		let nombre= document.getElementById('nombre').value;
		let apellido= document.getElementById('apellido').value;

		let db = firebase.firestore();

		db.collection("users").add({
		  nombre: nombre,
		  apellido:apellido
	  })
	  .then(function(docRef) {
		  console.log("Document written with ID: ", docRef.id);
			document.getElementById('nombre').value= '';
			document.getElementById('apellido').value= '';
			document.getElementById('email').value= '';
			document.getElementById('password').value= '';
	  })
	  .catch(function(error) {
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
			<img src="img/iconopost.png" style="width: 40px; height:40px">
			<div class="divPrincipalPublicar">
				<input id="post" class="inputPost" type="text">
			</div>
			<img id="publicar" src="./img/publicar.png"
				style="width: 35px; height:35px; position: absolute; right: 0; bottom: 0; margin-right: 60px; margin-bottom: 10px;">
		</div>
	</div>
	
		`;
		//<----------------Agregar documentos-------------------->
		document.getElementById('publicar').addEventListener('click', () => {
			let writePost=document.getElementById('post').value;
			db.collection("post").add({
				mensaje: writePost
			})
			.then(function(docRef) {
				console.log("Document written with ID: ", docRef.id);
				document.getElementById('post').value=''; //para que después de enviar los datos se vacié el input
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		})
		//<!----------------Lee los datos y los imprime-------------------->
		db.collection("post").onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
			// <!----------------- Post dinámicos  --------------------->
				contenido.innerHTML+=`
			<div class="postDinamico">
			<div class="divPrincipalImg">
			<img src="img/iconopost.png" style="width: 40px; height:40px">
			<div class="divPrincipalPublicar">
				<input class="inputPost" type="text" value="${doc.data().mensaje}">
			</div>
			<img src="./img/publicar.png"
				style="width: 35px; height:35px; position: absolute; right: 0; bottom: 0; margin-right: 60px; margin-bottom: 10px;">
			<img src="./img/publicar.png"
				style="width: 35px; height:35px; position: absolute; right: 0; bottom: 0; margin-right: 105px; margin-bottom: 10px;">
			<img src="./img/publicar.png"
				style="width: 35px; height:35px; position: absolute; right: 0; bottom: 0; margin-right: 150px; margin-bottom: 10px;">
			</div>
			</div>
				`
				console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
			});
		});
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


