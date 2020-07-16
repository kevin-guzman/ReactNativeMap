import React, {Component} from 'react'
import { 
    StyleSheet, 
    View,
    StatusBar,
} from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux'
import {addMarker, removeMarker} from '../reduxSrc/actions/markers'
import useForm from '../custom/hooks/useForm'

const initialValues ={
    MarkerName:'Nombre del marcador',
    MarkerAdress:'Direccion del marcador',
    MarkerType: 'Otros'
}
const TypeList=["Covid", "Odontologia", "General", "Otros"]

const markerTypeList = () =>{
    return(
        TypeList.map((x,i)=>{
            return(
                <Picker.Item
                    label={x}
                    key={i}
                    value={x}
                />
            )
        })
    )
}

const AddMarker = (props) => {
    const form = useForm({initialValues})
    const PickerValue = form.fields.MarkerType
    const {navigation}=props
    const latitude = navigation.getParam('lat')
    const longitude = navigation.getParam('lng')

    const Add = () =>{
        props.addMarker({
            latitude: latitude,
            longitude: longitude,
            title: form.fields.MarkerName,
            address: form.fields.MarkerAdress,
            category: form.fields.MarkerType
        })
        navigation.navigate('MapScreen')
    }

    return(
        <View style={styles.container} >
            <Title
                style={styles.title}
            >
                ¡Agrega tu marcador!
            </Title>
            <TextInput
                style={styles.textInput}
                label='Escribe el nombre del marcador'
                {...form.getInput('MarkerName')}
            />
            <TextInput
                style={styles.textInput}
                label='Escribe La direccion del marcador'
                {...form.getInput('MarkerAdress')}
            />
            <View style={styles.body} >
                <Text style={{textAlign:'center'}} >
                    Selecciona el tipo de hospital
                </Text>
                <View style={styles.picker} >
                    <Picker
                        {...form.getPicker('MarkerType')}
                        selectedValue={PickerValue}
                        
                    >
                        {markerTypeList()}
                    </Picker>
                </View>
            </View>
            <View style={styles.footer} >
                <View style={{flex:1}} >
                    <Button
                        onPress={()=>navigation.navigate('MapScreen')}
                    >
                        Volver
                    </Button> 
                </View>
                <View style={{flex:1}} >
                    <Button
                        onPress={()=>Add()}
                    >
                        Guardar 
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    picker:{
        borderWidth:1,
        borderColor:'gray',
    },
    title:{
        alignSelf:"center", 
        marginTop:50,
    },
    textInput:{
        marginHorizontal:'5%', 
        marginTop:20,
    },
    body:{
        marginTop: '10%',
        marginHorizontal:'5%',
    },
    footer:{
        marginVertical:'30%', 
        alignSelf:'center', 
        flexDirection:'row',
    }
})

export default connect(
    (state)=>({user:state.user, markers:state.markers}),
    {
        addMarker,
        removeMarker
    }
)
(AddMarker);
