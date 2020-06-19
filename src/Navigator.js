import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Map from '../src/screens/Map'

const MapNavigator = createStackNavigator (
    {
        MapScreen: Map,
        //Login: LoginScreen
    },
    {
        initialRouteName: 'MapScreen',
        headerMode:'none'
    }
)

export default createAppContainer(MapNavigator);