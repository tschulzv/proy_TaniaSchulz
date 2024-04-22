const mongoose = require("mongoose");
const {Schema} = mongoose;

const SessionSchema = new Schema({
    subject: {
        type: String, 
        required: [true, "Agrega una asignatura"]
    },
    date: {
        type: String, 
        required: [true, "Agrega la fecha"]
    },
    timeInSeconds: {
        type: Number,
        required: [true, "Agrega el tiempo (en segundos)"]
    }
})


const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;