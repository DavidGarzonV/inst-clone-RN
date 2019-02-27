import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import SignInForm from "./Forms/SignInForm";

class SignIn extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SignInForm />
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
    paddingHorizontal:16
  }
});

export default SignIn;
