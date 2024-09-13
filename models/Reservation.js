const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    customer: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
