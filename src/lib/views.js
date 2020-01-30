/* eslint-disable no-tabs */
const contenido = document.getElementById('root');
export function mostrarLogin() {
  window.location.hash = '/Inicio';
  contenido.innerHTML = `
	<div class="container">

        <div class="logo">
            <img src="/img/logo tech.png">
        </div>

        <div class="login">

            <h1>Inicia sesión</h1>
            <input class="datos" type="email" id="email2" placeholder="Correo electrónico" required>
            <input class="datos" type="password" id="password2" placeholder="***************" required>
            <button class="btn" id="ingresar">Ingresar</button>
            <button class="btn2" id="gmail">Gmail</button>
            <a href="" class="recuperar">¿Olvidaste tu contraseña? Recupérala aquí</a>
            <a href="#" class="aqui" id="crearCuenta">Crea tu cuenta Aquí</a>


        </div>

    </div>
	`;
}
