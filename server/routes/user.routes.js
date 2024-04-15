const UserController = require("../controllers/user.controller");

module.exports = app => {
    app.get("/user", UserController.getUser);
    app.put("/user/edit", UserController.editUser);
} 