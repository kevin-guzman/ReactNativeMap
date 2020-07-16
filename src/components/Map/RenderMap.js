import React, {useState, useEffect} from 'react'
import { 
    StyleSheet, 
    View,
    Image,
} from 'react-native';
import  
    MapView,
    {Marker,
} from 'react-native-maps'; 

//Markers Images
import CovidMarker from '../../utils/Img/MapMarkers/CovidMarker.png'
import GeneralMarker from '../../utils/Img/MapMarkers/GeneralMarker.png'
import OdontologiaMarker from '../../utils/Img/MapMarkers/OdontologiaMarker.png'
import UndefinedMarker from '../../utils/Img/MapMarkers/Undefined.png'


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
    image:{
        width:45,
        height:45,
        borderRadius:30,
    },
});
export default RenderMap;