import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
//Permite integrar la store y el dispactch al componente
import { connect } from 'react-redux';
import SignUpForm from './Forms/SignUpForm';
import { accionRegistro } from "../../Store/Acciones";
import SeleccionarImagen from "../SeleccionarImagen";
import CONSTANTES from "../../Store/Constantes";

//Componente tiene accesso al store
class SignUp extends Component {
  //ejecutar antes de que el componente se desmonte
  componentDidMount(){
    this.props.limpiarImagen();
  };
  
  registroDeUsuario = (values)=>{
      // console.log(values);
      //Funcion inyectada con el connect (dispatch)
      //se ejecuta la función y se envían los valores
      this.props.registro(values);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SeleccionarImagen imagen={this.props.imagen.imagen} cargar={this.props.cargarImagen}/>
        <SignUpForm registro={this.registroDeUsuario} />
        {/* native input */}
        {/* <TextInput placeholder="Correo electronico" /> */}
        <Button
          title="Regresar a SignIn"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal:16
  }
});

//pasa el state a la función.
//Funcion regresa partes del estado.
//Le inyecta propiedades al componente (SignUp).
const mapStateToProps = (state) =>{
    //nombre de la propiedad que se le pasa al componente como prop (this.props)
    //se obtiene la propiedad del state.
    return {
        numero:state.reducerPrueba,
        imagen:state.reducerImagenSignUp
    }
};

//Dispatch que apunta a la store
const mapDispatchToProps = dispatch => ({
    registro: (values)=>{
        //OBJECT CON TYPE
        dispatch( accionRegistro(values) );
    },
    cargarImagen: (imagen)=>{
      dispatch({ type:CONSTANTES.CARGAR_IMAGEN_SIGNUP, imagen });
    },
    limpiarImagen:()=>{
      dispatch({ type:CONSTANTES.LIMPIAR_IMAGEN_SIGNUP });
    }
});

//Así se integra la store, inyecta las propiedades al componente.
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);