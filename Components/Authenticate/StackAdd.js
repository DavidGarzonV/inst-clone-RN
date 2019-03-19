import { StackNavigator } from 'react-navigation';
import SeleccionarGaleria from './SeleccionarGaleria';
import Add from './Add';

const StackAdd = StackNavigator({
    Add:{
        screen: Add
    },
    Seleccion:{
        screen: SeleccionarGaleria,
        // navigationOptions:{
        //     tabBarVisible: false
        // }
    }
});

export { StackAdd };