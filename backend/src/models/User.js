const  Mongoose  = require("mongoose");

const UserSchema = new Mongoose.Schema({
    first_name : {
        type : String,
        require : true
    },
    last_name : {
        type : String,
        require : true
    },
    mobile_number : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
}, {
    timestamps : true
})
exports.User = Mongoose.model('User',UserSchema)