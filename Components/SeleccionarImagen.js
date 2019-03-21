import React from 'react';
import { Button, Image, View, TouchableOpacity, Alert } from 'react-native';
// import { ImagePicker } from 'expo';
import { ImagePicker, Permissions } from 'expo';

const SeleccionarImagen = (props)=>{

    const permiso = async () =>{
        const response = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        return response;
    }

    const seleccionarImagen = async () => {
        const respuestaPermiso = await permiso();
        //En caso de no tener el permiso, preguntar
        if(respuestaPermiso.status == "undetermined"){
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }else if(respuestaPermiso.status == "denied"){
            Alert.alert('Error',"Debes otorgar los permisos correspondientes",[{
                text:"Otorgar permisos",
                onPress: ()=>{
                    Permissions.askAsync(Permissions.CAMERA_ROLL);
                }
            },{
                text:"Cancelar",
            }]);
        }else if(respuestaPermiso.status == "granted"){
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            // console.log(result);
            if (!result.cancelled) {
                // this.setState({ image: result });
                //propiedad que hace el dispatch, enviada desde SignUp
                props.cargar(result);
            }
        }
    };
    //Propiedad inyectada en seleccionar galería
    const radius = props.radius? 0 : 80;
    
    return (
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={seleccionarImagen}>
                {/* operador ternario */}
                {/* Verifica al cambiar el state */}
                {
                 props.imagen ? 
                    <Image source={ { uri: props.imagen.uri }} 
                        style={ {width:160,height:160,borderRadius: radius} } />:
                    <Image source={require("../assets/sunset.jpg")} 
                        style={ {width:160,height:160,borderRadius: radius} } />
                }
            </TouchableOpacity>
        </View>
    );
};

export default SeleccionarImagen; 