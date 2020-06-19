import React, {Component} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Alert,
    Picker
} from 'react-native';
import  
    MapView,
    {Marker,
    Polyline,
    Callout,
    PROVIDER_GOOGLE,
    GOOGLE_MAPS_APIKEY,
        
} from 'react-native-maps'; 
import { TextInput, Button } from 'react-native-paper';
import { BaseButton } from 'react-native-gesture-handler';

class AddMarker extends Component{
    constructor(props){
        super(props)
        this.TypeList=["Selecciona el tipo de hospital","Covid", "Odontologia", "General", "Otros"]
        this.state={
            MarkerName:'',
            MarkerType:'',
            selectedItem:''
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
    add = () =>{
        const {navigation}=this.props
        const latitude = navigation.getParam('lat')
        const longitude = navigation.getParam('lng')
        const {MarkerName} = this.state;
        const {MarkerType} = this.state;
        const category="";
        switch(MarkerType){
            case "Covid":
                category="1";
            case "Odontologia":
                category="2"
            case "General":
                category="3"
        }

        fetch('http://181.54.182.7:5000/api/hospitals', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                lat:latitude,
                lng:longitude,
                name:MarkerName,
                address:"1",
                category:category
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
            })

        navigation.navigate('MapScreen')
    }
    render(){
        const {navigation}=this.props
        return(
            <View style={styles.container} >
                <View>
                    <TextInput
                        style={{marginHorizontal:'5%', marginTop:'30%'}}
                        label='Selecciona el nombre del marcador'
                        onChangeText={(MarkerName)=> this.setState({MarkerName})} 
                    />
                    <Picker
                        style={{marginTop: 15, marginVertical: '7%',marginHorizontal:'5%'}}
                        selectedValue= {(this.state && this.state.selectedItem) || 'a'} //{this.state.selectedItem}
                        onValueChange={(x,i)=>{
                            this.setState({MarkerType: x, selectedItem: x})
                            console.log(x)
                        }}
                        
                    >
                        {this.markerTypeList()}
                    </Picker>
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

})

export default AddMarker