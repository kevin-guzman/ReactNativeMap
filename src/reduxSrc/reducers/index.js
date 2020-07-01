import {combineReducers} from 'redux'
import user from './user'
import markers from './markers'

export default combineReducers({
    user: user,
    markers: markers
})