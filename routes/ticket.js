const express = require("express");
const { resetTickets, updateTicket } = require("../controllers/ticket");
const { isAuthenticated } = require("../controllers/auth");
const router = express.Router();

router.patch("/tickets/:ticketId", updateTicket);
router.post("/tickets/resetTickets", isAuthenticated, resetTickets);

module.exports = router;
