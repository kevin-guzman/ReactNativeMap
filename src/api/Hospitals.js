import {API_HOST} from '../utils/constants/ApiConstants'

export function getHospitals(range=1, lat, lang){
    const URL = `${API_HOST}/hospitals`
    return fetch(URL)
            .then((response)=>{return response.json()})
            .then((result)=>{return result})
}

export function registerUser({fields}){
    const {name, nit, email, lng, lat, address, age, psw, phone, familarPhone,city}= fields
    const URL = `${API_HOST}/users`
    return fetch(URL,{
                    method:'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type':'application/json',
                        },
                    body: JSON.stringify({
                        name,
                        nit,
                        email,
                        age,
                        psw,
                        phone,
                        familarPhone,
                        city,
                        location:{
                            lat,
                            lng
                        },
                        address
                    })
                })
            .then((response)=>{return response.json()})
            .then((result)=>{return result})
}

