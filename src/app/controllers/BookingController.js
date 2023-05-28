const BookingModel = require('../models/BookingModel');

const getBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.getBookings();
        return res.status(200).json({
            ok: true,
            data: bookings,
            status: 1
        });
    } catch (error) {
        console.log('Error al obtener reservas: ', error);
        return res.status(500).json({
            ok: false,
            message: 'Hubo un error al obtener las reservas.',
            status: 0
        });
    }
}

module.exports = {
    getBookings
}