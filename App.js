
import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigator from './src/Navigator'

export default class App extends Component {
  render(){
    return(
        <Navigator/>
    )
  }
}


