const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Operations related to reservations
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: '2024-09-30T18:00:00Z'
 *               customer:
 *                 type: string
 *                 example: 'John Doe'
 *               service:
 *                 type: string
 *                 example: 'Dinner Reservation'
 *     responses:
 *       201:
 *         description: Reservation created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 date:
 *                   type: string
 *                 customer:
 *                   type: string
 *                 service:
 *                   type: string
 *       400:
 *         description: Bad Request
 */
router.post('/', reservationController.createReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Retrieve all reservations
 *     tags: [Reservations]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter reservations by date
 *       - in: query
 *         name: customer
 *         schema:
 *           type: string
 *         description: Filter reservations by customer name
 *       - in: query
 *         name: service
 *         schema:
 *           type: string
 *         description: Filter reservations by service type
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   date:
 *                     type: string
 *                   customer:
 *                     type: string
 *                   service:
 *                     type: string
 *       400:
 *         description: Bad Request
 */
router.get('/', reservationController.getReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Retrieve a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reservation to retrieve
 *     responses:
 *       200:
 *         description: Reservation details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 date:
 *                   type: string
 *                 customer:
 *                   type: string
 *                 service:
 *                   type: string
 *       404:
 *         description: Reservation not found
 *       400:
 *         description: Bad Request
 */
router.get('/:id', reservationController.getReservationById);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update an existing reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reservation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: '2024-09-30T18:00:00Z'
 *               customer:
 *                 type: string
 *                 example: 'Jane Doe'
 *               service:
 *                 type: string
 *                 example: 'Lunch Reservation'
 *     responses:
 *       200:
 *         description: Reservation updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 date:
 *                   type: string
 *                 customer:
 *                   type: string
 *                 service:
 *                   type: string
 *       400:
 *         description: Bad Request
 */
router.put('/:id', reservationController.updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reservation to delete
 *     responses:
 *       200:
 *         description: Reservation deleted
 *       400:
 *         description: Bad Request
 */
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
