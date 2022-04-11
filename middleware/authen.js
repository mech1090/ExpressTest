const { BAD_REQUEST } = require("../constant")

const authenticate = (req,res,next)=>{
    const {username,password} = req.body
    console.log('Authentication area')
    const authenticated = true
    if(authenticated){
        console.log('user authenticated')
        next()
       
    }
    res.status(401).send(BAD_REQUEST)
    
}

module.exports = {
    authenticate
}