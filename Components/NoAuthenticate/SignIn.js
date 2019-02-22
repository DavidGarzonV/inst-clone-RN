import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

class SignIn extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text> SignIn </Text>
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
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SignIn;
