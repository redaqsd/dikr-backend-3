const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const Dikr = require("./schema")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())


app.get("/" , async(req,res) => {
    const dikr = await Dikr.find({})
    res.status(200).json({dikr})
})

app.post("/" , async(req,res) => {
    const dikr = await Dikr.create(req.body)
    res.status(201).json({dikr})
})

app.get("/:id" , async(req,res) => {
    const {id : dikrID} = req.params
    const dikr = await Dikr.findOne({_id : dikrID})

    if(!dikr){
        res.status(400).send(`No Dikr Found With The Following ID : ${dikrID}`)
    }

    res.status(201).json({dikr})
})

app.delete("/:id" , async(req,res) => {
    const {id : dikrID} = req.params
    const dikr = await Dikr.findByIdAndDelete({_id : dikrID})

    if(!dikr){
        res.status(400).send(`No Dikr Found With The Following ID : ${dikrID}`)
    }

    res.status(201).json({dikr})
})

app.patch("/:id" , async(req,res) => {
    const {id : dikrID} = req.params
    const options = {
        new : true,
        runValidators : true
    }
    const dikr = await Dikr.findOneAndUpdate({_id : dikrID} , req.body , options)

    if(!dikr){
        res.status(400).send(`No Dikr Found With The Following ID : ${dikrID}`)
    }

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