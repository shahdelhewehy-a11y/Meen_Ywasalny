const apiService = require('../services/api.service');

class ApiController {
    async getActiveCaptains(req, res) {
        try {
            const captains = await apiService.getActiveCaptains();
            res.json({ success: true, data: captains });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getNearestCaptains(req, res) {
        try {
            const { lat, long } = req.query;
            const captains = await apiService.getNearestCaptains(parseFloat(lat), parseFloat(long));
            res.json({ success: true, data: captains });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async createRide(req, res) {
        try {
            const nextId = await apiService.getNextRideId();
            const rideData = { ...req.body, rideId: nextId };
            const ride = await apiService.createRide(rideData);
            res.json({ success: true, data: ride });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async updateRideStatus(req, res) {
        try {
            const { rideId } = req.params;
            const { status, cost, payMethod } = req.body;
            const ride = await apiService.updateRideStatus(parseInt(rideId), status, { cost, payMethod });
            res.json({ success: true, data: ride });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async addRating(req, res) {
        try {
            const { rideId } = req.params;
            const { rating, payId } = req.body;
            const result = await apiService.addRating(parseInt(rideId), parseFloat(rating), parseInt(payId));
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getCompletedRides(req, res) {
        try {
            const rides = await apiService.getCompletedRides();
            res.json({ success: true, data: rides });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getPassengerRideCount(req, res) {
        try {
            const stats = await apiService.getPassengerRideCount();
            res.json({ success: true, data: stats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getCaptainRideCount(req, res) {
        try {
            const stats = await apiService.getCaptainRideCount();
            res.json({ success: true, data: stats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getCaptainAverageRating(req, res) {
        try {
            const stats = await apiService.getCaptainAverageRating();
            res.json({ success: true, data: stats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getCaptainEarnings(req, res) {
        try {
            const earnings = await apiService.getCaptainEarnings();
            res.json({ success: true, data: earnings });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getAllInvoices(req, res) {
        try {
            const invoices = await apiService.getAllInvoices();
            res.json({ success: true, data: invoices });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getRideById(req, res) {
        try {
            const { rideId } = req.params;
            const ride = await apiService.getRideById(parseInt(rideId));
            res.json({ success: true, data: ride });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async passengerLogin(req, res) {
        try {
            const { email, password } = req.body;
            const passenger = await apiService.passengerLogin(email, password);
            if (passenger) {
                res.json({ success: true, data: passenger });
            } else {
                res.status(401).json({ success: false, error: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async captainLogin(req, res) {
        try {
            const { email, password } = req.body;
            const captain = await apiService.captainLogin(email, password);
            if (captain) {
                res.json({ success: true, data: captain });
            } else {
                res.status(401).json({ success: false, error: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async passengerRegister(req, res) {
        try {
            const passenger = await apiService.passengerRegister(req.body);
            res.json({ success: true, data: passenger });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async captainRegister(req, res) {
        try {
            const captain = await apiService.captainRegister(req.body);
            res.json({ success: true, data: captain });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getPassengerLastLocation(req, res) {
        try {
            const { passengerId } = req.params;
            const location = await apiService.getPassengerLastLocation(parseInt(passengerId));
            res.json({ success: true, data: location });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getTopCaptainByRides(req, res) {
        try {
            const captain = await apiService.getTopCaptainByRides();
            res.json({ success: true, data: captain });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getTopCaptainByRating(req, res) {
        try {
            const captain = await apiService.getTopCaptainByRating();
            res.json({ success: true, data: captain });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getCaptainsWithLeastRides(req, res) {
        try {
            const captains = await apiService.getCaptainsWithLeastRides();
            res.json({ success: true, data: captains });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async tryCallPassenger(req, res) {
        try {
            const { passengerId, attemptedPhone, attemptStatus } = req.body;
            const result = await apiService.tryCallPassenger(passengerId, attemptedPhone, attemptStatus);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async checkInactiveCaptains(req, res) {
        try {
            const captains = await apiService.checkInactiveCaptains();
            res.json({ success: true, data: captains });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getAllRideDurations(req, res) {
        try {
            const durations = await apiService.getAllRideDurations();
            res.json({ success: true, data: durations });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getCaptainTotalDuration(req, res) {
        try {
            const durations = await apiService.getCaptainTotalDuration();
            res.json({ success: true, data: durations });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getPassengerRides(req, res) {
        try {
            const { passengerId } = req.params;
            const rides = await apiService.getPassengerRides(parseInt(passengerId));
            res.json({ success: true, data: rides });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getCaptainRides(req, res) {
        try {
            const { captainId } = req.params;
            const rides = await apiService.getCaptainRides(parseInt(captainId));
            res.json({ success: true, data: rides });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new ApiController();