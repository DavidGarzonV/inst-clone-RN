import React, { Component } from "react";
import { View, StyleSheet, FlatList,Text } from "react-native";
import { connect } from 'react-redux';
import { accionDescargarPublicaciones } from "../../Store/Acciones";
import Publicacion from "./Publicacion";

class Home extends Component {
  //ya se ha ejecutado el componente
  componentDidMount() {
    this.props.descargarPublicaciones();
  }

  render() {
    console.log(this.props.publicaciones);
    //Propiedades renderizadas por el stack
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.publicaciones}
          renderItem={({ item }) => <Publicacion item={item} />}
          ItemSeparatorComponent={ () => <View style={styles.separador} /> }
        />

        {/* <Text> Home </Text>
        <Button title="Autor"
          onPress={() => { navigation.navigate('Autor') }} />
        <Button title="Comentarios"
          onPress={() => { navigation.navigate('Comentarios') }} /> */}
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
  separador:{
    borderWidth: 1,
    borderColor: '#C0C0C0'
  }
});

const mapStateToProps = (state) => {
  return {
    publicaciones: state.reducerPublicacionesDescargadas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    descargarPublicaciones: () => {
      dispatch(accionDescargarPublicaciones())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)