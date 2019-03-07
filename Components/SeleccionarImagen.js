import React from 'react';
import { Button, Image, View, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';

const SeleccionarImagen = (props)=>{
    const seleccionarImagen = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            // this.setState({ image: result });
            //propiedad que hace el dispatch, enviada desde SignUp
            props.cargar(result);
        }
    };
    
    return (
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={seleccionarImagen}>
                {/* operador ternario */}
                {/* Verifica al cambiar el state */}
                {
                 props.imagen ? 
                    <Image source={ { uri: props.imagen.uri }} 
                        style={ {width:160,height:160,borderRadius:80} } />:   
                    <Image source={require("../assets/sunset.jpg")} 
                        style={ {width:160,height:160,borderRadius:80} } />
                }
            </TouchableOpacity>
        </View>
    );
};

export default SeleccionarImagen; 