import React, { Component } from "react";
import { Text, View, StyleSheet, Button} from "react-native";
import { autenticacion } from "../../Store/Servicios/Firebase";

class Profile extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text> Profile </Text>
        <Button title="Publicacion" 
        onPress={ () => { navigation.navigate('Publicacion')} } />
        <Button title="Cerrar sesión" 
        onPress={ () => {
              //Al cambiar el state renderiza nuevamente.
               autenticacion.signOut()
          }} />
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

export default Profile;