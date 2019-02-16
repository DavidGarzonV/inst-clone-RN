import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigator } from 'react-navigation';

//Return text
const SignIn = (props)=> {
    //Requiere nombre de la ruta
    //Obtener la propiedad navigation, destructuración de objeto
    // props.navigation.navigate(SignUp);
    const { navigation } = props;

    return (
        <View style={{ flex:1,justifyContent:"center" }}>
            <Text>Componente SignIn</Text>
            <Button
                title="Navegar a SignUp"
                onPress={()=>{ navigation.navigate('SignUp') }}
            />
        </View>
    );
};
//Al estar renderizado con StackNavigator, provee las propiedades navigation.
const SignUp = (props)=> {
    const { navigation } = props;

    return (
        <View style={{ flex:1, justifyContent:"center" }}>
            <Text>Componente SignUp</Text>
            <Button
                title="Regresar a SignIn"
                onPress={()=>{ navigation.goBack() }}
            />
        </View>
    );
};

const RutasNoAutenticadas = StackNavigator(
    {
        //Screen
        SignIn:{
            screen: SignIn,
            // navigationOptions:{
            //     header:null,
            // }
        },
        //Ruta, variable a renderizar
        SignUp: {
            screen : SignUp,
            // navigationOptions:{
            //     title: "SignUp"
            // }
        }
    },
    //Configuración
    {
        //Del stack, propiedades globales.
        headerMode:'none',
        //navigationOptions, para el stack o para screens.
        // navigationOptions: {
        //     title: "Título desde el StackNavigator"
        // }
    },
);

export { RutasNoAutenticadas };