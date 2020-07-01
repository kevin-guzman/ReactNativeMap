import React, {Component, useState, useEffect} from 'react'
import { 
    StyleSheet, 
    View,
    Image,
} from 'react-native';
import  
    MapView,
    {Marker,
    Polyline,
    Callout,
    PROVIDER_GOOGLE,
    GOOGLE_MAPS_APIKEY,       
} from 'react-native-maps'; 

import CovidMarker from '../../utils/Img/MapMarkers/CovidMarker.png'
import GeneralMarker from '../../utils/Img/MapMarkers/GeneralMarker.png'
import OdontologiaMarker from '../../utils/Img/MapMarkers/OdontologiaMarker.png'
import UndefinedMarker from '../../utils/Img/MapMarkers/Undefined.png'

const Bogotá_Coordinates ={ latitude: 4.6097100,
    longitude: -74.0817500,
    latitudeDelta: 0.27, /*0.0922*/
    longitudeDelta: 0.27, /*0.0421*/};

let RenderMap = (props) =>{
    
    const [hospitalsF, setHospitalsF]= useState([])

    useEffect( ()=>{
        console.log('Useeffect')
        const {HospitalCategory}= props
        const {Hospitals}= props
        if (HospitalCategory === 'NoSelected'){
            setHospitalsF(Hospitals)
            console.log(hospitalsF)
        }else{
            console.log(HospitalCategory)
            //console.log(Hospitals)
            let HospitalsFiltred = Hospitals.filter(x=>
                x.category == HospitalCategory
            )
            setHospitalsF(HospitalsFiltred)
            console.log(hospitalsF)
            /* console.log(HospitalsFiltred)
            setHospitalsF(HospitalsFiltred) */
            //return HospitalsFiltred;
        }
    },[props.HospitalCategory] )    

    return(
        <View 
            key={props.refreshScreen} 
            style={styles.mapStyle}
        >
            <MapView
                style={styles.mapStyle}
                showsUserLocation={true}
                initialRegion={Bogotá_Coordinates}
                onPress={(c)=>props.onMapPress(c)}
            >
                {
                    hospitalsF.map( (x,i) =>{    //props.Hospitals
                        return(
                            <Marker 
                            coordinate={
                                {latitude: parseFloat(x.latitude) , 
                                longitude: parseFloat(x.longitude)} 
                            } 
                            key={i}
                            title={x.title }
                            description={x.address}
                            
                            /* onCalloutPress={()=> this.GoToQR(x.title,x.address)} */
                            >
                                {
                                    x.category === undefined ?
                                        <Image
                                            source={UndefinedMarker}
                                            style={styles.markerImage}
                                        />
                                    :
                                    x.category === 'Covid' ?
                                        <Image
                                            source={CovidMarker}
                                            style={styles.markerImage}
                                        />
                                    :
                                    x.category === 'General'?
                                        <Image
                                            source={GeneralMarker}
                                            style={styles.markerImage}
                                        />
                                    :
                                    x.category === 'Odontologia'?
                                        <Image
                                            source={OdontologiaMarker}
                                            style={styles.markerImage}
                                        />
                                    :
                                    null
                                }
                                
                            </Marker>
                        )
                    } )
                }
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    markerImage:{
        width:70,
        height:70
    },
    mapStyle:{
        flex:1,
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
});
export default RenderMap;