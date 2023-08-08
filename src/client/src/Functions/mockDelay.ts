const delay = (ms: number, success = true) =>{
    return new Promise((res, rej) =>{
        setTimeout(()=>{
            if(success){
                res("done")
            }else{
                rej("done")
            }
        }, ms)
    })
}

export default delay