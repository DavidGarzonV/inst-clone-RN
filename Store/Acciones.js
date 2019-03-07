import CONSTANTES from "./Constantes";

export const accionRegistro = (values)=>({
    type: CONSTANTES.REGISTRO,
    datos: values   
});

export const accionLogin = (values) =>({
    type: CONSTANTES.LOGIN,
    datos: values
});

export const accionEstablecerSesion = (values) =>({
    type: CONSTANTES.ESTABLECER_SESION,
    usuario: values
});

export const accionCerrarSesion = () =>({
    type: CONSTANTES.CERRAR_SESION,
    // datos: values
});