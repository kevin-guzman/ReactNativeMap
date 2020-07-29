import React, {useState, useEffect} from 'react'
import { 
    View,
    ActivityIndicator,
} from 'react-native'

export default function Loading (){
    return(
        <View style={{flex:1, width: 100, height: 100, alignSelf: "center"}} >
            <ActivityIndicator 
                animating={true} 
                size={100} 
                color= {'#39037E'} 
                style={{flex:1, width: 100, height: 100, alignSelf: "auto"}}
            />
        </View>
    )
}