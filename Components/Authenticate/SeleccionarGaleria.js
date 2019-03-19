import React, { Component } from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import SeleccionarImagen from '../SeleccionarImagen';
import { connect } from 'react-redux';
import { accionCargarImagenPublicacion } from '../../Store/Acciones';

class SeleccionarGaleria extends Component {
    static navigationOptions = {
        tabBarVisible: false
    };

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
                    <Text> SeleccionarGaleria </Text>
                </View>
                <View style={styles.boton}>
                    <Button title='Publicar'
                    onPress={()=>{
                        console.log("publicar");
                    }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    imagen:{
        flex:2,
    },
    texto:{
        flex:2
    },
    boton:{
        flex:1
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
            dispatch(accionCargarImagenPublicacion(imagen))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeleccionarGaleria)