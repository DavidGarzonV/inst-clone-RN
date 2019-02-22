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
  console.log(props);

  //Las props las proporciona el field, al renderizar el elemento
  //La funcion onchange es del field, y cada vez que se ejecuta renderiza el input por si hay cambios.
  return (
    <View>
        <TextInput
        placeholder={props.ph}
        onChangeText={props.input.onChange}
        value={props.input.value}
        keyboardType={props.input.name == "correo" ? "email-address" : "default"}
        autoCapitalize="characters"
        secureTextEntry={
            !!props.input.name == "password" || props.input.name == "confirmacion"
        }
        //Actualiza las propiedades del componente en el store
        onBlur={ props.input.onBlur }
        />
        {/* touched es cuando se envía, cambia a true */}
        { props.meta.touched && props.meta.error && <Text>{props.meta.error}</Text> }
    </View>
  );
};

//Funcion para validar
const validate = values => {
  const errors = {};
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
  console.log(props);
  return (
    <View>
      {/* Field envia valor al store */}
      <Field name="nombre" component={fieldNombre} ph="nombre" />
      <Field name="correo" component={fieldNombre} ph="correo@correo.com" />
      <Field name="password" component={fieldNombre} ph="******" />
      <Field name="confirmacion" component={fieldNombre} ph="******" />
      <Text>Redux Form</Text>
      <Button
        title="Registrar"
        onPress={props.handleSubmit(values => {
        //   console.log(values);
        })}
      />
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
//Se puede enviar la validación como segundo parámetro
export default reduxForm({ form: "SignUpForm", validate })(SignUpForm);
