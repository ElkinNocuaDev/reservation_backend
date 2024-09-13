const { body, query, validationResult } = require('express-validator');
const Reservation = require('../models/Reservation');

// Middleware para validar la creación de una nueva reserva
const createReservationValidators = [
    body('customer').isString().withMessage('Customer must be a string'),
    body('service').isString().withMessage('Service must be a string'),
    body('date').isISO8601().withMessage('Date must be a valid ISO 8601 date'),
    body('status').optional().isIn(['pending', 'confirmed', 'cancelled']).withMessage('Status must be one of "pending", "confirmed", or "cancelled"'),
];

// Middleware para validar la actualización de una reserva
const updateReservationValidators = [
    body('customer').optional().isString().withMessage('Customer must be a string'),
    body('service').optional().isString().withMessage('Service must be a string'),
    body('date').optional().isISO8601().withMessage('Date must be a valid ISO 8601 date'),
    body('status').optional().isIn(['pending', 'confirmed', 'cancelled']).withMessage('Status must be one of "pending", "confirmed", or "cancelled"'),
];

// Middleware para validar los filtros en la consulta de reservas
const getReservationsValidators = [
    query('date').optional().isISO8601().withMessage('Date must be a valid ISO 8601 date'),
    query('customer').optional().isString().withMessage('Customer must be a string'),
    query('service').optional().isString().withMessage('Service must be a string'),
];

// Función para manejar los errores de validación
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Crear una nueva reserva
exports.createReservation = [
    ...createReservationValidators,
    handleValidationErrors,
    async (req, res) => {
        try {
            const newReservation = new Reservation(req.body);
            await newReservation.save();
            res.status(201).json(newReservation);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

// Obtener todas las reservas con filtros opcionales
exports.getReservations = [
    ...getReservationsValidators,
    handleValidationErrors,
    async (req, res) => {
        try {
            const filters = {};
            if (req.query.date) filters.date = req.query.date;
            if (req.query.customer) filters.customer = req.query.customer;
            if (req.query.service) filters.service = req.query.service;

            const reservations = await Reservation.find(filters);
            res.status(200).json(reservations);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una reserva
exports.updateReservation = [
    ...updateReservationValidators,
    handleValidationErrors,
    async (req, res) => {
        try {
            const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedReservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.status(200).json(updatedReservation);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
