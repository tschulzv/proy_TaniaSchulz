const fs = require("fs");
const path = require("path");

// obtener datos del json de usuario
module.exports.getUser = (req, res) => {
    res.sendFile(path.join(__dirname, "../user.json"))
} 

// editar json de usuario
module.exports.editUser = (req, res) => {
    const updatedUser = req.body;
    try {
        fs.writeFileSync("../user.json", JSON.stringify(updatedUser, null, 2));
        res.status(200).send("Exito, usuario actualizado");
    }   
    catch (err) {
        console.log("Error: ", err);
        res.status(500);
    }
}