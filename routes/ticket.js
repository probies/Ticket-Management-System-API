const express = require("express");
const { resetTickets, updateTicket, getClosedTickets } = require("../controllers/ticket");
const { isAuthenticated } = require("../controllers/auth");
const router = express.Router();

router.patch("/tickets/:ticketId", updateTicket);
router.get("/tickets/closed", getClosedTickets)
router.post("/tickets/resetTickets", isAuthenticated, resetTickets);

module.exports = router;
