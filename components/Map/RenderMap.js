import React, {Component} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import  
    MapView,
    {Marker,
    Polyline,
    Callout,
    PROVIDER_GOOGLE,
    GOOGLE_MAPS_APIKEY,
        
} from 'react-native-maps'; 
const Bogotá_Coordinates ={ latitude: 4.6097100,
    longitude: -74.0817500,
    latitudeDelta: 0.27, /*0.0922*/
    longitudeDelta: 0.27, /*0.0421*/};

let RenderMap = (props) =>{
    //var {HospitalCategory}= props.
    return(
        <View 
            key={props.refreshScreen} 
            style={styles.mapStyle}
        >
            <MapView
                style={styles.mapStyle}
                showsUserLocation={true}
                //ref='map'
                initialRegion={Bogotá_Coordinates}
            >
                {
                    props.Hospitals.map( (x,i) =>{    
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
                                    (x.category === 1 && props.HospitalCategory === 'Covid' ) || (props.HospitalCategory === 'NoSelected' && x.category === 1) ?
                                        <Image
                                            /* onLoad={() => this.forceUpdate()}
                                            onLayout={() => this.forceUpdate()} */
                                            source={require('../../Img/MapMarkers/CovidMarker.png')}
                                            style={styles.markerImage}
                                            >
                                        </Image>
                                    :
                                    (x.category === 2 && props.HospitalCategory === 'General' ) || (props.HospitalCategory === 'NoSelected' && x.category === 2) ?
                                        <Image
                                        /* onLoad={() => this.forceUpdate()}
                                        onLayout={() => this.forceUpdate()} */
                                        source={require('../../Img/MapMarkers/GeneralMarker.png')}
                                        style={styles.markerImage}
                                        >
                                        </Image>                              
                                    :
                                    (x.category === 3 && props.HospitalCategory === 'Odontologia' ) || (props.HospitalCategory === 'NoSelected' && x.category === 3) ?
                                        <Image
                                        /* onLoad={() => this.forceUpdate()}
                                        onLayout={() => this.forceUpdate()} */
                                        source={require('../../Img/MapMarkers/OdontologiaMarker.png')}
                                        style={styles.markerImage}
                                        >
                                        </Image>
                                    :
                                        <Image
                                            /* onLoad={() => this.forceUpdate()}
                                            onLayout={() => this.forceUpdate()} */
                                            source={require('../../Img/MapMarkers/Undefined.png')}
                                            style={styles.markerImage}
                                        >
                                        </Image>                                
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
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      //marginTop: StatusBar.currentHeight
      //paddingTop:'15%',
  
      //flexDirection:'row'
      
    },
  
    viewTouchable:{
      marginHorizontal:'1%',
      alignSelf:'center',
    },
  
    textTouchable:{
      textAlign:'center', 
      margin:'3%'
    },
  
    markerImage:{
      width:70,
      height:70
    },
  
    mapStyle:{
      flex:1,
      //width:'90%',
      //height:'80%'
      
    },
  
    mapContainer:{
      flex:10,
      borderColor:'black',
      borderWidth:1,
      marginHorizontal:'3%',
      //marginVertical:'7%',
      width:'95%',
      height:'90%',
      borderRadius:4,
    },
  
    image:{
      width:45,
      height:45,
      borderRadius:30,
      //flex:1
    },
  
    footer:{
      flexDirection:'row',
      //justifyContent:'space-between',
      //marginVertical:'4%'
    },
  
  });

  export default RenderMap;