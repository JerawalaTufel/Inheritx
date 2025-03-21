const { User } = require('../models/User')
const { valiRegister, valiLogin } = require("../validations/validation");
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const register = async (req , res) => {
    const reqParam = req?.body;
    const validate = valiRegister(reqParam );
    if (validate.status !== 200) {
        return res.status(validate.status).json({ message: validate.message });
    }
    const findUser = await User.findOne({email : reqParam.email});
    if(findUser) return res.status(400).json({status : 400 , message : 'user exists please login'});
    const salt = await bycrpt.genSalt(parseInt(process.env.SALT_ROUND));
    const hasPass = await bycrpt.hash(reqParam.password,salt);
    reqParam.password = hasPass;
    const newUser = await User.create(reqParam);
    res.status(201).send({
        status : 200,
        message : "user register please login",
        data : newUser
    })
}

const login = async (req , res) => {
    const reqParam = req.body;
    const validate = valiLogin(reqParam);
    if (validate.status !== 200) {
        return res.status(validate.status).json({ message: validate.message });
    }
    const findUser = await User.findOne({email : reqParam.email});
    if(!findUser) return res.status(400).json({status : 400 , message : 'user not exists please signup'});

    const passCom = await bycrpt.compare(reqParam.password , findUser.password);
    
    if(passCom){
        const token = jwt.sign({id: findUser.id , email : findUser.email , name : findUser.name}, process.env.KEY);

        res.status(200).send({
            status : 200,
            message : 'login successfully',
            'token' : token
        })
    } else {
        return res.status(400).json({status : 400 , message : "wrong password"})
    }
    
}

const getProfile = async(req , res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) return res.status(404).json({status : 400 , message : "user not found"})
        res.status(200).send({
        user : user
        })
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = { register , login ,  getProfile}