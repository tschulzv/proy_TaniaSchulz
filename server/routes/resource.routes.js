const ResourceController = require("../controllers/resource.controller");

module.exports = app => {
    app.post("/resources/create", ResourceController.createResource);
    app.get("/resources", ResourceController.getResources);
    app.get("/resources/:id", ResourceController.getOneResource);
    app.put("/resources/:id/edit", ResourceController.editResource);
    app.delete("/resources/:id", ResourceController.deleteResource);
}