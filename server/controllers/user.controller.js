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
        const filePath = path.join(__dirname, "../user.json");
        fs.writeFileSync(filePath, JSON.stringify(updatedUser, null, 2));
        console.log("[usercontroller]", updatedUser);
        res.status(200).json(updatedUser); 
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Error al actualizar el usuario"); 
    }
}