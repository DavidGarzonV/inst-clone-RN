import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Field, reduxForm } from "redux-form";

const fieldNombre = props => {
  console.log(props);
  return (
    <View>
        <TextInput
        placeholder={props.ph}
        onChangeText={props.input.onChange}
        value={props.input.value}
        keyboardType={props.input.name == "correo" ? "email-address" : "default"}
        autoCapitalize="characters"
        secureTextEntry={
            props.input.name == "password" ? true : false
        }
        onBlur={ props.input.onBlur }
        />
        { props.meta.touched && props.meta.error && <Text>{props.meta.error}</Text> }
    </View>
  );
};

//Funcion para validar
const validate = values => {
  const errors = {};
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

  return errors;
};

const SignInForm = props => {
  console.log(props);
  return (
    <View>
      <Field name="correo" component={fieldNombre} ph="correo@correo.com" />
      <Field name="password" component={fieldNombre} ph="******" />
      <Text>Redux Form</Text>
      <Button
        title="Iniciar"
        onPress={props.handleSubmit(values => {
          console.log(values);
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

export default reduxForm({ form: "SignInForm", validate })(SignInForm);