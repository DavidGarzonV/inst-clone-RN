import { createStore , combineReducers, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import funcionPrimaria from './Sagas/Sagas';
import CONSTANTES from './Constantes';

//Return state
//Los reducer están pendientes al dispatch, al nuevo state
const reducerPrueba = (state = [0], action) => {
    //Dispatch type
    switch (action.type) {
        case "AUMENTAR REDUCERPRUEBA":
            //lo que trae el array...
            return [...state, 1];
        default:
            //State como estaba.
            return state;
    }
};

const reducerSesion =(state=null,action)=>{
    switch (action.type) {
        case CONSTANTES.ESTABLECER_SESION:
            return {...action.usuario};
        case CONSTANTES.CERRAR_SESION:
            return null;
        default:
            return state;
    }
}

//dispatch para cargar imagen, y limpiar
const reducerImagenSignUp = (state = { imagen:null }, action) =>{
    switch (action.type) {
        case CONSTANTES.CARGAR_IMAGEN_SIGNUP:
            return { imagen: action.imagen };
        case CONSTANTES.LIMPIAR_IMAGEN_SIGNUP:
            return { imagen: null };
        default:
            return state;
    }
}

//Crear middleware
const sagaMiddleware = createSagaMiddleware();

//Produce objeto con resultado de reducers, creando arbol de states.
const reducers = combineReducers({
    // reducerPrueba: reducerPrueba
    reducerPrueba,
    //El redux form envía a su reducer los datos a cambiar del store (dispatch).
    form,
    reducerSesion,
    reducerImagenSignUp
});

//Redux store
//Utilizar middleware
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//redux saga: Funciones generadoras
//Ejecutar middleware, al comienzo de todo se ejecuta.
sagaMiddleware.run(funcionPrimaria);

export default store;