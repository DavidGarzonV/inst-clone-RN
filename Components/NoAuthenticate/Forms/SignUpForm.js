import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
//importa el elemento field y el reduxform que los conecta con el state
import { Field, reduxForm } from "redux-form";

//Pasos para integrar.
// redux form
// registrar reducer form (redux-form) en la store
// crear componente y con redux form se renderiza, se exporta para que funcione el store
// integrar field (campos)
// dentro de los campos, el name, ony componente a renderizar (clase, o component)
// con el metodo onchange, que proviene del field, le dice a la store que el elemento está presentando cambios y debe actualizarlos.
// handlesubmit, para recuperar datos del store.

const fieldNombre = props => {
  //Aqui llegarían tambien los errores del input.
  // console.log("inputs");

  //Las props las proporciona el field, al renderizar el elemento
  //La funcion onchange es del field, y cada vez que se ejecuta renderiza el input por si hay cambios.
  //imput: objeto generado por field.
  return (
    <View style={styles.textInput}>
      <TextInput
        placeholder={props.ph}
        onChangeText={props.input.onChange}
        value={props.input.value}
        keyboardType={
          props.input.name == "correo" ? "email-address" : "default"
        }
        autoCapitalize="characters"
        secureTextEntry={
          props.input.name == "password" || props.input.name == "confirmacion" ? true : false
        }
        //Actualiza las propiedades del componente en el store
        onBlur={props.input.onBlur}
      />
      <View style={styles.linea} />
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

  if (!values.nombre) {
    errors.nombre = "Requerido";
  } else if (values.nombre.length < 5) {
    errors.nombre = "Deben ser de al menos 5 caracteres";
  } else if (values.nombre.length > 10) {
    errors.nombre = "Deben ser menor de 10 caracteres";
  }
  //Correo
  if (!values.correo) {
    errors.correo = "Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
    errors.correo = "Correo inválido";
  }

  //Password
  if (!values.password) {
    errors.password = "Requerido";
  } else if (values.password.length < 5) {
    errors.password = "Deben ser de al menos 5 caracteres";
  } else if (values.password.length > 15) {
    errors.password = "Deben ser menor de 10 caracteres";
  }
  //Confirmation
  if (!values.confirmacion) {
    errors.confirmacion = "Requerido";
  } else if (values.password != values.confirmacion) {
    errors.confirmacion = "Las contraseñas no coinciden";
  }

  return errors;
};

const SignUpForm = props => {
  // console.log("form");
  return (
    <View style={styles.container}>
      {/* Field envia valor al store */}
      <Field name='imagen' component={fieldImagen}></Field>
      <Field name="nombre" component={fieldNombre} ph="nombre" />
      <Field name="correo" component={fieldNombre} ph="correo@correo.com" />
      <Field name="password" component={fieldNombre} ph="******" />
      <Field name="confirmacion" component={fieldNombre} ph="******" />
      <Button
        title="Registrar"
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
    marginBottom: 16
  },
  linea: {
    backgroundColor: "#DCDCDC",
    height: 2
  },
  errors: {
    color: "#FF0000"
  }
});

// export default SignUpForm;
// Registro de formularios
//Se puede enviar la validación como segundo parámetro
export default reduxForm({ form: "SignUpForm", validate })(SignUpForm);
