import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Image, ImageBackground} from "react-native";
import Footer from '../components/Footer';
import Logo from '../../android/app/src/main/web_hi_res_512.png';
import Fondo from '../utils/Img/LOGIN.png'
import useForm from '../custom/hooks/useForm'

const initialValues ={
    NIT:'',
    Password:'',
}

const Login = ()=>{
    const form = useForm({initialValues})
    console.log(form.fields)

    return(
        <View style={styles.container}>

            <ImageBackground source={Fondo} style={{flex:1, justifyContent:'center'}}  >
                <View style={styles.logoView}>
                    <Image source={Logo} style={styles.logo}/>
                </View>
                <View style={styles.inputs}>
                    <Text style={{color:'#2BAEF7', fontSize:40, textAlign:'center',marginBottom: '15%'}}>Entrar</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Numero de identificación' 
                        {...form.getInput('NIT')} 
                        keyboardType='number-pad'
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Contraseña' 
                        {...form.getInput('Password')} 
                    />
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:24}}>Entrar</Text>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text>¿Aún no tienes cuenta? </Text>
                    <TouchableOpacity>
                        <Text style={{color:'#2BAEF7'}}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </ImageBackground>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logoView:{
        justifyContent:'center',
        alignItems: 'center',
        elevation: 5,
        marginTop: '10%',
        
    },
    logo:{
        width: 180,
        height: 180,
        borderRadius: 90,
    },
    signup:{
        flexDirection: 'row',
        justifyContent: 'center',
        
        //flex:1
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
        paddingHorizontal: '20%',
        marginVertical: 3,
    },
    input:{
        marginBottom: 5,
        borderBottomWidth: 0.9,
        borderColor: 'black',
        fontSize: 15,
    },

})
export default Login;