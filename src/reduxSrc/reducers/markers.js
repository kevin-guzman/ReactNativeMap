export default (state=[],action)=>{
    switch(action.type){
        case 'ADD_MARKER':
            return state.concat([action.room])
        case 'REMOVE_MARKER':
            return state.filter((event)=> room.id != action.room.id )
        case 'CLEAR_MARKERS':
            return []
        default:
            return state
    }
}