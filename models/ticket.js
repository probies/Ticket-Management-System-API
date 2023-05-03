const mongoose = require("mongoose");

// Create a Ticket schema
const ticketSchema = new mongoose.Schema({
  seatNumber: Number,
  status: { type: String, default: "open" },
  owner: {
    type: {},
    default: null,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
