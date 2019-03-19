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

export const accionCargarImagenSignUp = (imagen) =>({
    type: CONSTANTES.CARGAR_IMAGEN_SIGNUP,
    imagen
});

export const accionLimpiarImagenSignUp = () =>({
    type: CONSTANTES.LIMPIAR_IMAGEN_SIGNUP
});

export const accionCargarImagenPublicacion = (imagen) =>({
    type: CONSTANTES.CARGAR_IMAGEN_PULICACION,
    imagen
});

export const accionLimpiarImagenPublicacion = () =>({
    type: CONSTANTES.LIMPIAR_IMAGEN_PUBLICACION
});

export const accionSubirPublicacion = (values) =>({
    type: CONSTANTES.SUBIR_PUBLICACION,
    values
});