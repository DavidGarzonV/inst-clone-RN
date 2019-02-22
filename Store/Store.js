import { createStore , combineReducers } from 'redux';
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

//Produce objeto con resultado de reducers, creando arbol de states.
const reducers = combineReducers({
    // reducerPrueba: reducerPrueba
    reducerPrueba,
    form
});

//Redux store
const store = createStore(reducers);

export default store;