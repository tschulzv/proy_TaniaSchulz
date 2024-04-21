const SessionController = require("../controllers/session.controller");

module.exports = app => {
    app.get("/sessions", SessionController.getSessions);
    app.get("/sessions/today", SessionController.getTodaySessions);
    app.post("/sessions/create", SessionController.createSession);
    app.get("/sessions/:id", SessionController.getOneSession);
    app.get("/average", SessionController.getAvgTime);
    app.put("/sessions/:id/edit", SessionController.editSession);
    app.delete("/sessions/:id", SessionController.deleteSession);
}