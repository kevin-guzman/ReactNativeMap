import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Map from '../src/screens/Map'
import AddMarker from './screens/AddMarker';

const MapNavigator = createStackNavigator (
    {
        MapScreen: Map,
        AddMarker: AddMarker,
    },
    {
        initialRouteName: 'MapScreen',
        headerMode:'none'
    }
)

export default createAppContainer(MapNavigator);