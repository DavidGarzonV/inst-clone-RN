import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Dimensions, Image } from "react-native";

class Publicacion extends Component {
  render() {
    const { navigation, item } = this.props;

    //PUBLICACIÓN
    //Ancho de la pantalla
    const { width } = Dimensions.get('window');

    //proporción para la altura de la imagen
    const factor = item.width / width;
    const height = item.height / factor;

    return (
      <View>
        <View>
            <Text>{item.uid}</Text>
        </View>
        <Image
          source={{ uri: item.secure_url }}
          style={{ width, height }}
        />
        {/* Footer */}
        <View>
          <Text>Likes</Text>
          <Text>Comentarios</Text>
        </View>

        {/* <Button title="Autor" 
          onPress={ () => { navigation.navigate('Autor') } } />
        <Button title="Comentarios" 
          onPress={ () => { navigation.navigate('Comentarios') } } /> */}
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

export default Publicacion;