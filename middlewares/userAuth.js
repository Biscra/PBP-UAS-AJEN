validateAPI = '54321';

const auth = (req,res,next)=>{
    const key = req.headers['x-api-key']

    if(key==undefined){
        res.status(500).json({
            msg : "Not Aothorize"
        })
        return
    }
    else if(key != validateAPI){
        res.status(500).json({
            msg : "Not Valid API Key"
        })
        return
    }

    next()
}

module.exports = auth