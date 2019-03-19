import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
//importa el elemento field y el reduxform que los conecta con el state
import { Field, reduxForm } from "redux-form";

const fieldNombre = props => {
  //Aqui llegarían tambien los errores del input.  
  return (
    <View style={styles.textInput}>
      <TextInput
        placeholder={props.ph}
        onChangeText={props.input.onChange}
        value={props.input.value}
        keyboardType="default"
        autoCapitalize="characters"
        onBlur={props.input.onBlur}
        multiline
      />
      {/* touched es cuando se cambia, cambia a true */}
      {props.meta.touched && props.meta.error && (
        <Text style={styles.errors}>{props.meta.error}</Text>
      )}
    </View>
  );
};

//Simula la imagen para hacer la validación
const fieldImagen = props => (
  <View>
    <View/>
    {/* touched es cuando se cambia, cambia a true */}
    {props.meta.touched && props.meta.error && 
      <Text style={styles.errors}>{props.meta.error}</Text>
    }
  </View>
);

//La función solo se ejecuta cuando cambian los valores de los imputs, por ende se utiliza el on change y el on blur
//estas funciones son de reduxform y le dice a validate que se cambió el valor
//Funcion para validar, propiedades que se pasan al componente
const validate = (values, props) => {
  
  const errors = {};

  //Esta validación se realiza al cargar la imagen, utilizando el blur, para que el validate detecte un cambio y vuelva a revisar, en este caso la imagen ya se encuentra en la store
  if(!props.imagen){
    errors.imagen = "La imagen es requerida";
  }

  if (values.texto && values.texto.length > 140) {
    errors.texto = "El texto debe ser menor de 140 caracteres";
  }

  return errors;
};

const SeleccionarGaleriaForm = props => {
  return (
    <View style={styles.container}>
      {/* Field envia valor al store */}
      <Field name='imagen' component={fieldImagen}></Field>
      <Field name="texto" component={fieldNombre} ph="Texto de la imagen" />
      <Button
        title="Publicar"
        //se envía a la función ubicada en SignUp. los values, funcion pasada por props.
        onPress={props.handleSubmit(props.registro)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  textInput: {
    marginHorizontal: 16
  },
  errors: {
    color: "#FF0000"
  }
});

// export default SeleccionarGaleriaForm;
// Registro de formularios
//Se puede enviar la validación como segundo parámetro
export default reduxForm({ form: "SeleccionarGaleriaForm", validate })(SeleccionarGaleriaForm);