import React, {Component} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button, Title } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';


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
        var category=0;

        var M= await AsyncStorage.getItem('Markers');
        M= JSON.parse(M)
        
        switch(MarkerType){
            case "Covid":
                category=1;
                console.log('case1')
            break;
            case "Odontologia":
                category=2
                console.log('case2')
            break;
            case "General":
                category=3
                console.log('case3')
            break;
        }

        var obj={
            latitude: latitude,
            longitude: longitude,
            title: MarkerName,
            address: MarkerAdress,
            category: MarkerType
        }
        M.push(obj)

        try {
            await AsyncStorage.setItem('Markers', JSON.stringify(M));
        } catch (error) {
            Alert.alert(error)
        }

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

export default AddMarker;






/*Este código es para usarlo con una api :3*/ 

        /* fetch('http://181.54.182.7:5000/api/hospitals', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                lat: latitude,
                lng: longitude,
                name: MarkerName,
                address: "1",
                category: category
            })
        })
        .then((response) => response.json())
            .then((text) => {
            //console.log(text._id)
            //console.log(text._id.toString())
            //this.setState({valueForQRCode: (text._id).toString()})
            console.log('Innn')
            
            })
            .catch(err=>{
                console.log(err)
            }) */