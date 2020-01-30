let db = firebase.firestore();
//---------------Función para Iniciar Sesión------------------------>
export let signIn = (email2, password2) => {
	firebase.auth().signInWithEmailAndPassword(email2, password2)
		.then((response) => {
			console.log('paso el then');
		})
		.catch(function (error) {
			alert('Por favor ingresa tu correo y contraeña');
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
		});
}

//---------------Función para Crear Usuario------------------------>
export let createUser = (email, password) => {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((response) => {
			verificar();
			alert('Su usuario ha sido creado correctamente, por favor verifica tu bandeja de entrada en tu email')
		})
		.catch(function (error) {
			alert('Upps!! Su usuario no ha sido creado correctamente, por favor inténtalo nuevamente')
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
		});
}
//<-------------Función mensaje de verificaión usuario-------------->
function verificar() {
	console.log('entro a verificar');
	let user = firebase.auth().currentUser;

	user.sendEmailVerification()
		.then(function () {
			console.log('enviando correo...');
		}).catch(function (error) {
			console.log('error');
		});
};
// autentificacion con google 
export function ingresarGoogle() {
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
	firebase.auth().signInWithRedirect(provider);
	firebase.auth().getRedirectResult().then(function (result) {
		if (result.credential) {
			var token = result.credential.accessToken;
		}
		var user = result.user;
	}).catch(function (error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
};
//<-------------Función borrar post-------------->
export let deletePost = (db, id) => {
	if (confirm('¿Deseas eliminar esta publicación?')) {
		if (document.getElementById('delete-' + id) != null) {
			db.collection("post").doc(id).delete()
				.then(function () {
					console.log("Document successfully deleted!");
				}).catch(function (error) {
					console.error("Error removing document: ", error);
				});
		} else {
			console.log('Hay un problema con el id del post lo trae null');
		}
	}
};
//<-------------Función editar post-------------->
export let editPost = (id, writePost) => {
	db.collection('post').doc(id).update({
		mensaje: writePost,
		datatime: new Date()
	}).then(function () {
		console.log('document successfully updated!!');
	})
		.catch(function () {
			console.log('Error update document: ', error)
		});
};

//<-------------Función Likear post-------------->
export let postLike = (id) => {

	let user = firebase.auth().currentUser;	
	
	// de la collection post traeme el documento con el ID, "id"
	db.collection('post').doc(id).get().then((respuesta) => {

		let post = respuesta.data();

		if (post.like == null || post.like == '') {
			post.like = [];
			console.log("ento al like vacio");
		}

		if (post.like.includes(user.displayName)) {

			for (let i = 0; i < post.like.length; i++) {

				if (post.like[i] === user.displayName) { //verifica si ya el usuario está en el array

					post.like.splice(i, 1); // sentencia para eliminar un elemento de un array
					
					db.collection('post').doc(id).update({ // para actualizar el array
						like: post.like
					}); 

				}
			}
		} else {

			post.like.push(user.displayName);
			db.collection('post').doc(id).update({
				like: post.like
			});
			
		}

		document.getElementById(`numero-${doc.id}`).value = post.like.length;
	})
		.catch(function (error) {

		});	
};
