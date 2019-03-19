//escucha todos los dispatch que se le proporcionan al middleware
//Call permite hacer una llamada y tomar valores.
import { takeEvery, call, select } from 'redux-saga/effects';
import { autenticacion, baseDeDatos } from "../Servicios/Firebase";
import CONSTANTES from '../Constantes';
//Redux saga permite la realización de funciones asincronas.


const registroEnFirebase = values =>
    // Crear auth firebase
    autenticacion.createUserWithEmailAndPassword(values.correo, values.password)
        .then(success => success);

//Registrar en bd.
const registroEnBaseDeDatos = ({ uid, email, nombre, fotoUrl }) =>
    baseDeDatos
        .ref(`usuarios/${uid}`)
        .set({
            nombre,
            email,
            fotoUrl
        });

//Llamada a cloudinary
const registroFotoCloudinary = ({ imagen }) =>{

    const {uri} = imagen;
    const splitName = uri.split('/');
    //la funcion .pop elimina el ultimo elemento de un array y lo devuelve
    const name = splitName.pop();
    
    const foto = {
        uri,
        type:'image/jpeg',
        name,
    };

    const formImagen = new FormData();
    formImagen.append("upload_preset",CONSTANTES.CLOUDINARY_PRESET);
    formImagen.append("file",foto);
   
    //fetch realiza peticion http

    return fetch(CONSTANTES.CLOUDINARY_NAME,{
        method:"POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body:formImagen,
    })
    .then( response => response.json() );

}
//Registrar usuario
function* sagaRegistro(values) {
    //el call pausa la ejecución hasta que se resuelva la funcion.
    try {
        //cargar foto
        //Se permite obtener del store la imagen
        const imagen = yield select((state) => state.reducerImagenSignUp);

        //Retorna información de la foto en cloudinary
        const urlFoto = yield call(registroFotoCloudinary, imagen);

        const fotoUrl = urlFoto.secure_url;

        const registro = yield call(registroEnFirebase, values.datos);

        const { user: { email, uid } } = registro;
        //destructuración de un objeto dentro de otro
        const { datos: { nombre } } = values;

        yield call(registroEnBaseDeDatos, { uid, email, nombre, fotoUrl });
        console.log("Registro exitoso");
    } catch (error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        console.log(error);
    }
}

const loginEnFirebase = ( {correo,password} ) =>
    autenticacion.signInWithEmailAndPassword(correo, password)
    .then((success)=>success);


function* sagaLogin(values) {
    // console.log("saga", values);
    try {
      const resultado = yield call(loginEnFirebase,values.datos);
      console.log(resultado);

    } catch (error) {
        console.log(error);
    }
}

//Crea un nuevo registro en firebase con la publicacion
const crearPublicacion = ({width,height,secure_url, uid}, texto = "") => 
    baseDeDatos.ref('publicaciones/').push({
        width,
        height,
        secure_url,
        uid,
        texto
    })
    .then(response => response );

//Asociar publicacion al autor
//Se crea el registro para el autor, y un registro con el id de la publicacion
//[key] para que tome el valor de la variable como llave
const asociarAutorPublicaciones = ( { key, uid } ) => 
    baseDeDatos.ref(`autor-publicaciones/${uid}`)
    .update({ [key]: true})
    .then(response => response);

function* sagaSubirPublicacion({values}){
    try {
        const imagen = yield select((state) => state.reducerImagenPublicacion);
        const usuario = yield select((state) => state.reducerSesion);
        const {uid} = usuario;

        const resultCloudinary = yield call(registroFotoCloudinary, imagen);
        console.log(resultCloudinary);

        //Registrar en bd
        const { width, height, secure_url } = resultCloudinary;
        const parametrosImagen = { width, height, secure_url, uid };

        const { key } = yield call(crearPublicacion, parametrosImagen, values.texto );
        
        const params = { key, uid };

        const asociarPubAutor = yield call(asociarAutorPublicaciones, params);
        console.log(asociarPubAutor);

    } catch (error) {
        console.log(error);
    }
}

//funcion generadora
export default function* funcionPrimaria() {
    //yield para ejecutar los efectos varias veces, y para poder ejecutar los efectos de redux saga
    //inyecta datos
    //take every escucha el dispatch
    yield takeEvery(CONSTANTES.REGISTRO, sagaRegistro);
    yield takeEvery(CONSTANTES.LOGIN, sagaLogin);
    yield takeEvery(CONSTANTES.SUBIR_PUBLICACION, sagaSubirPublicacion);
}

//EL MIDDLEWARE SE EJECUTA ANTES DE ENVIAR AL STORE.