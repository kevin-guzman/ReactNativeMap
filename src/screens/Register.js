import React from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import Footer from '../components/Footer'
import useForm from '../custom/hooks/useForm'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {IconTextInput} from '../components/custom/IconTextInput'

const initialValues ={
        name:'',
        age:'',
        email:'',
        nit:'',
        psw:'',
        cpsw:'',
        lat:0,
        lng:0,
        address:'',
        familarPhone:'',
        phone:'',
        city:''
    }

export default function Register() {
    const form = useForm({initialValues})
    console.log(form.fields)

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>

            <View style={styles.inputs}>
                <Text style={{color:'#2BAEF7', fontSize:40, textAlign:'center',marginVertical:'10%'}}>¡Registrate!</Text>
                
                <IconTextInput 
                    style={styles.input} 
                    placeholder='Nombre'
                    {...form.getInput('name')}
                    icon='account'
                />
                <IconTextInput 
                    style={styles.input} 
                    placeholder='Edad'
                    {...form.getInput('age')}
                    keyboardType='number-pad'
                    icon='calendar-range'
                />
                <IconTextInput 
                    style={styles.input} 
                    placeholder='Email'
                    keyboardType='email-address'
                    {...form.getInput('email')}
                    icon='email-outline'
                />
                <IconTextInput 
                    style={styles.input} 
                    placeholder='Numero de identificacion'
                    keyboardType='number-pad'
                    {...form.getInput('nit')}
                    icon='account-box-multiple'
                />
                <IconTextInput
                    style={styles.input} 
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    {...form.getInput('psw')}
                    icon='eye-outline'
                />
                <IconTextInput 
                    style={styles.input} 
                    placeholder='Confirmar contraseña' 
                    secureTextEntry={true}
                    {...form.getInput('cpsw')}
                    icon='eye-outline'
                />
                <IconTextInput 
                    style={styles.input} 
                    placeholder='Numero de teléfono'
                    keyboardType='number-pad'
                    {...form.getInput('phone')}
                    icon='phone'
                />
                <IconTextInput 
                    style={styles.input} 
                    placeholder='Numero de teléfono de un familiar'
                    keyboardType='number-pad'
                    {...form.getInput('familarPhone')}
                    icon='phone'
                />
                
            </View>
            <View style={{flex:1}} >

            <TouchableOpacity style={styles.btn}>
                <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:24}}>Registrarme</Text>
            </TouchableOpacity>
            </View>
            <Footer/>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //marginTop: StatusBar.currentHeight,
    },
    btn:{
        backgroundColor: '#2BAEF7',
        justifyContent:'center',
        alignItems:'center',
        padding: '3%',
        marginHorizontal: '20%',
        marginVertical: '6%',
        borderRadius: 13,
    },
    inputs:{
        paddingHorizontal: '12%',
        marginVertical: 3,
        flex:4
    },
    input:{
        marginBottom: 5,
        borderBottomWidth: 0.9,
        borderColor: 'black',
        fontSize: 15,
    },
})
