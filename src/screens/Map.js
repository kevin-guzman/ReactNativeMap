import React, {Component, useState, useEffect, useRef} from 'react'
import { 
    StyleSheet, 
    View,
    StatusBar,
    TouchableOpacity,
    Image,
} from 'react-native';
//import Geolocation from '@react-native-community/geolocation';
//Redux
import {connect} from 'react-redux'
import {addMarker, removeMarker} from '../reduxSrc/actions/markers'
//Components
import RenderMap from '../components/Map/RenderMap'
import ButtonMap from '../components/Map/ButtonsMap'
//Images
import Reload from '../utils/Img/Reload.png'
import CovidMarker from '../utils/Img/MapMarkers/CovidMarker.png'
import GeneralMarker from '../utils/Img/MapMarkers/GeneralMarker.png'
import OdontologiaMarker from '../utils/Img/MapMarkers/OdontologiaMarker.png'
import Geolocation from '@react-native-community/geolocation';



let Mapa = (props) =>{
    const {navigation}=props
    const [hospitalCategory, sethospitalCategory]= useState('NoSelected')
    const [initialRegion, setInitialRegion] = useState(
        {latitude: 5.6097100,
        longitude: -74.0817500,
        latitudeDelta: 0.27, /*0.0922*/
        longitudeDelta: 0.27, /*0.0421*/}
    )
    
    let mapRef = useRef()
    

    const onMapPress = (MarkerCoord) =>{
        let m = MarkerCoord.nativeEvent.coordinate
        navigation.navigate('AddMarker',{
            lat: m.latitude,
            lng: m.longitude
        })
    }
    const touchedOpacity = (ref) =>{
        sethospitalCategory(ref)
    }

    useEffect(()=>{
        GetLocation()
    },[])

    const GetLocation = async () =>{
        await Geolocation.getCurrentPosition(
            pos => setInitialRegion(
                {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.27, /*0.0922*/
                    longitudeDelta: 0.27, /*0.0421*/
                }
            )
        )
    } 

    return(
        <View style={styles.container} >
            <View style={styles.mapContainer}  >
                <RenderMap
                    Hospitals={ props.markers }
                    HospitalCategory={hospitalCategory}
                    onMapPress={onMapPress}
                    initialRegion={initialRegion}
                />
            </View>
            <View style={styles.footer} >
                <ButtonMap
                    touchedOpacity={touchedOpacity}
                    title="Odontologia"
                    Img={OdontologiaMarker}
                    bgColor='rgba(71,185,219,0.5)'
                    brColor='rgba(26,100,122,0.8)'
                />
                <ButtonMap
                    touchedOpacity={touchedOpacity}
                    title="Covid"
                    Img={CovidMarker}
                    bgColor='rgba(91,225,100,0.5)'
                    brColor='rgba(44,129,49,0.8)'
                />
                <ButtonMap
                    touchedOpacity={touchedOpacity}
                    title="General"
                    Img={GeneralMarker}
                    bgColor='rgba(71,185,219,0.5)'
                    borColor='rgba(26,100,122,0.8)'
                />
                <View style={{fle:1,marginTop:'1%',  alignItems:'flex-end', marginHorizontal:'0%'}} >
                    <TouchableOpacity
                        onPress={()=> sethospitalCategory('NoSelected')} 
                    >
                        <Image 
                            source={Reload}
                            style={styles.image}
                        />            
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
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
    },
});
export default connect(
    (state)=>({user:state.user, markers:state.markers}),
    {
        addMarker,
        removeMarker
    }
) 
(Mapa);