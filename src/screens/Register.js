import React from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import Footer from '../components/Footer'
export default function Register() {
    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Text style={{color:'#2BAEF7', fontSize:40, textAlign:'center',marginVertical:'10%'}}>SIGN UP</Text>
                <TextInput style={styles.input} placeholder='Name'/>
                <TextInput style={styles.input} placeholder='Last name'/>
                <TextInput style={styles.input} placeholder='Email'/>
                <TextInput style={styles.input} placeholder='DNI'/>
                <TextInput style={styles.input} placeholder='Password'secureTextEntry={true}/>
                <TextInput style={styles.input} placeholder='Confirm password' secureTextEntry={true}/>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:24}}>Sign Up</Text>
            </TouchableOpacity>
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    btn:{
        backgroundColor: '#2BAEF7',
        justifyContent:'center',
        alignItems:'center',
        padding: '3%',
        marginHorizontal: '20%',
        marginVertical: '10%',
        borderRadius: 13,
    },
    inputs:{
        paddingHorizontal: '13%',
        marginVertical: 3,
    },
    input:{
        marginBottom: 5,
        borderBottomWidth: 0.9,
        borderColor: 'black',
        fontSize: 15,
    },
})
