export function addMarker(marker){
    return{
        type: 'ADD_MARKER',
        marker
    }
}

export function removeMarker(marker){
    return{
        type: 'REMOVE_MARKER',
        marker
    }
}

export function clearMarkers(marker){
    return{
        type: 'CLEAR_MARKERS'
    }
}