import {API_HOST} from '../utils/constants/ApiConstants'

export function getHospitals(range=1){
    const URL = `${API_HOST}/hospitals`
    return fetch(URL)
            .then((response)=>{return response.json()})
            .then((result)=>{return result})
}