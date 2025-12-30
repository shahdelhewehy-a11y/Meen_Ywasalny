// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// API Service
const API = {
    // Authentication
    passengerLogin: async (email, password) => {
        return await fetch(`${API_BASE_URL}/auth/passenger/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then(res => res.json());
    },

    captainLogin: async (email, password) => {
        return await fetch(`${API_BASE_URL}/auth/captain/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then(res => res.json());
    },

    passengerRegister: async (userData) => {
        return await fetch(`${API_BASE_URL}/auth/passenger/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }).then(res => res.json());
    },

    captainRegister: async (userData) => {
        return await fetch(`${API_BASE_URL}/auth/captain/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }).then(res => res.json());
    },

    // Captains
    getActiveCaptains: async () => {
        return await fetch(`${API_BASE_URL}/captains/active`)
            .then(res => res.json());
    },

    getNearestCaptains: async (lat, long) => {
        return await fetch(`${API_BASE_URL}/captains/nearest?lat=${lat}&long=${long}`)
            .then(res => res.json());
    },

    getCaptainRideCount: async () => {
        return await fetch(`${API_BASE_URL}/captains/stats/rides`)
            .then(res => res.json());
    },

    getCaptainAverageRating: async () => {
        return await fetch(`${API_BASE_URL}/captains/stats/ratings`)
            .then(res => res.json());
    },

    getCaptainEarnings: async () => {
        return await fetch(`${API_BASE_URL}/captains/stats/earnings`)
            .then(res => res.json());
    },

    getCaptainRides: async (captainId) => {
        return await fetch(`${API_BASE_URL}/captains/${captainId}/rides`)
            .then(res => res.json());
    },

    getTopCaptainByRides: async () => {
        return await fetch(`${API_BASE_URL}/captains/top/rides`)
            .then(res => res.json());
    },

    getTopCaptainByRating: async () => {
        return await fetch(`${API_BASE_URL}/captains/top/rating`)
            .then(res => res.json());
    },

    getCaptainsWithLeastRides: async () => {
        return await fetch(`${API_BASE_URL}/captains/least-rides`)
            .then(res => res.json());
    },

    checkInactiveCaptains: async () => {
        return await fetch(`${API_BASE_URL}/captains/inactive-check`)
            .then(res => res.json());
    },

    getCaptainTotalDuration: async () => {
        return await fetch(`${API_BASE_URL}/captains/total-duration`)
            .then(res => res.json());
    },

    // Passengers
    getPassengerRideCount: async () => {
        return await fetch(`${API_BASE_URL}/passengers/stats/rides`)
            .then(res => res.json());
    },

    getPassengerRides: async (passengerId) => {
        return await fetch(`${API_BASE_URL}/passengers/${passengerId}/rides`)
            .then(res => res.json());
    },

    getPassengerLastLocation: async (passengerId) => {
        return await fetch(`${API_BASE_URL}/passengers/${passengerId}/last-location`)
            .then(res => res.json());
    },

    tryCallPassenger: async (passengerId, attemptedPhone, attemptStatus) => {
        return await fetch(`${API_BASE_URL}/passengers/try-call`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passengerId, attemptedPhone, attemptStatus })
        }).then(res => res.json());
    },

    // Rides
    createRide: async (rideData) => {
        return await fetch(`${API_BASE_URL}/rides`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rideData)
        }).then(res => res.json());
    },

    getCompletedRides: async () => {
        return await fetch(`${API_BASE_URL}/rides/completed`)
            .then(res => res.json());
    },

    getRideById: async (rideId) => {
        return await fetch(`${API_BASE_URL}/rides/${rideId}`)
            .then(res => res.json());
    },

    updateRideStatus: async (rideId, status, additionalData = {}) => {
        return await fetch(`${API_BASE_URL}/rides/${rideId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, ...additionalData })
        }).then(res => res.json());
    },

    addRating: async (rideId, rating, payId) => {
        return await fetch(`${API_BASE_URL}/rides/${rideId}/rating`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, payId })
        }).then(res => res.json());
    },

    getAllRideDurations: async () => {
        return await fetch(`${API_BASE_URL}/rides/durations/all`)
            .then(res => res.json());
    },

    // Invoices
    getAllInvoices: async () => {
        return await fetch(`${API_BASE_URL}/invoices`)
            .then(res => res.json());
    }
};