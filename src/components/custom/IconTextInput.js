import React, {useState} from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native'
//import useForm from '../custom/hooks/useForm'
import { IconButton } from 'react-native-paper'

export function IconTextInput (props){
    const [secure, setSecure] = useState(true)
    return(
        <View style={styles.container} >
            <IconButton
                icon={props.icon ? props.icon :'account'}
                onPress={()=>setSecure(!secure)}
            />
            <TextInput
                placeholder={props.placeholder}
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                secureTextEntry={ props.secureTextEntry ? secure : false }
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'row',
        borderBottomWidth:0.9,
        borderBottomColor:'black',
        margin:2
    },
})