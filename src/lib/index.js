
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

// Autentificacion con google 
export function ingresarGoogle() {
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
	firebase.auth().languageCode = 'pt';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();
provider.setCustomParameters({
	'login_hint': 'user@example.com'
  });
  firebase.auth().signInWithPopup(provider).then(function(result) {
	// This gives you a Google Access Token. You can use it to access the Google API.
	var token = result.credential.accessToken;
	// The signed-in user info.
	var user = result.user;
	// ...
  }).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// The email of the user's account used.
	var email = error.email;
	// The firebase.auth.AuthCredential type that was used.
	var credential = error.credential;
	// ...
  });
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function(result) {
	if (result.credential) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // ...
	}
	// The signed-in user info.
	var user = result.user;
  }).catch(function(error) {
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
