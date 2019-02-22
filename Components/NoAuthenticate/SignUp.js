import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
//Permite integrar la store y el dispactch al componente
import { connect } from 'react-redux';
import SignUpForm from './Forms/SignUpForm';

class SignUp extends Component {
  render() {

    //propiedad iyectada en el mapStateToProps
    console.log(this.props.numero);
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text> SignUp </Text>

        <SignUpForm></SignUpForm>
        {/* native input */}
        {/* <TextInput placeholder="Correo electronico" /> */}

        <Button
          title="Aumentar"
          onPress={ () => { this.props.aumentar() } }
        />
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
    alignItems: "center",
    justifyContent: "center"
  }
});

//pasa el state a la función.
//Funcion regresa partes del estado.
//Le inyecta propiedades al componente (SignUp).
const mapStateToProps = (state) =>{
    //nombre de la propiedad que se le pasa al componente como prop (this.props)
    //se obtiene la propiedad del state.
    return {
        numero:state.reducerPrueba
    }
};


const mapDispatchToProps = (dispatch) =>{
    return {
        aumentar: ()=>{
            //OBJECT CON TYPE
            dispatch({
                type: "AUMENTAR REDUCERPRUEBA"
            });
        }
    }
};

//Así se integra la store, inyecta las propiedades al componente.
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);