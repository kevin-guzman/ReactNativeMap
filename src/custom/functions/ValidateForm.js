
export function ValidateForm({fields}){
    if (filter(fields).length !== 0){
        return 'Todos los campos son obligatorios'
    }else{
        if(fields.psw !== fields.cpsw){
            return 'Las contraseñas no coinciden'
        }else if (fields.psw.length < 4){
            return 'La contraseña debe der mayor a 4 digitos'
        }else{
            return true
        }
        
    }
}

function filter(fields){
    let vec =[]
    for(let i in fields){
        if(fields[i] === ''){
            //vec.push({[i]:fields[i]})
            vec.push(i)
        }
    }
    return vec
}