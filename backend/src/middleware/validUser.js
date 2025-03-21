const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
require('dotenv').config()
const validUser = async (req , res , next) =>{
    const authToken = req.headers.authorization;
    if(!authToken) return res.status(400).json({status : 400 , messages : 'token not found'});
    const token = authToken.replace('Bearer ','')
    const decoded = jwt.verify(token, process.env.KEY)
    if(!decoded) return res.status(400).json({messages : 'wrong token'});
    const user = await User.findOne({_id : decoded.id});
    if(!user) return res.status(400).json({messages : 'did not find user plese login'})
    req.userId = decoded.id;
    next()
}

module.exports = {validUser}