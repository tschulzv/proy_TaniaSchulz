const Resource = require("../models/resource.model");

module.exports.getResources = (req, res) => {
    Resource.find({})
        .then((values) => {
            res.statusCode = 200;
            res.json({resources: values});
        })
        .catch((err) => {
            res.statusCode = 500
            res.json({error: error});
        })
}

module.exports.getOneResource = (req, res) => {
    Resource.findById(req.params.id)
        .then((resource) => {
            res.statusCode = 200
            res.json(resource);
        })
        .catch((error) => {
            res.statusCode = 500
            res.json({error: error});
        })
}

module.exports.createResource = (req, res) => {
    Resource.create(req.body)
        .then(newResource => res.json({resource : newResource}))
        .catch(err => res.json({msg: "ERROR", error: err}));
}

module.exports.editResource = (req, res) => {
    Resource.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(updatedResource => res.json(updatedResource))
    .catch(err => console.log(err));
}

module.exports.deleteResource = (req, res) => {
    Resource.findByIdAndDelete(req.params.id)
    .then( deletedResource => {
    console.log("Recurso borrado con éxito", deletedResource);
        res.status(200).json({ message: "Recurso deleted successfully", deletedResource });
    })
    .catch(err => {
        console.error("Error deleting resource:", err);
        res.status(500).json({ error: err.message });
    });
}


