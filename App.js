
import React,{Component} from 'react';

import store from './src/reduxSrc/store'
import Navigator from './src/Navigator'
import {Provider as StoreProvider} from 'react-redux'

export default class App extends Component {
  render(){
    return(
      <StoreProvider store={store} >
        <Navigator/>
      </StoreProvider>
        
    )
  }
}


