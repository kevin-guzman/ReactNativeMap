export default (state=[],action)=>{
    const FirstMarker= {
        latitude: 4.699050, 
        longitude: -74.050105, 
        category: 'General', 
        title:'Tunal'
    }
    state.concat([FirstMarker])
    switch(action.type){
        case 'ADD_MARKER':
            return state.concat([action.marker])
        case 'REMOVE_MARKER':
            return state.filter((event)=> marker.id != action.marker.id )
        case 'CLEAR_MARKERS':
            return []
        default:
            return state
    }
}