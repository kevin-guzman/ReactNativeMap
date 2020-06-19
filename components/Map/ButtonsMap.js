import React from 'react'
import { View, TouchableOpacity,StyleSheet, Image } from 'react-native'
import { Paragraph, IconButton } from 'react-native-paper'
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar'

let ButtonMap = (props) =>{
    return(
        <View
            style={styles.viewTouchable}
        >
            <TouchableOpacity
                onPress={()=>props.touchedOpacity(props.title)}
                style={{
                    borderRadius:50,
                    borderColor:props.brColor,
                    backgroundColor:props.bgColor,
                    borderWidth:1,
                    marginVertical:'3%',
                    marginHorizontal:'0%',
                    flexDirection:"row",
                    alignSelf:"center"
                    }}
            >
                <Paragraph
                    style={styles.textTouchable}
                >
                    {props.title}
                </Paragraph>
                <Image
                    source={props.Img}
                    style={{width:25, height:25,alignSelf:'flex-end'}}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewTouchable:{
      marginHorizontal:'1%',
      alignSelf:'center',
    },
  
    textTouchable:{
      textAlign:'center', 
      margin:'3%'
    },

    styleTouchable:{
      flexDirection:'row',
      justifyContent:'space-between',
      //marginVertical:'4%'
    },
  
  });

  export default ButtonMap;