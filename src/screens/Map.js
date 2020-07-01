import React, {Component} from 'react'
import { 
    StyleSheet, 
    View,
    StatusBar,
    TouchableOpacity,
    Image,
} from 'react-native';

import {connect} from 'react-redux'
import {addMarker, removeMarker} from '../reduxSrc/actions/markers'
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
    this.state={
        Nombre:null,
        Hospitals:[ 
                    {latitude: 4.699050, longitude: -74.050105, category: 'General', title:'Tunal'},
                    {latitude: 4.671959, longitude: -74.083579, category: 'Covid', title:'Chricales'},
                    {latitude: 4.683959, longitude: -74.083579, category: 'Odontologia', title:'Country'},
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
    touchedOpacity = (ref) =>{
        this.setState({
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
        return (
            <View style={styles.container} >
                <View style={styles.mapContainer}  >
                    <RenderMap
                        Hospitals={ this.props.markers } // this.props.markers
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
                                    HospitalCategory: 'NoSelected'
                                })
                                
                                }
                            } 
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
    },
});
export default connect(
    (state)=>({user:state.user, markers:state.markers}),
    {
        addMarker,
        removeMarker
    }
) 
(App);