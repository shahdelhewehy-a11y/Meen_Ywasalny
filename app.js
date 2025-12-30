// Application State
let currentUser = null;
let currentRole = null;
let selectedRating = 0;
let currentRideForRating = null;

// Initialize App
$(document).ready(function() {
    // Check if user is already logged in
    currentUser = Utils.getUser();
    currentRole = Utils.getRole();
    
    if (currentUser && currentRole) {
        showDashboard();
    }
    
    // Event Listeners
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Role selection
    $('.role-btn').click(function() {
        $('.role-btn').removeClass('active');
        $(this).addClass('active');
        
        // Toggle registration fields based on role
        const role = $(this).data('role');
        if ($('#registerForm').is(':visible')) {
            if (role === 'passenger') {
                $('#passengerRegisterFields').show();
                $('#captainRegisterFields').hide();
            } else {
                $('#passengerRegisterFields').hide();
                $('#captainRegisterFields').show();
            }
        }
    });

    // Switch between login and register
    $('#showRegister').click(function(e) {
        e.preventDefault();
        $('#loginForm').hide();
        $('#registerForm').show();
        
        // Show correct registration fields
        const role = $('.role-btn.active').data('role');
        if (role === 'passenger') {
            $('#passengerRegisterFields').show();
            $('#captainRegisterFields').hide();
        } else {
            $('#passengerRegisterFields').hide();
            $('#captainRegisterFields').show();
        }
    });

    $('#showLogin').click(function(e) {
        e.preventDefault();
        $('#registerForm').hide();
        $('#loginForm').show();
    });

    // Login form
    $('#loginForm').submit(async function(e) {
        e.preventDefault();
        await handleLogin();
    });

    // Register form
    $('#registerForm').submit(async function(e) {
        e.preventDefault();
        await handleRegister();
    });

    // Logout
    $('#logoutBtn').click(function() {
        handleLogout();
    });

    // Find captains
    $('#findCaptainsBtn').click(async function() {
        await findNearestCaptains();
    });

    // Request captain
    $(document).on('click', '.request-captain', async function() {
        const captainId = $(this).data('captain-id');
        await requestRide(captainId);
    });

    // View statistics
    $('#viewStatsBtn').click(async function() {
        await loadStatistics();
    });

    // New query buttons
    $('#viewTopCaptainByRidesBtn').click(async function() {
        console.log('Top Captain by Rides button clicked');
        await loadTopCaptainByRides();
    });

    $('#viewTopCaptainByRatingBtn').click(async function() {
        console.log('Top Captain by Rating button clicked');
        await loadTopCaptainByRating();
    });

    $('#viewLeastRidesCaptainsBtn').click(async function() {
        console.log('Least Rides Captains button clicked');
        await loadCaptainsWithLeastRides();
    });

    $('#viewRideDurationsBtn').click(async function() {
        console.log('All Ride Durations button clicked');
        await loadAllRideDurations();
    });

    $('#viewCaptainDurationsBtn').click(async function() {
        console.log('Captain Total Durations button clicked');
        await loadCaptainTotalDurations();
    });

    // View invoices
    $('#viewInvoicesBtn').click(async function() {
        await loadInvoices();
    });

    $('#viewInactiveCaptainsBtn').click(async function() {
        await loadInactiveCaptains();
    });

    $('#tryCallPassengerBtn').click(async function() {
        await showTryCallPassengerDialog();
    });

    // Rate ride
    $(document).on('click', '.rate-ride', function() {
        currentRideForRating = $(this).data('ride-id');
        showRatingModal();
    });

    // Rating stars
    $('.star').click(function() {
        selectedRating = $(this).data('rating');
        $('.star').removeClass('active');
        $(this).prevAll().addBack().addClass('active');
    });

    // Submit rating
    $('#submitRatingBtn').click(async function() {
        await submitRating();
    });

    // Close modal
    $('.close').click(function() {
        hideRatingModal();
    });
}

// Handle Login
async function handleLogin() {
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
    const role = $('.role-btn.active').data('role');

    try {
        let response;
        if (role === 'passenger') {
            response = await API.passengerLogin(email, password);
        } else {
            response = await API.captainLogin(email, password);
        }

        if (response.success) {
            currentUser = response.data;
            currentRole = role;
            Utils.saveUser(currentUser, role);
            Utils.showNotification('Login successful!', 'success');
            showDashboard();
        } else {
            Utils.showNotification('Invalid credentials!', 'error');
        }
    } catch (error) {
        Utils.showNotification('Login failed! Make sure the backend is running.', 'error');
        console.error('Login error:', error);
    }
}

// Handle Register
async function handleRegister() {
    const role = $('.role-btn.active').data('role');

    try {
        let response;
        
        if (role === 'passenger') {
            const userData = {
                firstName: $('#regPassFirstName').val(),
                lastName: $('#regPassLastName').val(),
                email: $('#regPassEmail').val(),
                password: $('#regPassPassword').val(),
                phone: $('#regPassPhone').val()
            };
            response = await API.passengerRegister(userData);
        } else {
            const userData = {
                firstName: $('#regCapFirstName').val(),
                lastName: $('#regCapLastName').val(),
                email: $('#regCapEmail').val(),
                password: $('#regCapPassword').val(),
                phone: $('#regCapPhone').val(),
                licenseNo: $('#regCapLicense').val(),
                plateNumber: $('#regCapPlate').val(),
                vehicleType: $('#regCapVehicleType').val(),
                vehicleColor: $('#regCapColor').val(),
                vehicleModel: $('#regCapModel').val()
            };
            response = await API.captainRegister(userData);
        }

        if (response.success) {
            Utils.showNotification('Registration successful! Please login.', 'success');
            $('#registerForm').hide();
            $('#loginForm').show();
            $('#registerForm')[0].reset();
        } else {
            Utils.showNotification('Registration failed: ' + response.error, 'error');
        }
    } catch (error) {
        Utils.showNotification('Registration error!', 'error');
        console.error('Register error:', error);
    }
}

// Show Dashboard
function showDashboard() {
    $('#logoutBtn').show();
    
    if (currentRole === 'passenger') {
        Utils.switchScreen('passengerScreen');
        $('#passengerName').text(`${currentUser.F_name} ${currentUser.L_name}`);
        loadPassengerRides();
    } else {
        Utils.switchScreen('captainScreen');
        $('#captainName').text(`${currentUser.F_name} ${currentUser.L_name}`);
        $('#captainStatus').text(currentUser.Cap_Status).addClass(`status-${currentUser.Cap_Status.toLowerCase()}`);
        loadCaptainRides();
        loadCaptainStats();
    }
}

// Handle Logout
function handleLogout() {
    Utils.logout();
    currentUser = null;
    currentRole = null;
    $('#logoutBtn').hide();
    Utils.switchScreen('loginScreen');
    $('#loginForm')[0].reset();
    Utils.showNotification('Logged out successfully!', 'success');
}

// Find Nearest Captains
async function findNearestCaptains() {
    const pickupLat = $('#pickupLat').val();
    const pickupLong = $('#pickupLong').val();

    const validation = Utils.validateCoordinates(pickupLat, pickupLong);
    if (!validation.valid) {
        Utils.showNotification(validation.message, 'error');
        return;
    }

    try {
        const response = await API.getNearestCaptains(pickupLat, pickupLong);
        
        if (response.success && response.data.length > 0) {
            displayCaptains(response.data);
            $('#captainsList').show();
        } else {
            Utils.showNotification('No captains available nearby!', 'warning');
        }
    } catch (error) {
        Utils.showNotification('Failed to find captains!', 'error');
        console.error('Error:', error);
    }
}

// Display Captains
function displayCaptains(captains) {
    const container = $('#captainsContainer');
    container.empty();
    
    captains.forEach(captain => {
        container.append(Utils.createCaptainCard(captain));
    });
}

// Request Ride
async function requestRide(captainId) {
    const pickupLat = parseFloat($('#pickupLat').val());
    const pickupLong = parseFloat($('#pickupLong').val());
    const dropoffLat = parseFloat($('#dropoffLat').val());
    const dropoffLong = parseFloat($('#dropoffLong').val());

    const rideData = {
        captainId: captainId,
        passengerId: currentUser.ID,
        pickupLat: pickupLat,
        pickupLong: pickupLong,
        dropoffLat: dropoffLat,
        dropoffLong: dropoffLong
    };

    try {
        const response = await API.createRide(rideData);
        
        if (response.success) {
            Utils.showNotification(`Ride #${response.data.rideId} created successfully!`, 'success');
            $('#captainsList').hide();
            loadPassengerRides();
        } else {
            Utils.showNotification('Failed to create ride!', 'error');
        }
    } catch (error) {
        Utils.showNotification('Error creating ride!', 'error');
        console.error('Error:', error);
    }
}

// Load Passenger Rides
async function loadPassengerRides() {
    try {
        const response = await API.getPassengerRides(currentUser.ID);
        
        if (response.success) {
            displayRides(response.data, 'passengerRidesContainer', 'passenger');
        }
    } catch (error) {
        $('#passengerRidesContainer').html('<p class="error">Failed to load rides</p>');
        console.error('Error:', error);
    }
}

// Load Captain Rides
async function loadCaptainRides() {
    try {
        const response = await API.getCaptainRides(currentUser.ID);
        
        if (response.success) {
            displayRides(response.data, 'captainRidesContainer', 'captain');
        }
    } catch (error) {
        $('#captainRidesContainer').html('<p class="error">Failed to load rides</p>');
        console.error('Error:', error);
    }
}

// Display Rides
function displayRides(rides, containerId, role) {
    const container = $(`#${containerId}`);
    container.empty();
    
    if (rides.length === 0) {
        container.html('<p class="loading">No rides found</p>');
        return;
    }
    
    rides.forEach(ride => {
        container.append(Utils.createRideCard(ride, role));
    });
}

// Load Captain Statistics
async function loadCaptainStats() {
    try {
        const [ridesRes, ratingsRes, earningsRes] = await Promise.all([
            API.getCaptainRideCount(),
            API.getCaptainAverageRating(),
            API.getCaptainEarnings()
        ]);

        const myRides = ridesRes.data.find(c => c.ID === currentUser.ID);
        const myRating = ratingsRes.data.find(c => c.ID === currentUser.ID);
        const myEarnings = earningsRes.data.find(c => c.ID === currentUser.ID);

        const statsHTML = `
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value">${myRides ? myRides.no_of_rides : 0}</div>
                    <div class="stat-label">Total Rides</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${myRating ? parseFloat(myRating.avg_rating).toFixed(1) : 'N/A'}</div>
                    <div class="stat-label">Average Rating</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${myEarnings ? Utils.formatCurrency(myEarnings.TotalEarned) : '0 EGP'}</div>
                    <div class="stat-label">Total Earnings</div>
                </div>
            </div>
        `;

        $('#captainStatsContainer').html(statsHTML);
    } catch (error) {
        $('#captainStatsContainer').html('<p class="error">Failed to load statistics</p>');
        console.error('Error:', error);
    }
}

// Load Statistics (for passengers)
async function loadStatistics() {
    try {
        const [passengersRes, captainsRes, ratingsRes] = await Promise.all([
            API.getPassengerRideCount(),
            API.getCaptainRideCount(),
            API.getCaptainAverageRating()
        ]);

        let statsHTML = '<h4>Platform Statistics</h4>';
        
        // Top Passengers
        statsHTML += '<h5>🏆 Top Passengers</h5><table><tr><th>Name</th><th>Email</th><th>Rides</th></tr>';
        passengersRes.data.slice(0, 5).forEach(p => {
            statsHTML += `<tr><td>${p.F_name} ${p.L_name}</td><td>${p.Email}</td><td>${p.no_of_rides}</td></tr>`;
        });
        statsHTML += '</table>';

        // Top Captains
        statsHTML += '<h5>🏆 Top Captains</h5><table><tr><th>Name</th><th>Email</th><th>Rides</th></tr>';
        captainsRes.data.slice(0, 5).forEach(c => {
            statsHTML += `<tr><td>${c.F_name} ${c.L_name}</td><td>${c.Email}</td><td>${c.no_of_rides}</td></tr>`;
        });
        statsHTML += '</table>';

        // Top Rated Captains
        statsHTML += '<h5>⭐ Top Rated Captains</h5><table><tr><th>Name</th><th>Rating</th></tr>';
        ratingsRes.data.slice(0, 5).forEach(c => {
            statsHTML += `<tr><td>${c.F_name} ${c.L_name}</td><td>${Utils.formatRating(c.avg_rating)}</td></tr>`;
        });
        statsHTML += '</table>';

        $('#statsContainer').html(statsHTML).show();
    } catch (error) {
        Utils.showNotification('Failed to load statistics!', 'error');
        console.error('Error:', error);
    }
}

// Load Invoices
async function loadInvoices() {
    try {
        const response = await API.getAllInvoices();
        
        if (response.success) {
            let invoicesHTML = '<table><tr><th>Ride ID</th><th>Passenger</th><th>Captain</th><th>Cost</th><th>Method</th><th>Status</th><th>Duration</th></tr>';
            
            response.data.forEach(invoice => {
                invoicesHTML += `
                    <tr>
                        <td>#${invoice.R_ID}</td>
                        <td>${invoice.PassengerName}</td>
                        <td>${invoice.CaptainName}</td>
                        <td>${Utils.formatCurrency(invoice.Cost)}</td>
                        <td>${invoice.pay_method || 'N/A'}</td>
                        <td>${invoice.pay_status}</td>
                        <td>${invoice.DurationMinutes || 'N/A'} min</td>
                    </tr>
                `;
            });
            
            invoicesHTML += '</table>';
            $('#invoicesContainer').html(invoicesHTML).show();
        }
    } catch (error) {
        Utils.showNotification('Failed to load invoices!', 'error');
        console.error('Error:', error);
    }
}

// Show Rating Modal
function showRatingModal() {
    selectedRating = 0;
    $('.star').removeClass('active');
    $('#ratingModal').addClass('active');
}

// Hide Rating Modal
function hideRatingModal() {
    $('#ratingModal').removeClass('active');
}

// Submit Rating
async function submitRating() {
    if (selectedRating === 0) {
        Utils.showNotification('Please select a rating!', 'warning');
        return;
    }

    try {
        const payId = Math.floor(Math.random() * 1000) + 100; // Generate random payment ID
        const response = await API.addRating(currentRideForRating, selectedRating, payId);
        
        if (response.success) {
            Utils.showNotification('Rating submitted successfully!', 'success');
            hideRatingModal();
            loadPassengerRides();
        }
    } catch (error) {
        Utils.showNotification('Failed to submit rating!', 'error');
        console.error('Error:', error);
    }
}

// New Query Functions

// Load Top Captain by Rides
async function loadTopCaptainByRides() {
    console.log('loadTopCaptainByRides called');
    try {
        console.log('Fetching top captain by rides...');
        const response = await API.getTopCaptainByRides();
        console.log('Full Response:', response);
        console.log('Response.data:', response.data);
        
        if (response.success && response.data) {
            const captain = response.data;
            console.log('Captain object:', captain);
            
            // Check which fields exist
            console.log('F_name:', captain.F_name);
            console.log('L_name:', captain.L_name);
            console.log('Email:', captain.Email);
            console.log('no_of_rides:', captain.no_of_rides);
            
            const html = `
                <h4>🏆 Top Captain by Total Rides</h4>
                <div class="stat-box" style="max-width: 400px; margin: 1rem 0;">
                    <h3>${captain.F_name || 'N/A'} ${captain.L_name || 'N/A'}</h3>
                    <p>Email: ${captain.Email || 'N/A'}</p>
                    <p class="stat-value">${captain.no_of_rides || 0}</p>
                    <p class="stat-label">Total Rides</p>
                </div>
            `;
            $('#statsContainer').html(html).show();
        } else {
            console.error('No data in response or success is false');
            console.log('Response object:', response);
            Utils.showNotification('No data found!', 'error');
        }
    } catch (error) {
        console.error('Error in loadTopCaptainByRides:', error);
        Utils.showNotification('Failed to load data: ' + error.message, 'error');
    }
}

// Load Top Captain by Rating
async function loadTopCaptainByRating() {
    try {
        const response = await API.getTopCaptainByRating();
        
        if (response.success && response.data) {
            const captain = response.data;
            const html = `
                <h4>⭐ Top Captain by Maximum Rating</h4>
                <div class="stat-box" style="max-width: 400px; margin: 1rem 0;">
                    <h3>${captain.F_name} ${captain.L_name}</h3>
                    <p class="stat-value">${captain.max_rating}</p>
                    <p class="stat-label">Maximum Rating</p>
                </div>
            `;
            $('#statsContainer').html(html).show();
        }
    } catch (error) {
        Utils.showNotification('Failed to load data!', 'error');
        console.error('Error:', error);
    }
}

// Load Captains with Least Rides
async function loadCaptainsWithLeastRides() {
    try {
        const response = await API.getCaptainsWithLeastRides();
        
        if (response.success) {
            let html = '<h4>📉 Captains with Least Rides (Top 3)</h4>';
            html += '<table><tr><th>Name</th><th>Total Rides</th></tr>';
            
            response.data.forEach(captain => {
                html += `<tr><td>${captain.F_name} ${captain.L_name}</td><td>${captain.totalrides}</td></tr>`;
            });
            
            html += '</table>';
            $('#statsContainer').html(html).show();
        }
    } catch (error) {
        Utils.showNotification('Failed to load data!', 'error');
        console.error('Error:', error);
    }
}

// Load All Ride Durations
async function loadAllRideDurations() {
    console.log('loadAllRideDurations called');
    try {
        console.log('Fetching all ride durations...');
        const response = await API.getAllRideDurations();
        console.log('Response:', response);
        
        if (response.success) {
            let html = '<h4>⏱️ All Ride Durations</h4>';
            html += '<div style="max-height: 400px; overflow-y: auto;">';
            html += '<table><tr><th>Ride ID</th><th>Status</th><th>Pickup Time</th><th>Dropoff Time</th><th>Duration (min)</th></tr>';
            
            response.data.forEach(ride => {
                html += `
                    <tr>
                        <td>#${ride.R_ID}</td>
                        <td>${ride.R_status}</td>
                        <td>${Utils.formatDate(ride.Pickup_time)}</td>
                        <td>${Utils.formatDate(ride.Dropoff_time)}</td>
                        <td>${ride.DurationMinutes || 'N/A'}</td>
                    </tr>
                `;
            });
            
            html += '</table></div>';
            $('#statsContainer').html(html).show();
        } else {
            console.error('No success in response');
            Utils.showNotification('No data found!', 'error');
        }
    } catch (error) {
        console.error('Error in loadAllRideDurations:', error);
        Utils.showNotification('Failed to load data!', 'error');
    }
}

// Load Captain Total Durations
async function loadCaptainTotalDurations() {
    console.log('loadCaptainTotalDurations called');
    try {
        console.log('Fetching captain total durations...');
        const response = await API.getCaptainTotalDuration();
        console.log('Response:', response);
        
        if (response.success) {
            let html = '<h4>⏱️ Captain Total Working Time</h4>';
            html += '<table><tr><th>Captain ID</th><th>Name</th><th>Total Duration (minutes)</th><th>Total Duration (hours)</th></tr>';
            
            response.data.forEach(captain => {
                const hours = (captain.TotalDurationMinutes / 60).toFixed(2);
                html += `
                    <tr>
                        <td>#${captain.ID}</td>
                        <td>${captain.F_name} ${captain.L_name}</td>
                        <td>${captain.TotalDurationMinutes}</td>
                        <td>${hours}</td>
                    </tr>
                `;
            });
            
            html += '</table>';
            $('#statsContainer').html(html).show();
        } else {
            console.error('No success in response');
            Utils.showNotification('No data found!', 'error');
        }
    } catch (error) {
        console.error('Error in loadCaptainTotalDurations:', error);
        Utils.showNotification('Failed to load data!', 'error');
    }
}

// Load Inactive Captains
async function loadInactiveCaptains() {
    try {
        const response = await API.checkInactiveCaptains();
        
        if (response.success) {
            let html = '<h4>🚫 Captain Status Check</h4>';
            html += '<div style="max-height: 400px; overflow-y: auto;">';
            html += '<table><tr><th>ID</th><th>Name</th><th>Status</th><th>Action</th></tr>';
            
            response.data.forEach(captain => {
                const statusClass = captain.Cap_Status === 'Active' ? 'status-active' : 'status-inactive';
                html += `
                    <tr>
                        <td>#${captain.ID}</td>
                        <td>${captain.F_name} ${captain.L_name}</td>
                        <td><span class="status-badge ${statusClass}">${captain.Cap_Status}</span></td>
                        <td>${captain.ActionNeeded}</td>
                    </tr>
                `;
            });
            
            html += '</table></div>';
            $('#invoicesContainer').html(html).show();
        }
    } catch (error) {
        Utils.showNotification('Failed to load data!', 'error');
        console.error('Error:', error);
    }
}

// Show Try Call Passenger Dialog
async function showTryCallPassengerDialog() {
    const passengerId = prompt('Enter Passenger ID:');
    if (!passengerId) return;
    
    const attemptedPhone = prompt('Enter Phone Number Attempted:');
    if (!attemptedPhone) return;
    
    const attemptStatus = prompt('Enter Status (Success/Failed):');
    if (!attemptStatus) return;
    
    try {
        const response = await API.tryCallPassenger(parseInt(passengerId), attemptedPhone, attemptStatus);
        
        if (response.success) {
            let html = '<h4>📞 Try Call Passenger Result</h4>';
            
            if (response.data.length > 0) {
                const result = response.data[0];
                if (result.Result === 'CallSuccess') {
                    html += `<p><strong>✅ Call Successful!</strong></p>`;
                    html += `<p>Phone Used: ${result.PhoneUsed}</p>`;
                } else if (result.AlternatePhone) {
                    html += `<p><strong>❌ Call Failed. Try alternate number:</strong></p>`;
                    html += `<p>Alternate Phone: ${result.AlternatePhone}</p>`;
                }
            } else {
                html += `<p>No result returned</p>`;
            }
            
            $('#invoicesContainer').html(html).show();
        }
    } catch (error) {
        Utils.showNotification('Failed to execute procedure!', 'error');
        console.error('Error:', error);
    }
}