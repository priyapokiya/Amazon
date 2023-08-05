const Validation = (data,type) => {
    let err = []

    if(type === "register"){
        if(!(data.firstName)){
            err.push({key:"firstName",message:"Required field Firstname is empty"})
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))){
            err.push({key:"firstName",message:"Invalid Firstname"})
        }

        if(!(data.lastName)){
            err.push({key:"lastName",message:"Required field Lastname is empty"})
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.lastName))){
            err.push({key:"lastName",message:"Invalid Lastname"})
        }

        if(!(data.email)){
            err.push({key:"email",message:"Required field Email is empty"})
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email",message:"Invalid Email"})
        }

        if(!(data.password)){
            err.push({key:"password",message:"Required field Password is empty"})
        }else if(!(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/.test(data.password))){
            err.push({key:"password",message:"Password is to week please enter strong password"})
        }
    }else if(type === "shipping"){
        if(!(data.fullName)){
            err.push({key:"fullName",message:"Please enter your fullName"})
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.fullName))){
            err.push({key:"fullName",message:"Invalid fullName"})
        }
        if(!(data.Phone)){
            err.push({key:"Phone",message:"Please enter your Phone Number"})
        }else if (!(/^\d{10}$/.test(data.Phone))){
            err.push({key:"Phone",message:"Invalid Phone Number"})
        }
        if(!(data.Address)){
            err.push({key:"Address",message:"Please enter you address"})
        }
        if(!(data.City)){
            err.push({key:"City",message:"Please enter your city"})
        }
        if(!(data.State)){
            err.push({key:"State",message:"Please enter your state"})
        }
        if(!(data.Pincode)){
            err.push({key:"Pincode",message:"Please enter your pincode"})
        }else if (!(/^\d{6}$/.test(data.Pincode))){
            err.push({key:"Pincode",message:"Invalid Pincode"})
        }
    }else{
        if(!(data.email)){
            err.push({key:"email",message:"Required field Email is empty"})
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email",message:"Invalid Email"})
        }
        
        if(!(data.password)){
            err.push({key:"password",message:"Required field Password is empty"})
        }else if(!(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/.test(data.password))){
            err.push({key:"password",message:"Password is to week please enter strong password"})
        }
    }
    return err
}

export default Validation