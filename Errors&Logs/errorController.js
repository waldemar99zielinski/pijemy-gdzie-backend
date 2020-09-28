const errorDevelopment = (err, res) =>{
    console.log(err + err.stack)
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const errorProduction = (err, res) => {
    //operational errors
    if(err.isOperational){
        res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        })

    }
    //programming errors TODO: log it properly
    else{
        console.error('error', +err)

        res.status(500).json({
            status: 'error',
            message: 'Something is wrong.'
        })
    }
    
}



module.exports = (err, req, res, next)=>{
    //TODO: logs

    //in case of internal server error
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

   
    if(process.env.NODE_ENV === 'development'){
       
       errorDevelopment(err, res)
    }else{
        if(err.name === 'CastError'){

        }

        errorProduction(err, res)
    }

    

    
}