import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
//importa el elemento field y el reduxform que los conecta con el state
import { Field, reduxForm } from 'redux-form';


//Pasos para integrar.
// redux form
// registrar reducer form (redux-form) en la store
// crear componente y con redux form se renderiza, se exporta para que funcione el store
// integrar field (campos)
// dentro de los campos, el name, ony componente a renderizar (clase, o component)
// con el metodo onchange, que proviene del field, le dice a la store que el elemento está presentando cambios y debe actualizarlos.
// handlesubmit, para recuperar datos del store.

const fieldNombre = (props)=>{
    // console.log(props);
    //Las props las proporciona el field, al renderizar el elemento
    //La funcion onchange es del field, y cada vez que se ejecuta renderiza el input por si hay cambios.
    return(
        <TextInput 
            placeholder="Field Nombre.." 
            onChangeText={ props.input.onChange } 
            value={props.input.value}
        />
    );
};

const SignUpForm = (props)=>{
    return (
        <View>
            {/* Field envia valor al store */}
            <Field name="nombre" component={ fieldNombre } />   
            <Field name="correo" component={ fieldNombre } />   
            <Text>Redux Form</Text>
            <Button  title="Registrar" 
            onPress={ props.handleSubmit((values)=>{
                console.log(values);
            })} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

// export default SignUpForm;
// Registro de formularios
export default reduxForm({ form:'SignUpForm' })(SignUpForm);