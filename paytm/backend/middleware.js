const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("./config")
const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization
    if(!header || !header.startsWith('Bearer ')){
        return res.status(403).json({message: "Error occurred"})
    }
    const token = header.split(' ')[1]

    try{
        const verify = jwt.verify(token, JWT_SECRET)
        if(verify.userId){
            req.userId = verify.userId
            next()
        }
        else{
            return res.status(403).json({message: "Error occurred"})
        }
    }catch(Error){
        return res.status(403).json({message: "Error occurred"})
    }
}

module.exports = authMiddleware