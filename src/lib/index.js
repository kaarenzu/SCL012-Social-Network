
//---------------Función para Iniciar Sesión------------------------>
export let signIn = (email2, password2) => {
	firebase.auth().signInWithEmailAndPassword(email2, password2)
		.then((response) => {
			console.log('paso el then');
		})
		.catch(function (error) {
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
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// ...
		}
		// The signed-in user info.
		var user = result.user;
	}).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	});
};
//<-------------Función borrar post-------------->
export let deletePost = (db,id) => {
	if(confirm('¿Deseas eliminar esta publicación?')){
		if(document.getElementById('delete-' + id)!=null){
		db.collection("post").doc(id).delete()
			.then(function () {
				console.log("Document successfully deleted!");
			}).catch(function (error) {
				console.error("Error removing document: ", error);
			});
		}else{
		 console.log('Hay un problema con el id del post lo trae null');
		}	
	}
};
//<-------------Función editar post-------------->
// function editPost(db,id){
// 			let editRef = db.collection('post').doc(id);
// 			return editRef.update({
// 				mensaje: writePost
// 			})
// 			.then(function(){
// 				console.log('document successfully updated!!');
// 			})
// 			.catch(function(){
// 				console.log('Error update document: ', error)
// 			});
// }