export default (state=[],action)=>{
    switch(action.type){
        case 'ADD_MARKER':
            return state.concat([action.marker])
        case 'REMOVE_MARKER':
            return state.filter((mark)=> mark.id != action.marker.id )
        case 'CLEAR_MARKERS':
            return []
        default:
            return state
    }
}