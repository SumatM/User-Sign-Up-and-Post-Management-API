const mongoose = require('mongoose')


const userSchemea = mongoose.Schema({
    name:{type : String, require:true},
    email:{type: String, require:true, unique:true}
})

const userModel = mongoose.model('user',userSchemea)


module.exports = {userModel}