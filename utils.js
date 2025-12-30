// Utility Functions

const Utils = {
    // Format date
    formatDate: (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Format currency
    formatCurrency: (amount) => {
        if (!amount) return '0 EGP';
        return `${parseFloat(amount).toFixed(2)} EGP`;
    },

    // Get status badge HTML
    getStatusBadge: (status) => {
        const statusClass = status.toLowerCase().replace(' ', '-');
        return `<span class="status-badge status-${statusClass}">${status}</span>`;
    },

    // Calculate distance
    calculateDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        return distance.toFixed(2);
    },

    // Show notification
    showNotification: (message, type = 'info') => {
        alert(message); // Simple alert for now
        // You can replace this with a better notification library like toastr
    },

    // Format rating stars
    formatRating: (rating) => {
        if (!rating) return '☆☆☆☆☆';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '⭐'.repeat(fullStars);
        if (halfStar) stars += '½⭐';
        const emptyStars = 5 - Math.ceil(rating);
        stars += '☆'.repeat(emptyStars);
        return `${stars} (${rating.toFixed(1)})`;
    },

    // Generate random ride ID (temporary)
    generateRideId: () => {
        return Math.floor(Math.random() * 10000) + 1000;
    },

    // Switch screens
    switchScreen: (screenId) => {
        $('.screen').removeClass('active');
        $(`#${screenId}`).addClass('active');
    },

    // Validate coordinates
    validateCoordinates: (lat, long) => {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(long);
        
        if (isNaN(latitude) || isNaN(longitude)) {
            return { valid: false, message: 'Invalid coordinates format' };
        }
        
        if (latitude < -90 || latitude > 90) {
            return { valid: false, message: 'Latitude must be between -90 and 90' };
        }
        
        if (longitude < -180 || longitude > 180) {
            return { valid: false, message: 'Longitude must be between -180 and 180' };
        }
        
        return { valid: true };
    },

    // Storage helpers
    saveUser: (user, role) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('role', role);
    },

    getUser: () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getRole: () => {
        return sessionStorage.getItem('role');
    },

    logout: () => {
        sessionStorage.clear();
    },

    // Create captain card HTML
    createCaptainCard: (captain) => {
        return `
            <div class="captain-card">
                <div class="captain-info">
                    <h4>${captain.F_name} ${captain.L_name}</h4>
                    <p>🚗 ${captain.v_type} - ${captain.v_color} ${captain.v_model}</p>
                    <p>📍 Distance: ${captain.Distance ? parseFloat(captain.Distance).toFixed(2) : 'N/A'} km</p>
                </div>
                <button class="btn btn-success btn-sm request-captain" data-captain-id="${captain.CaptainID}">
                    Request Ride
                </button>
            </div>
        `;
    },

    // Create ride card HTML
    createRideCard: (ride, userRole) => {
        const otherParty = userRole === 'passenger' 
            ? `Captain: ${ride.CaptainName || 'N/A'}`
            : `Passenger: ${ride.PassengerName || 'N/A'}`;
        
        return `
            <div class="ride-card">
                <div class="ride-header">
                    <span class="ride-id">Ride #${ride.R_ID}</span>
                    ${Utils.getStatusBadge(ride.R_status)}
                </div>
                <div class="ride-details">
                    <div><strong>${otherParty}</strong></div>
                    <div>Cost: ${Utils.formatCurrency(ride.Cost)}</div>
                    <div>Pickup: ${Utils.formatDate(ride.Pickup_time)}</div>
                    <div>Dropoff: ${Utils.formatDate(ride.Dropoff_time)}</div>
                    ${ride.v_type ? `<div>Vehicle: ${ride.v_type} - ${ride.v_color}</div>` : ''}
                    ${ride.Rating ? `<div>Rating: ${Utils.formatRating(ride.Rating)}</div>` : ''}
                </div>
                ${ride.R_status === 'Completed' && !ride.Rating && userRole === 'passenger' ? `
                    <div class="ride-actions">
                        <button class="btn btn-primary btn-sm rate-ride" data-ride-id="${ride.R_ID}">
                            Rate Ride
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }
};