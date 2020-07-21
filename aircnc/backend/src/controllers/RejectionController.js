const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;
    
    const booking = await await Booking.findById(booking_id).populate('spot');

    booking.approved = false;

    await booking.save();

    // Conexão de tempo real
    const bookingkUserSocket = req.connectedUsers[booking.user]

    if (bookingkUserSocket) {
        req.io.to(bookingkUserSocket).emit('booking_response', booking);
    }

    return res.json(booking); 
  }
};