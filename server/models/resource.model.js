const mongoose = require("mongoose");
const {Schema} = mongoose;

const ResourceSchema = new Schema({
    subject: {
        type: String, 
        required: [true, "Agrega una asignatura"]
    },
    topic: {
        type: String, 
        required: [true, "Agrega un tema"]
    },
    type: {
        type: String,
        required: [true, "Agrega el tipo de recurso"]
    },
    source: {
        type: String, 
        required: [true, "El recurso necesita fuente"]
    }
})

const Resource = mongoose.model("Resource", ResourceSchema);
module.exports = Resource;