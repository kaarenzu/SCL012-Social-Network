
export let signIn = () => { 
	let email2=document.getElementById('email2').value;
	let password2=document.getElementById('password2').value;
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
export function observador() {
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
