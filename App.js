import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RutasNoAutenticadas } from './Components/NoAuthenticate/RutasNoAutenticadas';
import { RutasAutenticadas } from './Components/Authenticate/RutasAutenticadas';

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
        {/* <RutasNoAutenticadas /> */}
        <RutasAutenticadas/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center'
  }
});
