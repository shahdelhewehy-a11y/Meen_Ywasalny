const { getConnection, sql } = require('../config/database');

class ApiService {
    // Get all active captains
    async getActiveCaptains() {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT * FROM Captain WHERE Cap_Status = \'Active\'');
        return result.recordset;
    }

    // Get nearest captains to passenger location
    async getNearestCaptains(passengerLat, passengerLong) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('pass_lat', sql.Decimal(9, 6), passengerLat)
            .input('pass_long', sql.Decimal(9, 6), passengerLong)
            .query(`
                WITH CaptainLastLocation AS (
                    SELECT 
                        C.ID AS CaptainID,
                        C.F_name,
                        C.L_name,
                        C.v_type,
                        C.v_color,
                        C.v_model,
                        R.DropoffLatitude AS Cap_Lat,
                        R.DropoffLongitude AS Cap_Long,
                        ROW_NUMBER() OVER (PARTITION BY C.ID ORDER BY R.Dropoff_time DESC) AS rn
                    FROM Captain C
                    JOIN Ride R ON C.ID = R.C_ID
                    WHERE C.Cap_Status = 'Active'
                )
                SELECT TOP 5
                    CaptainID,
                    F_name,
                    L_name,
                    v_type,
                    v_color,
                    v_model,
                    Cap_Lat,
                    Cap_Long,
                    SQRT(
                        POWER(Cap_Lat - @pass_lat, 2) +
                        POWER(Cap_Long - @pass_long, 2)
                    ) AS Distance
                FROM CaptainLastLocation
                WHERE rn = 1
                ORDER BY Distance ASC
            `);
        return result.recordset;
    }

    // Create a new ride
    async createRide(rideData) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('R_ID', sql.Int, rideData.rideId)
            .input('C_ID', sql.Int, rideData.captainId)
            .input('Passenger_ID', sql.Int, rideData.passengerId)
            .input('PickupLatitude', sql.Decimal(9, 6), rideData.pickupLat)
            .input('PickupLongitude', sql.Decimal(9, 6), rideData.pickupLong)
            .input('DropoffLatitude', sql.Decimal(9, 6), rideData.dropoffLat)
            .input('DropoffLongitude', sql.Decimal(9, 6), rideData.dropoffLong)
            .query(`
                INSERT INTO Ride (
                    R_ID, R_status, C_ID, Passenger_ID,
                    PickupLatitude, PickupLongitude,
                    DropoffLatitude, DropoffLongitude,
                    Pickup_time
                ) VALUES (
                    @R_ID, 'Holding', @C_ID, @Passenger_ID,
                    @PickupLatitude, @PickupLongitude,
                    @DropoffLatitude, @DropoffLongitude,
                    GETDATE()
                )
            `);
        return { rideId: rideData.rideId, status: 'Holding' };
    }

    // Update ride status
    async updateRideStatus(rideId, status, additionalData = {}) {
        const pool = await getConnection();
        let query = `UPDATE Ride SET R_status = @status`;
        
        const request = pool.request()
            .input('R_ID', sql.Int, rideId)
            .input('status', sql.NVarChar(15), status);

        if (status === 'Completed') {
            query += `, Dropoff_time = GETDATE()`;
            if (additionalData.cost) {
                query += `, Cost = @cost`;
                request.input('cost', sql.Float, additionalData.cost);
            }
            if (additionalData.payMethod) {
                query += `, pay_method = @payMethod, pay_status = 'Paid', pay_time = GETDATE()`;
                request.input('payMethod', sql.NVarChar(15), additionalData.payMethod);
            }
        }

        query += ` WHERE R_ID = @R_ID`;
        await request.query(query);
        return { rideId, status };
    }

    // Add rating to ride
    async addRating(rideId, rating, payId) {
        const pool = await getConnection();
        await pool.request()
            .input('R_ID', sql.Int, rideId)
            .input('Rating', sql.Decimal(2, 1), rating)
            .input('pay_ID', sql.Int, payId)
            .query(`
                UPDATE Ride
                SET Rating = @Rating, pay_ID = @pay_ID, pay_time = GETDATE()
                WHERE R_ID = @R_ID
            `);
        return { rideId, rating };
    }

    // Get all completed rides
    async getCompletedRides() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT R_ID, R_status, Rating, Cost, Pickup_time, Dropoff_time
                FROM Ride 
                WHERE R_status = 'Completed'
                ORDER BY Dropoff_time DESC
            `);
        return result.recordset;
    }

    // Get passenger ride count
    async getPassengerRideCount() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT P.ID, P.F_name, P.L_name, P.Email, COUNT(R_ID) as no_of_rides
                FROM Passenger P 
                JOIN Ride R ON P.ID = R.Passenger_ID
                GROUP BY P.ID, P.F_name, P.L_name, P.Email
                ORDER BY no_of_rides DESC
            `);
        return result.recordset;
    }

    // Get captain ride count
    async getCaptainRideCount() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT C.ID, C.F_name, C.L_name, C.Email, COUNT(R_ID) as no_of_rides
                FROM Captain C 
                JOIN Ride R ON C.ID = R.C_ID
                GROUP BY C.ID, C.F_name, C.L_name, C.Email
                ORDER BY no_of_rides DESC
            `);
        return result.recordset;
    }

    // Get captain average rating
    async getCaptainAverageRating() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT C.ID, C.F_name, C.L_name, AVG(R.Rating) as avg_rating
                FROM Captain C 
                JOIN Ride R ON C.ID = R.C_ID
                WHERE R.Rating IS NOT NULL
                GROUP BY C.ID, C.F_name, C.L_name
                ORDER BY avg_rating DESC
            `);
        return result.recordset;
    }

    // Get captain earnings
    async getCaptainEarnings() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT C.ID, C.F_name, C.L_name, SUM(R.Cost) AS TotalEarned
                FROM Captain C
                JOIN Ride R ON C.ID = R.C_ID
                WHERE R.pay_status = 'Paid'
                GROUP BY C.ID, C.F_name, C.L_name
                ORDER BY TotalEarned DESC
            `);
        return result.recordset;
    }

    // Get all invoices
    async getAllInvoices() {
        const pool = await getConnection();
        const result = await pool.request()
            .execute('GenerateAllInvoices');
        return result.recordset;
    }

    // Get ride by ID
    async getRideById(rideId) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('R_ID', sql.Int, rideId)
            .query('SELECT * FROM Ride WHERE R_ID = @R_ID');
        return result.recordset[0];
    }

    // Get next ride ID
    async getNextRideId() {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT MAX(R_ID) as maxId FROM Ride');
        return (result.recordset[0].maxId || 0) + 1;
    }

    // Passenger login
    async passengerLogin(email, password) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Email', sql.VarChar(254), email)
            .input('Pass', sql.VarChar(30), password)
            .query('SELECT ID, F_name, L_name, Email FROM Passenger WHERE Email = @Email AND Pass = @Pass');
        return result.recordset[0];
    }

    // Captain login
    async captainLogin(email, password) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Email', sql.VarChar(254), email)
            .input('Pass', sql.VarChar(30), password)
            .query('SELECT ID, F_name, L_name, Email, Cap_Status FROM Captain WHERE Email = @Email AND Pass = @Pass');
        return result.recordset[0];
    }

    // Passenger registration
    async passengerRegister(userData) {
        const pool = await getConnection();
        
        // Get next passenger ID
        const maxIdResult = await pool.request()
            .query('SELECT MAX(ID) as maxId FROM Passenger');
        const nextId = (maxIdResult.recordset[0].maxId || 0) + 1;

        // Insert passenger
        await pool.request()
            .input('ID', sql.Int, nextId)
            .input('F_name', sql.NVarChar(10), userData.firstName)
            .input('L_name', sql.NVarChar(10), userData.lastName)
            .input('Email', sql.VarChar(254), userData.email)
            .input('Pass', sql.VarChar(30), userData.password)
            .query(`
                INSERT INTO Passenger (ID, F_name, L_name, Email, Pass)
                VALUES (@ID, @F_name, @L_name, @Email, @Pass)
            `);

        // Insert phone if provided
        if (userData.phone) {
            await pool.request()
                .input('ID', sql.Int, nextId)
                .input('phone_num', sql.NVarChar(20), userData.phone)
                .query(`
                    INSERT INTO passenger_phone (ID, phone_num)
                    VALUES (@ID, @phone_num)
                `);
        }

        return { ID: nextId, F_name: userData.firstName, L_name: userData.lastName, Email: userData.email };
    }

    // Captain registration
    async captainRegister(userData) {
        const pool = await getConnection();
        
        // Get next captain ID
        const maxIdResult = await pool.request()
            .query('SELECT MAX(ID) as maxId FROM Captain');
        const nextId = (maxIdResult.recordset[0].maxId || 0) + 1;

        // Get next vehicle ID
        const maxVidResult = await pool.request()
            .query('SELECT MAX(v_ID) as maxVid FROM Captain');
        const nextVid = (maxVidResult.recordset[0].maxVid || 0) + 1;

        // Insert captain
        await pool.request()
            .input('ID', sql.Int, nextId)
            .input('F_name', sql.NVarChar(15), userData.firstName)
            .input('L_name', sql.NVarChar(15), userData.lastName)
            .input('Email', sql.VarChar(254), userData.email)
            .input('Pass', sql.VarChar(30), userData.password)
            .input('License_no', sql.VarChar(20), userData.licenseNo)
            .input('v_ID', sql.Int, nextVid)
            .input('Plate_number', sql.NVarChar(15), userData.plateNumber)
            .input('v_type', sql.VarChar(20), userData.vehicleType)
            .input('v_color', sql.VarChar(20), userData.vehicleColor)
            .input('v_model', sql.VarChar(30), userData.vehicleModel)
            .input('Cap_Status', sql.NVarChar(20), 'Active')
            .query(`
                INSERT INTO Captain (ID, F_name, L_name, Email, Pass, License_no, v_ID, 
                    Plate_number, v_type, v_color, v_model, Cap_Status)
                VALUES (@ID, @F_name, @L_name, @Email, @Pass, @License_no, @v_ID,
                    @Plate_number, @v_type, @v_color, @v_model, @Cap_Status)
            `);

        // Insert phone if provided
        if (userData.phone) {
            await pool.request()
                .input('ID', sql.Int, nextId)
                .input('phone_num', sql.NVarChar(20), userData.phone)
                .query(`
                    INSERT INTO cap_phone (ID, phone_num)
                    VALUES (@ID, @phone_num)
                `);
        }

        return { ID: nextId, F_name: userData.firstName, L_name: userData.lastName, Email: userData.email, Cap_Status: 'Active' };
    }

    // Get passenger last location
    async getPassengerLastLocation(passengerId) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Passenger_ID', sql.Int, passengerId)
            .query(`
                SELECT TOP 1
                    PickupLatitude AS Passenger_Lat,
                    PickupLongitude AS Passenger_Long
                FROM Ride
                WHERE Passenger_ID = @Passenger_ID
                ORDER BY Pickup_time DESC
            `);
        return result.recordset[0];
    }

    // Get top captain by rides
    async getTopCaptainByRides() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT TOP(1) C.ID, C.F_name, C.L_name, C.Email, COUNT(R_ID) as no_of_rides
                FROM Captain C 
                JOIN Ride R ON C.ID = R.C_ID
                GROUP BY C.ID, C.F_name, C.L_name, C.Email
                ORDER BY COUNT(R_ID) DESC
            `);
        return result.recordset[0];
    }

    // Get top captain by rating
    async getTopCaptainByRating() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT TOP(1) C.ID, C.F_name, C.L_name, MAX(R.Rating) as max_rating
                FROM Captain C 
                JOIN Ride R ON C.ID = R.C_ID
                GROUP BY C.ID, C.F_name, C.L_name
                ORDER BY MAX(R.Rating) DESC
            `);
        return result.recordset[0];
    }

    // Get captains with least rides
    async getCaptainsWithLeastRides() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT TOP(3) WITH TIES C.F_name, C.L_name, COUNT(R.R_ID) AS totalrides
                FROM Captain C 
                JOIN Ride R ON C.ID = R.C_ID
                GROUP BY C.F_name, C.L_name 
                ORDER BY totalrides ASC
            `);
        return result.recordset;
    }

    // Execute TryCallPassenger procedure
    async tryCallPassenger(passengerId, attemptedPhone, attemptStatus) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('PassengerID', sql.Int, passengerId)
            .input('AttemptedPhone', sql.VarChar(20), attemptedPhone)
            .input('AttemptStatus', sql.VarChar(20), attemptStatus)
            .execute('TryCallPassenger');
        return result.recordset;
    }

    // Execute CheckInactiveCaptains procedure
    async checkInactiveCaptains() {
        const pool = await getConnection();
        const result = await pool.request()
            .execute('CheckInactiveCaptains');
        return result.recordset;
    }

    // Get ride durations for all rides
    async getAllRideDurations() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT R_ID, R_status, Pickup_time, Dropoff_time,
                       DATEDIFF(MINUTE, Pickup_time, Dropoff_time) AS DurationMinutes
                FROM Ride
                WHERE Dropoff_time IS NOT NULL AND Pickup_time IS NOT NULL
                ORDER BY Pickup_time DESC
            `);
        return result.recordset;
    }

    // Get captain total duration
    async getCaptainTotalDuration() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT C.ID, C.F_name, C.L_name, 
                       SUM(dbo.GetRideDurationMinutes(R.R_ID)) AS TotalDurationMinutes
                FROM Ride R 
                JOIN Captain C ON R.C_ID = C.ID
                WHERE R.Dropoff_time IS NOT NULL
                GROUP BY C.ID, C.F_name, C.L_name
                ORDER BY TotalDurationMinutes DESC
            `);
        return result.recordset;
    }

    // Get passenger rides
    async getPassengerRides(passengerId) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Passenger_ID', sql.Int, passengerId)
            .query(`
                SELECT R.*, C.F_name + ' ' + C.L_name as CaptainName, C.v_type, C.v_color, C.v_model
                FROM Ride R
                JOIN Captain C ON R.C_ID = C.ID
                WHERE R.Passenger_ID = @Passenger_ID
                ORDER BY R.Pickup_time DESC
            `);
        return result.recordset;
    }

    // Get captain rides
    async getCaptainRides(captainId) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('C_ID', sql.Int, captainId)
            .query(`
                SELECT R.*, P.F_name + ' ' + P.L_name as PassengerName
                FROM Ride R
                JOIN Passenger P ON R.Passenger_ID = P.ID
                WHERE R.C_ID = @C_ID
                ORDER BY R.Pickup_time DESC
            `);
        return result.recordset;
    }
}

module.exports = new ApiService();