const express = require("express");
const { resetTickets } = require("../controllers/ticket");
const { isAuthenticated } = require("../controllers/auth");
const router = express.Router();

router.post("/resetTickets", isAuthenticated ,resetTickets);

module.exports = router;
