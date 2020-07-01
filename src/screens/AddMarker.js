import React, {Component} from 'react'
import { 
    StyleSheet, 
    View,
    StatusBar,
} from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux'
import {addMarker, removeMarker} from '../reduxSrc/actions/markers'


class AddMarker extends Component{
    constructor(props){
        super(props)
        this.TypeList=["Selecciona el tipo de hospital","Covid", "Odontologia", "General", "Otros"]
        this.state={
            MarkerName:'',
            MarkerType:'',
            selectedItem:'',
            MarkerAdress:'',
        }
    }
    markerTypeList = () =>{
        return(
            this.TypeList.map((x,i)=>{
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
    add = async() =>{
        const {navigation}=this.props
        const latitude = navigation.getParam('lat')
        const longitude = navigation.getParam('lng')
        const {MarkerName} = this.state;
        const {MarkerType} = this.state;
        const {MarkerAdress} = this.state;
        this.props.addMarker(
            {
                latitude: latitude,
                longitude: longitude,
                title: MarkerName,
                address: MarkerAdress,
                category: MarkerType
            }
        )
        navigation.navigate('MapScreen')
    }
    render(){
        const {navigation}=this.props
        return(
            <View style={styles.container} >
                <View>
                    <Title
                        style={{alignSelf:"center", marginTop:50}}
                    >
                        ¡Agrega tu marcador!
                    </Title>
                    <TextInput
                        style={{marginHorizontal:'5%', marginTop:20}}
                        label='Escribe el nombre del marcador'
                        onChangeText={(MarkerName)=> this.setState({MarkerName})} 
                    />
                    <TextInput
                        style={{marginHorizontal:'5%', marginTop:'5%'}}
                        label='Escribe La direccion del marcador'
                        onChangeText={(MarkerAdress)=> this.setState({MarkerAdress})} 
                    />
                    <View style={styles.picker} >
                        <Picker
                            selectedValue= {(this.state && this.state.MarkerType) || 'a'} //{this.state.selectedItem}
                            onValueChange={(x,i)=>{
                                this.setState({MarkerType: x, selectedItem: x})
                                console.log(x)
                            }}
                            
                        >
                            {this.markerTypeList()}
                        </Picker>
                    </View>
                    
                    <View style={{marginVertical:'10%', alignSelf:'center', flexDirection:'row',marginHorizontal:'5%'}} >
                        <Button
                            onPress={()=>navigation.navigate('MapScreen')}
                        >
                            Volver al mapa
                        </Button> 
                        <Button
                            onPress={()=>this.add()}
                        >
                            Guardar marcador
                        </Button>
                    </View>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight
    },
    picker:{
        borderWidth:1,
        borderColor:'gray',
        marginTop: 15, 
        marginTop: '10%',
        marginHorizontal:'5%'
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