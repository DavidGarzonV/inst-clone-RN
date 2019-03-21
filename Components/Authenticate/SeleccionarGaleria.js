import React, { Component } from 'react';
import { Text, View, StyleSheet,Button, Alert } from 'react-native';
import SeleccionarImagen from '../SeleccionarImagen';
import { connect } from 'react-redux';
import { accionCargarImagenPublicacion, accionSubirPublicacion, accionLimpiarImagenPublicacion, accionLimpiarSubirPublicacion } from '../../Store/Acciones';
import SeleccionarGaleriaForm from './SeleccionarGaleriaForm';
import { blur } from 'redux-form';

class SeleccionarGaleria extends Component {
    static navigationOptions = {
        tabBarVisible: false
    };

    componentWillUnmount(){
        this.props.limpiarImagen();
    }

    //Cuando cambian las props
    componentWillReceiveProps(nextProps){
        //Si la propiedad actual cambia
        if(this.props.estadoSubirPublicacion !== nextProps.estadoSubirPublicacion){
            switch (nextProps.estadoSubirPublicacion) {
                case 'EXITO':
                    Alert.alert("Éxito",'La publicación fue realizada correctamente',[{
                        text: "Ok",
                        onPress: ()=>{
                            this.props.limpiarEstadoPublicacion();
                            this.props.navigation.goBack();
                        }
                    }]);
                case 'ERROR':
                    Alert.alert("Error",'La publicación no se realizó, intente nuevamente..',[{
                        text: "Confirmar",
                        onPress: ()=>{
                            this.props.limpiarEstadoPublicacion();
                        }
                    }]);
                default:
                    break;
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imagen}>
                    <SeleccionarImagen 
                    imagen={this.props.imagen.imagen} 
                    cargar={this.props.cargarImagen} 
                    radius/>
                </View>
                <View style={styles.texto}>
                    <SeleccionarGaleriaForm 
                    imagen={this.props.imagen.imagen} 
                    registro={(values)=>{
                        // console.log(values);
                        this.props.subirPublicacion(values);
                    }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imagen:{
        flex:2,
    },
    texto:{
        flex:2
    }
});

const mapStateToProps = (state) => {
    return {
        imagen: state.reducerImagenPublicacion,
        estadoSubirPublicacion: state.reducerExitoSubirPublicacion.estado
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cargarImagen: (imagen) => {
            dispatch(accionCargarImagenPublicacion(imagen)),
            //Para simular que al enviar la imagen el campo imagen tenga algo también
            dispatch(blur("SeleccionarGaleriaForm",'imagen',Date.now()))
        },
        subirPublicacion: (values) => {
            dispatch(accionSubirPublicacion(values))
        },
        limpiarImagen: ()=>{
            dispatch(accionLimpiarImagenPublicacion());
        },
        limpiarEstadoPublicacion: ()=>{
            dispatch(accionLimpiarSubirPublicacion());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeleccionarGaleria)