const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const Dikr = require("./schema")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())


app.get("/api/v1/dikr" , async(req,res) => {
    const dikr = await Dikr.find({})
    res.status(200).json({dikr})
})

const connectDB = (url) => {
    mongoose.connect(url , console.log("Connected to DB!"))
}

const PORT = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        await app.listen(PORT , console.log(`Server is listening on port : ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
