import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { autenticacion } from './Store/Servicios/Firebase';
import { RutasNoAutenticadas } from './Components/NoAuthenticate/RutasNoAutenticadas';
import { RutasAutenticadas } from './Components/Authenticate/RutasAutenticadas';
import { accionEstablecerSesion, accionCerrarSesion } from './Store/Acciones';

class Seleccion extends Component {
    componentDidMount(){
        this.props.autenticacion();
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.usuario ? <RutasAutenticadas/> : <RutasNoAutenticadas />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const mapStateToProps = (state) => {
    return {
        usuario: state.reducerSesion
    }
}
//Se accede a la store
const mapDispatchToProps = (dispatch) => {
    return {
        autenticacion: () => {
            autenticacion.onAuthStateChanged(function(usuario){
                if(usuario){
                    console.log(usuario.toJSON());
                    dispatch(accionEstablecerSesion(usuario));
                }else{
                    console.log("No existe sesión");
                    dispatch(accionCerrarSesion());
                }
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seleccion)