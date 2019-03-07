import React from "react";
import { StyleSheet, Text, View } from "react-native";
//Poider le dice a todos los componentes que tendrpan acceso a un store
import { Provider } from 'react-redux';
import { RutasNoAutenticadas } from './Components/NoAuthenticate/RutasNoAutenticadas';
import { RutasAutenticadas } from './Components/Authenticate/RutasAutenticadas';
import Store from './Store/Store';
import Seleccion from "./Seleccion";

console.disableYellowBox = ['Remote debugger'];

export default class App extends React.Component {
  constructor(){
    super();
    this.state ={
      nombre :"instragram-clone"
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <RutasAutenticadas /> */}
        {/* Integra store a todos los elementos del componente*/}
        <Provider store={Store}>
          <Seleccion />
        </Provider>
      </View>
    );s
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center'
  }
});