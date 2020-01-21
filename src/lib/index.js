
//---------------Función para Iniciar Sesión------------------------>
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

//---------------Función para Crear Usuario------------------------>
export let createUser = () => {
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
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

