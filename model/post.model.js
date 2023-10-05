const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    content:{type: String, require:true},
    userId: {type: mongoose.Schema.Types.ObjectId}
})


const postModel = mongoose.model('post',postSchema);

module.exports = {postModel}