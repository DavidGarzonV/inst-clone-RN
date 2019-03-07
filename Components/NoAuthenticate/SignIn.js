import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import SignInForm from "./Forms/SignInForm";
import { connect } from 'react-redux';
import { accionLogin } from '../../Store/Acciones';

class SignIn extends Component {
  signInDeUsuario = (values) => {
    // console.log("sign", values);
    this.props.login(values);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SignInForm login={this.signInDeUsuario} />
        <Button
          title="Navegar a SignUp"
          onPress={() => {
            navigation.navigate("SignUp");
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
    paddingHorizontal: 16
  }
});

const mapStateToProps = (state) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (datos) => {
      dispatch(accionLogin(datos))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)