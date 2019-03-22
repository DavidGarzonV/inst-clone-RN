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

export const accionDescargarPublicaciones = () =>({
    type: CONSTANTES.DESCARGAR_PUBLICACIONES
});

export const accionAgregarPublicacionesStore = (publicaciones) =>({
    type: CONSTANTES.AGREGAR_PUBLICACIONES_STORE,
    publicaciones
});

export const accionagregarAutoresStore = (autores) =>({
    type: CONSTANTES.AGREGAR_AUTORES_STORE,
    autores
});

export const accionExitoSubirPublicacion = () =>({
    type: CONSTANTES.EXITO_SUBIR_PUBLICACION
});

export const accionErrorSubirPublicacion = () =>({
    type: CONSTANTES.ERROR_SUBIR_PUBLICACION
});

export const accionLimpiarSubirPublicacion = () =>({
    type: CONSTANTES.LIMPIAR_SUBIR_PUBLICACION
});

export const accionVerifyLogin = () =>({
    type: CONSTANTES.VERIFY_LOGIN
});

export const accionSendSession = (sesion) =>({
    type: CONSTANTES.SEND_SESSION,
    sesion
});

export const accionLimpiarSession = (sesion) =>({
    type: CONSTANTES.CLEAR_SESSION
});