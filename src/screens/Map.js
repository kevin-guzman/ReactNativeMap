import React, {Component} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
//import Geolocation from '@react-native-community/geolocation';
import Reload from '../utils/Img/Reload.png'
import RenderMap from '../components/Map/RenderMap'
import ButtonMap from '../components/Map/ButtonsMap'
import CovidMarker from '../utils/Img/MapMarkers/CovidMarker.png'
import GeneralMarker from '../utils/Img/MapMarkers/GeneralMarker.png'
import OdontologiaMarker from '../utils/Img/MapMarkers/OdontologiaMarker.png'


class App extends Component {

    constructor (props){
    super(props);
    // Este set interval es para actualizar los marcadores del mapa, remover si usa muchos recursos (Para
    //actualizar se puede con el boton azul de la parte inferior de la app).
    setInterval(() => {
        this.Reading();
    }, 2000); 
    this.state={
        Nombre:null,
        Hospitals:[ 
                    {latitude: 4.699050, longitude: -74.050105, category:1, title:'Tunal'},
                    {latitude: 4.671959, longitude: -74.083579, category:2, title:'Chricales'},
                    {latitude: 4.683959, longitude: -74.083579, category:3, title:'Country'},
                    {latitude: 4.671959, longitude: -74.050105, title:'Kennedy'},
        ], 
        Mapa:[],
        location:null,
        errorMsg:null,
        UserLatitude:0.0,
        UserLongitude:0.0,
        HospitalCategory:'NoSelected',
        Aux:0,
        KeyRefresh:1,
        };
    }
    

    componentDidMount = async() =>{
        try {
            await AsyncStorage.setItem('Markers', JSON.stringify(this.state.Hospitals));
            //console.log('pushed')
        } catch (error) {
            Alert.alert(error)
        }
    }

    Reading = async() =>{
        try {
            const myArray = await AsyncStorage.getItem('Markers');
            if (myArray !== null) {
                //console.log('Async');
                //console.log(JSON.parse(myArray));
                //console.log(this.state.Hospitals)
                this.setState({Hospitals: JSON.parse(myArray)})
            }
        } catch (error) {
            Alert.alert(error)
        }
    }
    
    
    touchedOpacity = (ref) =>{
        this.setState({
            //KeyRefresh: this.state.KeyRefresh+1,
            HospitalCategory: ref
        })
    }

    onMapPress = (MarkerCoord) =>{
        const {navigation}=this.props
        let m= MarkerCoord.nativeEvent.coordinate
        this.setState({KeyRefresh: this.state.KeyRefresh +1})
        navigation.navigate('AddMarker',{
            lat: m.latitude,
            lng: m.longitude
        })
    }

    render(){

    const Bogotá_Coordinates ={ latitude: 4.6097100,
                                longitude: -74.0817500,
                                latitudeDelta: 0.27, /*0.0922*/
                                longitudeDelta: 0.27, /*0.0421*/};
    const {navigation}= this.props;
    const {HospitalCategory} = this.state;
    const {KeyRefresh} = this.state;
        
        return (
            <View style={styles.container} >
                <View style={styles.mapContainer}  >
                    <RenderMap
                        Hospitals={this.state.Hospitals}
                        refreshScreen={this.state.KeyRefresh}
                        HospitalCategory={this.state.HospitalCategory}
                        onMapPress={this.onMapPress}
                    />
                </View>
                <View style={styles.footer} >
                    <ButtonMap
                        touchedOpacity={this.touchedOpacity}
                        title="Odontologia"
                        Img={OdontologiaMarker}
                        bgColor='rgba(71,185,219,0.5)'
                        brColor='rgba(26,100,122,0.8)'
                    />
                    <ButtonMap
                        touchedOpacity={this.touchedOpacity}
                        title="Covid"
                        Img={CovidMarker}
                        bgColor='rgba(91,225,100,0.5)'
                        brColor='rgba(44,129,49,0.8)'
                    />
                    <ButtonMap
                        touchedOpacity={this.touchedOpacity}
                        title="General"
                        Img={GeneralMarker}
                        bgColor='rgba(71,185,219,0.5)'
                        borColor='rgba(26,100,122,0.8)'
                    />
                    <View style={{fle:1,marginTop:'1%',  alignItems:'flex-end', marginHorizontal:'0%'}} >
                        <TouchableOpacity
                            onPress={(KeyRefresh)=>{ //this.Reading(KeyRefresh)
                                this.setState({
                                    HospitalCategory: 'NoSelected', KeyRefresh: KeyRefresh+1
                                })
                                this.Reading()
                            }
                            } //this.componentDidMount()
                        >
                            <Image 
                                source={Reload}
                                style={styles.image}
                            />            
                        </TouchableOpacity>
                    </View>
                    
                </View>
                

            
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: StatusBar.currentHeight
    },
    mapContainer:{
        flex:10,
        borderColor:'black',
        borderWidth:1,
        marginHorizontal:'3%',
        width:'95%',
        height:'90%',
        borderRadius:4,
    },
    image:{
        width:45,
        height:45,
        borderRadius:30,
    },
    footer:{
        flexDirection:'row',
        flex:1,
        //justifyContent:'space-between',
        //marginVertical:'4%'
    },
});
export default App;




/*Este código es para usarlo con una api :3*/ 


/*
async componentDidMount(){

        


     const url = 'http://181.54.182.7:5000/api/hospitals'
    const response = await fetch(url)
    let data = await response.json()
    //console.log(data)
        this.setState({
            Mapa:data
        })

        let DataRead = this.state.Mapa 
        let Go  = []
        DataRead.map(function(arr){
            
        const obj={
            latitude:arr.lat,
            longitude:arr.lng,
            title:arr.name,
            address:arr.address,
            category:arr.category
            }
            Go.push(obj)
            //console.log(obj)
        }) 
        //this.setState({Hospitals:Go});  
         await Geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                console.log(`Posicion: ${position}`);
                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        ).catch(e=>console.log(e)) 
    }

    GoToQR = (HN,HA) =>{
    const {navigation}= this.props;
    navigation.navigate('QR', 
                                {
                                HospitalName: HN, 
                                HospitalAddres:HA, 
                                UserLatitude: this.state.UserLatitude, 
                                UserLongitude: this.state.UserLongitude 
                                }
                            )
    } 
    
    
    


    sendMarker = async(coor) =>{
        fetch('http://181.54.182.7:5000/api/hospitals', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                lat:coor.latitude,
                lng:m.longitude,
                name:"Prueba",
                address:"1",
                category:"2"
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
    }
    
    
    
    
    
    
    
    
    
    
    */