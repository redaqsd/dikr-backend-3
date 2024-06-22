const mongoose = require("mongoose")


const DikrSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    times : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model("DikrSchema" , DikrSchema)