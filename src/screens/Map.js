import React, {Component, useState, useEffect, useRef} from 'react'
import { 
    StyleSheet, 
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
//Redux
import {connect} from 'react-redux'
import {addMarker, removeMarker} from '../reduxSrc/actions/markers'
//Components
import RenderMap from '../components/Map/RenderMap'
import ButtonMap from '../components/Map/ButtonsMap'
import Loading from '../components/Loading'
//Images
import Reload from '../utils/Img/Reload.jpg'
import CovidMarker from '../utils/Img/MapMarkers/CovidMarker.webp'
import GeneralMarker from '../utils/Img/MapMarkers/GeneralMarker.webp'
import OdontologiaMarker from '../utils/Img/MapMarkers/OdontologiaMarker.webp'
import Geolocation from '@react-native-community/geolocation';
//Api
import {getHospitals} from '../api/Hospitals'


let Mapa = (props) =>{
    const {navigation}=props
    const [hospitalCategory, sethospitalCategory]= useState('NoSelected')
    const [initialRegion, setInitialRegion] = useState(null)

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
        /* getHospitals(3)
        .then((r)=>console.log(r)) */
    },[])

    const GetLocation = async () =>{
        await Geolocation.getCurrentPosition(
            pos => setInitialRegion(
                {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.017, /*0.0922*/
                    longitudeDelta: 0.017, /*0.0421*/
                }
            )
        )
    } 

    return(
        <View style={styles.container} >
            <View style={styles.mapContainer}  >
                {
                    initialRegion ? 
                        <RenderMap
                            Hospitals={ props.markers }
                            HospitalCategory={hospitalCategory}
                            onMapPress={onMapPress}
                            initialRegion={initialRegion}
                        />
                    :
                        <Loading/>
                }
            </View>
            <View style={styles.footer} >
                <View style={styles.footerLeft} >
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
                </View>

                <View style={styles.footerRigth} >
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
        marginTop:'2%'
    },
    mapContainer:{
        flex:10,
        borderColor:'black',
        borderWidth:1,
        width:'97%',
        height:'90%',
        borderRadius:4,
        marginLeft:'1.5%',
    },
    image:{
        width:35,
        height:35,
        borderRadius:30,
        marginHorizontal:'2%'
    },
    footer:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        width:'100%'
    },
    footerLeft:{
        flex:1,
        flexDirection:'row', 
        marginHorizontal:'1%', 
        justifyContent:'space-between', 
    },
    footerRigth:{
        flex:1,
        marginVertical:'2%', 
        alignItems:'flex-end', 
        marginHorizontal:'1%', 
        //alignSelf:'center'
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