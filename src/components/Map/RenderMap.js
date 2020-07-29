import React, {useState, useEffect, lazy} from 'react'
import { 
    StyleSheet, 
    View,
    Image,
    Text,
    Alert
} from 'react-native';
import  
    MapView,
    {
        Marker, 
        Callout,
    } 
from 'react-native-maps'; 

//Markers Images
import CovidMarker from '../../utils/Img/MapMarkers/CovidMarker.webp'
import GeneralMarker from '../../utils/Img/MapMarkers/GeneralMarker.webp'
import OdontologiaMarker from '../../utils/Img/MapMarkers/OdontologiaMarker.webp'
import UndefinedMarker from '../../utils/Img/MapMarkers/Undefined.webp'


let RenderMap = (props) =>{
    const [hospitalsF, setHospitalsF]= useState([])
    const [initialRegion, setinitialRegion]= useState(props.initialRegion)
    useEffect( ()=>{
        const {HospitalCategory}= props
        const {Hospitals}= props
        setinitialRegion(props.initialRegion)
        if (HospitalCategory === 'NoSelected'){
            setHospitalsF(Hospitals)
        }else{
            let HospitalsFiltred = Hospitals.filter(x=>
                x.category == HospitalCategory
            )
            setHospitalsF(HospitalsFiltred)
        }
    },[props.Hospitals,props.HospitalCategory, props.initialRegion] ) 

    function getRequireNameByCategory (category){
        switch (category){
            case 'Covid' :
                return CovidMarker
            case 'General' :
                return GeneralMarker
            case 'Odontologia' :
                return OdontologiaMarker
            default:
                return UndefinedMarker
        }

    }
    const Odontologia ='Odontologia'

    return(
        <View 
            style={styles.mapStyle}
        >
            <MapView
                style={styles.mapStyle}
                showsUserLocation={true}
                initialRegion={initialRegion}
                onPress={(c)=>props.onMapPress(c)}
                followsUserLocation={true}
                loadingEnabled={true}
            >
                
                {
                    hospitalsF.map( (x,i) =>{
                        return(
                            <Marker 
                            coordinate={
                                {latitude: parseFloat(x.latitude) , 
                                longitude: parseFloat(x.longitude)} 
                            } 
                            key={i}
                            title={x.title }
                            description={x.address}
                            >
                                <Image
                                    source={getRequireNameByCategory(x.category)}
                                    style={styles.markerImage}
                                    
                                /> 
                                <Callout onPress={()=>Alert.alert(JSON.stringify(x)) } >
                                </Callout>
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
    image:{
        width:45,
        height:45,
        borderRadius:30,
    },
});
export default RenderMap;