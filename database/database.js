const mongoose = require('mongoose')
require('dotenv').config()

const mongoAtlasConnection = mongoose.connect(process.env.MONGO_ATLAS_DRIVE_LINK)

module.exports = {mongoAtlasConnection}