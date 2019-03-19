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

    const {uri, type} = imagen;
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
        var errorCode = error.code;
        var errorMessage = error.message;
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
      console.log("res",resultado);

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

    // console.log('Desde nuestra función generadora');
}

//Se ejecuta por cada yield, validando el valor y la ejeecucion 
//yield ES6: pausa la ejecucion y regresa o toma un valor.
// function* funcionPrueba(){    
//     yield 1000;
//     yield 2000;
// }
// const miFuncion = funcionPrueba();
// miFuncion.next();
//crea objeto iterable