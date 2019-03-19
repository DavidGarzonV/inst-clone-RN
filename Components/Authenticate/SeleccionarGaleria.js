import React, { Component } from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import SeleccionarImagen from '../SeleccionarImagen';
import { connect } from 'react-redux';
import { accionCargarImagenPublicacion, accionSubirPublicacion, accionLimpiarImagenPublicacion } from '../../Store/Acciones';
import SeleccionarGaleriaForm from './SeleccionarGaleriaForm';
import { blur } from 'redux-form';

class SeleccionarGaleria extends Component {
    static navigationOptions = {
        tabBarVisible: false
    };

    componentWillUnmount(){
        this.props.limpiarImagen();
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
        imagen: state.reducerImagenPublicacion
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeleccionarGaleria)