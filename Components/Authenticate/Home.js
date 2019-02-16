import React, { Component } from "react";
import { Text, View, StyleSheet , Button } from "react-native";

class Home extends Component {
  render() {
    //Propiedades renderizadas por el stack
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text> Home </Text>
        <Button title="Autor" 
        onPress={()=>{navigation.navigate('Autor')}} />
        <Button title="Comentarios" 
        onPress={()=>{navigation.navigate('Comentarios')}} />
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

export default Home;