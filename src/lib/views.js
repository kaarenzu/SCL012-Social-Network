/* eslint-disable no-tabs */
const contenido = document.getElementById('root');
export function mostrarLogin() {
  window.location.hash = '/Inicio';
  contenido.innerHTML = `
	<div class="container">	
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
		  </div>
	<div>
	`;
}
