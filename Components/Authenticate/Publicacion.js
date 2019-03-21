import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Dimensions, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

class Publicacion extends Component {
  render() {
    const { navigation, item, autor } = this.props;

    //PUBLICACIÓN
    //Ancho de la pantalla
    const { width } = Dimensions.get('window');

    //proporción para la altura de la imagen
    const factor = item.width / width;
    const height = item.height / factor;

    //Inicialmente el autor llega undefined
    const aut = (autor) ? autor : new Object;

    return (
      <View>
        <View style={styles.header} >
          <Image 
            source={ {uri: aut.fotoUrl } } 
            style={styles.fotoAutor}
          />
          <Text>{ aut.nombre }</Text>          
        </View>
        <Image
          source={{ uri: item.secure_url }}
          style={{ width, height }}
        />
        <View style={styles.footer}>
          <View style={styles.icons}>
            <Ionicons name='md-heart-empty' color='#000000' size={30} style={styles.icon}/>
            <Ionicons name='md-chatboxes' color='#000000' size={30} style={styles.icon}/>
          </View>
          <View style={styles.texto}>
              <Text>{item.texto}</Text>
          </View>
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
  },
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 16,
    marginVertical:20,
    overflow: 'hidden'
  },
  fotoAutor:{
    width:48,
    height:48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  footer:{
    marginHorizontal: 16
  },
  icons:{
    flexDirection:'row',
  },
  icon:{
    marginRight:16,
    marginVertical:16
  },
  texto:{
    marginBottom:16
  }
});

export default Publicacion;