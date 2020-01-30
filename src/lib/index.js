/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
const db = firebase.firestore();
// ---------------Función para Iniciar Sesión------------------------>
export const signIn = (email2, password2) => {
  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .then(() => {
      console.log('paso el then');
    })
    .catch((error) => {
      alert('Por favor ingresa tu correo y contraeña');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

// ---------------Función para Crear Usuario------------------------>
export const createUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      verificar();
      alert('Su usuario ha sido creado correctamente, por favor verifica tu bandeja de entrada en tu email');
    })
    .catch((error) => {
      alert('Upps!! Su usuario no ha sido creado correctamente, por favor inténtalo nuevamente');
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};
// <-------------Función mensaje de verificaión usuario-------------->
function verificar() {
  console.log('entro a verificar');
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(() => {
      console.log('enviando correo...');
    }).catch(() => {
      console.log('error');
    });
}
// autentificacion con google
export function ingresarGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then((result) => {
    if (result.credential) {
      // const token = result.credential.accessToken;
    }
  // const user = result.user;
  }).catch(() => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // const email = error.email;
    // const credential = error.credential;
  });
}
// <-------------Función borrar post-------------->
export const deletePost = (db, id) => {
  if (confirm('¿Deseas eliminar esta publicación?')) {
    if (document.getElementById(`delete-${id}`) != null) {
      db.collection('post').doc(id).delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    } else {
      console.log('Hay un problema con el id del post lo trae null');
    }
  }
};
// <-------------Función editar post-------------->
export const editPost = (id, writePost) => {
  db.collection('post').doc(id).update({
    mensaje: writePost,
    datatime: new Date(),
  }).then(() => {
    console.log('document successfully updated!!');
  })
    .catch((error) => {
      console.log('Error update document: ', error);
    });
};

// <-------------Función Likear post-------------->
export const postLike = (id) => {
  const user = firebase.auth().currentUser;

  // de la collection post traeme el documento con el ID, "id"
  db.collection('post').doc(id).get().then((respuesta) => {
    const post = respuesta.data();

    if (post.like == null || post.like == '') {
      post.like = [];
      // eslint-disable-next-line no-console
      console.log('ento al like vacio');
    }

    if (post.like.includes(user.uid)) {
      for (let i = 0; i < post.like.length; i++) {
        if (post.like[i] === user.uid) { // verifica si ya el usuario está en el array
          post.like.splice(i, 1); // sentencia para eliminar un elemento de un array

          db.collection('post').doc(id).update({ // para actualizar el array
            like: post.like,
          });
        }
      }
    } else {
      post.like.push(user.uid);
      db.collection('post').doc(id).update({
        like: post.like,
      });
    }

    // eslint-disable-next-line no-undef
    document.getElementById(`numero-${doc.id}`).value = post.like.length;
  })
    .catch(() => {

    });
};
