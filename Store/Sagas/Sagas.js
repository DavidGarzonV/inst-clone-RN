//escucha todos los dispatch que se le proporcionan al middleware
//Call permite hacer una llamada y tomar valores.
import { takeEvery, call } from 'redux-saga/effects';
import { autenticacion, baseDeDatos } from "../Servicios/Firebase";
import CONSTANTES from '../Constantes';
//Redux saga permite la realización de funciones asincronas.


const registroEnFirebase = values =>
    // Crear auth firebase
    autenticacion.createUserWithEmailAndPassword(values.correo, values.password)
        .then(success => success);

//Registrar en bd.
const registroEnBaseDeDatos = ({ uid, email, nombre }) =>
    baseDeDatos.ref(`usuarios/${uid}`)
        .set({
            nombre,
            email,
            // profile_picture: imageUrl
        });


function* sagaRegistro(values) {
    //el call pausa la ejecución hasta que se resuelva la funcion.
    try {
        const registro = yield call(registroEnFirebase, values.datos);
        // console.log("reg", registro);
        const { user: { email, uid } } = registro;
        //destructuración de un objeto dentro de otro
        const { datos: { nombre } } = values;

        yield call(registroEnBaseDeDatos, { uid, email, nombre });
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