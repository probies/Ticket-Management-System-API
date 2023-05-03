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

module.exports = { resetTickets };
