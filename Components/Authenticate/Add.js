import React, { Component } from "react";
import { Text, View, StyleSheet,Button } from "react-native";

class Add extends Component {
  render() {

    const { navigation } = this.props; 
    return (
      <View style={styles.container}>
        <Button title="Seleccionar foto de galería"
        onPress={()=>{
          navigation.navigate('Seleccion');
        }} />
        <Text> Add </Text>
        <Button title="Tomar foto"
        onPress={()=>{
          navigation.navigate('Seleccion');
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Add;