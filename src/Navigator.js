import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Map from '../src/screens/Map'
import AddMarker from './screens/AddMarker';
import Login from './screens/Login';
import Register from './screens/Register';
const MapNavigator = createStackNavigator (
    {
        MapScreen: Map,
        AddMarker: AddMarker,
        Login: Login,
        Register: Register,
    },
    {
        initialRouteName: 'Register',
        headerMode:'none',
        header:null,
        lazy :true
    }
)

export default createAppContainer(MapNavigator);