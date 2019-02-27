import { createStore , combineReducers, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';

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
    return state;
};

// Currying
// const miMiddleware = (a) => (b) => (c) => a*b*c;
// miMiddleware(10);
// miMiddleware(20);
// miMiddleware(30);

//Cada middleware llama el siguiente, y el ultimo ejecuta el store dispatch para actualizar la información.
const miMiddleware = store => next => (action) => {
    console.log("se ejecuta el middleware");
    //ej: cada onchange es una accion.
    next(action);
}

const ultimoMiddleware = store => next => (action) => {
    console.log("ultimo middleware");
    next(action);
}

//Produce objeto con resultado de reducers, creando arbol de states.
const reducers = combineReducers({
    // reducerPrueba: reducerPrueba
    reducerPrueba,
    //El redux form envía a su reducer los datos a cambiar del store (dispatch).
    form
});

//Redux store
//Middleware importar y configurar a la store
const store = createStore(reducers, applyMiddleware(miMiddleware,ultimoMiddleware));

export default store;