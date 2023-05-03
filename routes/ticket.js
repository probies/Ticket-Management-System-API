const express = require("express");
const { resetTickets, updateTicket, getClosedTickets, getOpenTickets, getTicketUser, getTicketStatus } = require("../controllers/ticket");
const { isAuthenticated } = require("../controllers/auth");
const router = express.Router();

router.patch("/tickets/:ticketId", updateTicket);
router.get("/tickets/closed", getClosedTickets)
router.get("/tickets/open", getOpenTickets)
router.get("/tickets/:ticketId/", getTicketStatus);
router.get("/tickets/:ticketId/user", getTicketUser)
router.put("/tickets/resetTickets", isAuthenticated, resetTickets);

module.exports = router;
