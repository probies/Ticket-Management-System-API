const Ticket = require("../models/ticket");

async function resetTickets(req, res) {
  try {
    // Check if there are any tickets in the database
    const count = await Ticket.countDocuments();
    if (count === 0) {
      // Generate 40 ticket documents and insert them into the collection
      const ticketDocuments = [];
      for (let i = 1; i <= 40; i++) {
        const ticket = {
          seatNumber: i,
        };
        ticketDocuments.push(ticket);
      }
      await Ticket.insertMany(ticketDocuments);
      res.status(201).json({ message: "Successfully generated 40 tickets" });
    } else {
      // Reset the status of all tickets to open
      await Ticket.updateMany({}, { $set: { status: "open", owner: null } });
      res.status(200).json({ message: "Successfully reset all tickets" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateTicket(req, res) {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (ticket.status === "close") {
      return res.status(400).json({ error: "Ticket already booked" });
    }

    // Update the ticket status and owner details
    ticket.status = req.body.status;
    if (req.body.status === "open") {
      ticket.owner = null;
    } else {
      ticket.owner = {
        name: req.body.owner.name,
        email: req.body.owner.email,
        phone: req.body.owner.phone,
      };
    }
    await ticket.save();

    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTicketStatus(req, res) {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ status: ticket.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getClosedTickets(req, res) {
  try {
    const closedTickets = await Ticket.find({ status: "close" });

    res.status(200).json(closedTickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getOpenTickets(req, res) {
  try {
    const closedTickets = await Ticket.find({ status: "open" });

    res.status(200).json(closedTickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTicketUser(req, res) {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (!ticket.owner) {
      return res.status(404).json({ error: "Ticket owner not found" });
    }

    res.status(200).json(ticket.owner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  resetTickets,
  updateTicket,
  getTicketStatus,
  getClosedTickets,
  getOpenTickets,
  getTicketUser,
};
