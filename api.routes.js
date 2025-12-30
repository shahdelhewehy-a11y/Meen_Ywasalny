const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

// Authentication routes
router.post('/auth/passenger/login', apiController.passengerLogin);
router.post('/auth/captain/login', apiController.captainLogin);
router.post('/auth/passenger/register', apiController.passengerRegister);
router.post('/auth/captain/register', apiController.captainRegister);

// Captain routes
router.get('/captains/active', apiController.getActiveCaptains);
router.get('/captains/nearest', apiController.getNearestCaptains);
router.get('/captains/stats/rides', apiController.getCaptainRideCount);
router.get('/captains/stats/ratings', apiController.getCaptainAverageRating);
router.get('/captains/stats/earnings', apiController.getCaptainEarnings);
router.get('/captains/:captainId/rides', apiController.getCaptainRides);
router.get('/captains/top/rides', apiController.getTopCaptainByRides);
router.get('/captains/top/rating', apiController.getTopCaptainByRating);
router.get('/captains/least-rides', apiController.getCaptainsWithLeastRides);
router.get('/captains/inactive-check', apiController.checkInactiveCaptains);
router.get('/captains/total-duration', apiController.getCaptainTotalDuration);

// Passenger routes
router.get('/passengers/stats/rides', apiController.getPassengerRideCount);
router.get('/passengers/:passengerId/rides', apiController.getPassengerRides);
router.get('/passengers/:passengerId/last-location', apiController.getPassengerLastLocation);
router.post('/passengers/try-call', apiController.tryCallPassenger);

// Ride routes
router.post('/rides', apiController.createRide);
router.get('/rides/completed', apiController.getCompletedRides);
router.get('/rides/:rideId', apiController.getRideById);
router.put('/rides/:rideId/status', apiController.updateRideStatus);
router.put('/rides/:rideId/rating', apiController.addRating);
router.get('/rides/durations/all', apiController.getAllRideDurations);

// Invoice routes
router.get('/invoices', apiController.getAllInvoices);

module.exports = router;