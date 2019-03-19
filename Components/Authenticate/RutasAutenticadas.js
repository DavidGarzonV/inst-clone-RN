import { TabNavigator } from 'react-navigation';
import { StackHome } from './StackHome';
import { StackSearch } from './StackSearch';
import { StackFollow } from './StackFollow';
import { StackAdd } from './StackAdd';
import Profile from './Profile';

//Se cargan todos los screen al mismo tiempo
const RutasAutenticadas = TabNavigator(
    {
        Home:{
            screen:StackHome
        },
        Search:{
            screen:StackSearch
        },
        Add:{
            screen:StackAdd
        },
        Follow:{
            screen: StackFollow,
        },
        Profile:{
            screen:Profile
        }
    },
    {
        //Android por defecto top.
        tabBarPosition:'bottom'
    }
);

export { RutasAutenticadas };