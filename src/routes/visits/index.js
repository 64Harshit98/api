const MainVisitRouter = require("express").Router();

MainVisitRouter.get("/", (req, res) => {
	res.status(200).send("Inside vists 💳");
});

// For scheduling a visit to properties
MainVisitRouter.route("/schedule").post(require("./createVisit"));

// For confirming the visit by owner
MainVisitRouter.route("/confirm/:visitId").put(require("./confirmVisit"));

// For paying for a visit
MainVisitRouter.route("/pay/:visitId").put(require("./confirmVisit"));

// For Updating the visit
MainVisitRouter.route("/upadate/:visitId").put(require("./updateVisit"));

// For cancelling a visit
MainVisitRouter.route("/cancel/:visitId").put(require("./updateVisit"));

// For viewing the visits by user or property owner
MainVisitRouter.route("/viewScheduled/:userId").get(require("./viewVisit"));
MainVisitRouter.route("/viewConfirmed/:propId").get(require("./viewVisit"));

module.exports = MainVisitRouter;
