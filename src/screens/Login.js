import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, Text, TextInput, Image, ImageBackground} from "react-native";
import Footer from '../components/Footer';
import Logo from '../../android/app/src/main/web_hi_res_512.png';
import Fondo from '../utils/Img/LOGIN.png'
const Login = ()=>{
    return(
        <View style={styles.container}>
            <ImageBackground source={Fondo} style={{flex:1, resizeMode: 'cover'}}>
                <View style={styles.logoView}>
                    <Image source={Logo} style={styles.logo}/>
                </View>
                <View style={styles.inputs}>
                    <Text style={{color:'#2BAEF7', fontSize:40, textAlign:'center',marginBottom: '15%'}}>SIGN IN</Text>
                    <TextInput style={styles.input} placeholder='Email or DNI'/>
                    <TextInput style={styles.input} placeholder='Password'/>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:24}}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={{color:'#2BAEF7'}}>Sign Up</Text>
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
        marginTop: StatusBar.currentHeight,
    },
    logoView:{
        justifyContent:'center',
        alignItems: 'center',
        elevation: 5,
        marginTop: '20%'
    },
    logo:{
        width: 180,
        height: 180,
        borderRadius: 90,
    },
    signup:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btn:{
        backgroundColor: '#2BAEF7',
        justifyContent:'center',
        alignItems:'center',
        padding: '3%',
        marginHorizontal: '20%',
        marginVertical: '5%',
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