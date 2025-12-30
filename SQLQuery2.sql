create database Meen_Ywasalny
go

use Meen_Ywasalny ;
go  

create table Captain (
ID int primary key ,
F_name nvarchar(15) ,
L_name nvarchar(15) , 
Email varchar (254) unique ,
Pass varchar(30) ,
License_no varchar(20) ,
v_ID int ,
Plate_number nvarchar(15) ,
v_type varchar(20) ,
v_color varchar(20),
v_model varchar(30),
Cap_Status nvarchar(20)
);

create table cap_phone (
ID int ,
phone_num nvarchar(20) ,
primary key (ID,phone_num),
foreign key (ID) references Captain(ID) 
);

create table Passenger (
ID int primary key ,
F_name nvarchar(10) ,
L_name nvarchar(10) ,
Email varchar (254) unique ,
Pass varchar(30)
);

create table Ride (
R_ID int primary key ,
R_status nvarchar(15) ,
Rating decimal(2,1) , 
Cost Float ,
C_ID int not null,
DropoffLatitude decimal(9,6), 
PickupLatitude decimal(9,6) , 
DropoffLongitude decimal(9,6) , 
PickupLongitude decimal(9,6) , 
Dropoff_time datetime , 
Pickup_time datetime , 
Passenger_ID int ,
pay_ID int  unique ,
pay_status nvarchar(15) ,
pay_time datetime ,
pay_method nvarchar(15) ,
foreign key (Passenger_ID) references Passenger(ID)
);

create table passenger_phone (
ID int ,
phone_num nvarchar(20) , 
primary key (ID,phone_num) , 
foreign key (ID) references Passenger(ID) 
);

INSERT INTO Captain (ID, F_name, L_name, Email, Pass, License_no, v_ID, Plate_number, v_type, v_color, v_model, Cap_Status)
VALUES
(1, 'Khaled', 'Reda', 'khaled.reda@mail.com', 'pass123', 'LIC1001', 101, 'ABC123', 'Sedan', 'Black', 'Hyundai Elantra', 'Active'),
(2, 'Ahmed', 'Samir', 'ahmed.samir@mail.com', 'pass123', 'LIC1002', 102, 'BCD234', 'Sedan', 'White', 'Kia Cerato', 'Active'),
(3, 'Mona', 'Fathy', 'mona.fathy@mail.com', 'pass123', 'LIC1003', 103, 'CDE345', 'SUV', 'Blue', 'Toyota Corolla', 'Busy'),
(4, 'Ibrahim', 'Adel', 'ibrahim.adel@mail.com', 'pass123', 'LIC1004', 104, 'DEF456', 'Sedan', 'Red', 'MG5', 'Active'),
(5, 'Youssef', 'Hamed', 'youssef.hamed@mail.com', 'pass123', 'LIC1005', 105, 'EFG567', 'SUV', 'Gray', 'Honda Civic', 'Inactive'),
(6, 'Omar', 'Tarek', 'omar.tarek@mail.com', 'pass123', 'LIC1006', 106, 'FGH678', 'Sedan', 'Blue', 'Nissan Sunny', 'Active'),
(7, 'Hana', 'Samy', 'hana.samy@mail.com', 'pass123', 'LIC1007', 107, 'GHI789', 'Hatchback', 'Black', 'Skoda Fabia', 'Busy'),
(8, 'Mostafa', 'Nabil', 'mostafa.nabil@mail.com', 'pass123', 'LIC1008', 108, 'HIJ890', 'Sedan', 'Silver', 'Toyota Yaris', 'Active'),
(9, 'Rami', 'Gamal', 'rami.gamal@mail.com', 'pass123', 'LIC1009', 109, 'IJK901', 'SUV', 'White', 'Ford Escape', 'Inactive'),
(10, 'Laila', 'Hassan', 'laila.hassan@mail.com', 'pass123', 'LIC1010', 110, 'JKL012', 'Sedan', 'Black', 'Renault Logan', 'Active');

INSERT INTO cap_phone VALUES
(1,'01010010010'), (1,'01236789456') ,
(2,'01020020020'),
(3,'01030030030'), (3,'01186598375'),
(4,'01040040040'),
(5,'01050050050'),
(6,'01060060060'),
(7,'01070070070'),(7,'011768900508'),
(8,'01080080080'),
(9,'01090090090'),
(10,'01110011001'),(10,'015672345673');

INSERT INTO Passenger (ID, F_name, L_name, Email, Pass)
VALUES
(1, 'Bothina', 'Elhaw', 'Bothina.Elhaw@mail.com', 'p1'),
(2, 'Toka', 'Hosney', 'Toka.Hosney@mail.com', 'p2'),
(3, 'Shahd', 'Elhewehy', 'Shahd.Elhewehy@mail.com', 'p3'),
(4, 'Haneen', 'Salama', 'Haneen.Salama@mail.com', 'p4'),
(5, 'Mostafa', 'Adel', 'mostafa.adel@mail.com', 'p5'),
(6, 'Hady', 'Samir', 'hady.samir@mail.com', 'p6'),
(7, 'Lina', 'Hossam', 'lina.hossam@mail.com', 'p7'),
(8, 'Karim', 'Walid', 'karim.walid@mail.com', 'p8'),
(9, 'Eman', 'Gaber', 'eman.gaber@mail.com', 'p9'),
(10, 'Noura', 'Fouad', 'noura.fouad@mail.com', 'p10'),
(11, 'Adham', 'Karem', 'adham.karem@mail.com', 'p11'),
(12, 'Reem', 'Saeed', 'reem.saeed@mail.com', 'p12'),
(13, 'Salma', 'Nasser', 'salma.nasser@mail.com', 'p13'),
(14, 'Hassan', 'Maher', 'hassan.maher@mail.com', 'p14'),
(15, 'Farah', 'Hany', 'farah.hany@mail.com', 'p15');

INSERT INTO Ride
(R_ID, R_status, Rating, Cost, C_ID, DropoffLatitude, PickupLatitude, DropoffLongitude, PickupLongitude,
 Dropoff_time, Pickup_time, Passenger_ID, pay_ID, pay_status, pay_time, pay_method)
VALUES
(1,'Completed',4.5,75,1,30.0444,30.0330,31.2357,31.2100,'2025-02-01 14:30','2025-02-01 14:00',1,201,'Paid','2025-02-01 14:35','Cash'),
(2,'Completed',5.0,62,2,30.0561,30.0410,31.2190,31.2000,'2025-02-02 12:10','2025-02-02 11:45',2,202,'Paid','2025-02-02 12:12','Card'),
(3,'Cancelled',NULL,0,3,30.0650,30.0500,31.2450,31.2300,NULL,'2025-02-03 09:00',3,203,'Unpaid',NULL,'None'),
(4,'Completed',4.0,40,4,30.0600,30.0500,31.2200,31.2100,'2025-02-04 18:00','2025-02-04 17:40',4,204,'Paid','2025-02-04 18:02','Cash'),
(5,'Completed',3.8,55,5,30.0700,30.0600,31.2500,31.2250,'2025-02-05 20:30','2025-02-05 20:00',5,205,'Paid','2025-02-05 20:32','Card'),
(6,'Completed',4.2,33,6,30.1000,30.0900,31.2400,31.2150,'2025-02-06 10:10','2025-02-06 09:50',6,206,'Paid','2025-02-06 10:12','Cash'),
(7,'Completed',4.9,48,7,30.0950,30.0850,31.2050,31.1900,'2025-02-07 16:00','2025-02-07 15:40',7,207,'Paid','2025-02-07 16:02','Card'),
(8,'Completed',3.5,29,8,30.1200,30.1100,31.2600,31.2400,'2025-02-08 11:15','2025-02-08 11:00',8,208,'Paid','2025-02-08 11:17','Cash'),
(9,'Completed',4.1,52,9,30.1300,30.1150,31.2650,31.2550,'2025-02-09 13:30','2025-02-09 13:05',9,209,'Paid','2025-02-09 13:32','Card'),
(10,'Cancelled',4.4,70,10,30.1400,30.1250,31.2800,31.2600,'2025-02-10 19:00','2025-02-10 18:35',10,210,'Paid','2025-02-10 19:05','Cash'),

(11,'Completed',4.6,65,1,30.0500,30.0400,31.2300,31.2150,'2025-02-11 15:20','2025-02-11 14:50',11,211,'Paid','2025-02-11 15:25','Card'),
(12,'Completed',4.8,80,1,30.0600,30.0500,31.2400,31.2250,'2025-02-12 17:10','2025-02-12 16:40',12,212,'Paid','2025-02-12 17:15','Cash'),
(13,'Cancelled',3.9,45,4,30.0700,30.0600,31.2500,31.2300,'2025-02-13 12:50','2025-02-13 12:20',13,213,'Paid','2025-02-13 12:55','Card'),
(14,'Completed',4.2,55,4,30.0800,30.0700,31.2600,31.2400,'2025-02-14 14:40','2025-02-14 14:10',14,214,'Paid','2025-02-14 14:45','Cash'),
(15,'Cancelled',4.9,72,8,30.0900,30.0800,31.2700,31.2500,'2025-02-15 18:30','2025-02-15 18:00',15,215,'Paid','2025-02-15 18:35','Card'),

(16,'Completed',4.3,60,3,30.0500,30.0400,31.2300,31.2150,'2025-02-16 10:20','2025-02-16 09:50',1,216,'Paid','2025-02-16 10:25','Cash'),
(17,'Completed',4.7,75,2,30.0600,30.0500,31.2400,31.2250,'2025-02-17 12:10','2025-02-17 11:40',3,217,'Paid','2025-02-17 12:15','Card'),
(18,'Cancelled',3.8,50,3,30.0700,30.0600,31.2500,31.2300,'2025-02-18 09:30','2025-02-18 09:00',3,218,'Paid','2025-02-18 09:35','Cash'),
(19,'Completed',4.5,68,7,30.0800,30.0700,31.2600,31.2400,'2025-02-19 15:10','2025-02-19 14:40',11,219,'Paid','2025-02-19 15:15','Card'),
(20,'Cancelled',4.1,58,9,30.0900,30.0800,31.2700,31.2500,'2025-02-20 11:50','2025-02-20 11:20',13,220,'Paid','2025-02-20 11:55','Cash'),

(21,'Completed',4.6,62,5,30.0500,30.0400,31.2300,31.2150,'2025-02-21 13:30','2025-02-21 13:00',11,221,'Paid','2025-02-21 13:35','Card'),
(22,'Holding',4.8,78,3,30.0600,30.0500,31.2400,31.2250,'2025-02-22 16:10','2025-02-22 15:40',14,222,'Paid','2025-02-22 16:15','Cash'),
(23,'Completed',3.9,49,3,30.0700,30.0600,31.2500,31.2300,'2025-02-23 08:50','2025-02-23 08:20',9,223,'Paid','2025-02-23 08:55','Card'),
(24,'Completed',4.2,57,4,30.0800,30.0700,31.2600,31.2400,'2025-02-24 14:40','2025-02-24 14:10',9,224,'Paid','2025-02-24 14:45','Cash'),
(25,'Cancelled',4.9,70,1,30.0900,30.0800,31.2700,31.2500,'2025-02-25 18:30','2025-02-25 18:00',15,225,'Paid','2025-02-25 18:35','Card'),

(26,'Holding',4.3,65,9,30.0500,30.0400,31.2300,31.2150,'2025-02-26 10:20','2025-02-26 09:50',11,226,'Paid','2025-02-26 10:25','Cash'),
(27,'Completed',4.7,74,6,30.0600,30.0500,31.2400,31.2250,'2025-02-27 12:10','2025-02-27 11:40',13,227,'Paid','2025-02-27 12:15','Card'),
(28,'Completed',3.8,51,4,30.0700,30.0600,31.2500,31.2300,'2025-02-28 09:30','2025-02-28 09:00',1,228,'Paid','2025-02-28 09:35','Cash'),
(29,'Completed',4.5,69,4,30.0800,30.0700,31.2600,31.2400,'2025-02-28 15:10','2025-02-28 14:40',13,229,'Paid','2025-02-28 15:15','Card'),
(30,'Holding',4.1,59,5,30.0900,30.0800,31.2700,31.2500,'2025-02-28 11:50','2025-02-28 11:20',5,230,'Paid','2025-02-28 11:55','Cash');

INSERT INTO passenger_phone VALUES
(1,'01022003344'),
(2,'01055664422'),
(3,'01266554433'),
(4,'01599887755'),
(5,'01050060070'),(5,'01560987642'),
(6,'01090908070'),
(7,'01270080090'),
(8,'01054002211'),(8,'01260788942'),
(9,'01022004455'),
(10,'01233445566'),(10,'01070987642'),
(11,'01011122233'),
(12,'01122233344'),
(13,'01134587987'),(13,'01165587642'),
(14,'01278974567'),
(15,'012345689076');


DECLARE @PassengerID INT = 3;

SELECT TOP 1
    PickupLatitude AS Passenger_Lat,
    PickupLongitude AS Passenger_Long
FROM Ride
WHERE Passenger_ID = @PassengerID
ORDER BY Pickup_time DESC;

SELECT ID, F_name, L_name, v_type
FROM Captain
WHERE Cap_Status = 'Active';


DECLARE @pass_lat DECIMAL(9,6);
DECLARE @pass_long DECIMAL(9,6);

SELECT TOP 1
    @pass_lat = PickupLatitude,
    @pass_long = PickupLongitude
FROM Ride
WHERE Passenger_ID = 3
ORDER BY Pickup_time DESC;


WITH CaptainLastLocation AS (
    SELECT 
        C.ID AS CaptainID,
        C.F_name,
        C.v_type,
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
    v_type,
    Cap_Lat,
    Cap_Long,
    SQRT(
        POWER(Cap_Lat - @pass_lat, 2) +
        POWER(Cap_Long - @pass_long, 2)
    ) AS Distance
FROM CaptainLastLocation
WHERE rn = 1
ORDER BY Distance ASC;



CREATE VIEW NearestCaptains AS
WITH LastLocation AS (
    SELECT 
        C.ID AS CaptainID,
        C.F_name + ' ' + C.L_name AS CaptainName,
        C.v_type,
        C.v_color,
        C.v_model,
        C.Cap_Status,
        R.DropoffLatitude,
        R.DropoffLongitude,
        R.Dropoff_time,
        ROW_NUMBER() OVER (PARTITION BY C.ID ORDER BY R.Dropoff_time DESC) AS rn
    FROM Captain C
    JOIN Ride R ON C.ID = R.C_ID
    WHERE C.Cap_Status = 'Active'
)
SELECT 
    CaptainID,
    CaptainName,
    v_type,
    v_color,
    v_model,
    Cap_Status,
    DropoffLatitude,
    DropoffLongitude
FROM LastLocation
WHERE rn = 1;


SELECT * FROM NearestCaptains;

DECLARE @pass_lat DECIMAL(9,6);
DECLARE @pass_long DECIMAL(9,6);

SELECT TOP 1
    @pass_lat = PickupLatitude,
    @pass_long = PickupLongitude
FROM Ride
WHERE Passenger_ID = 3
ORDER BY Pickup_time DESC;

INSERT INTO Ride (
    R_ID, R_status, C_ID, Passenger_ID,
    PickupLatitude, PickupLongitude,
    DropoffLatitude, DropoffLongitude,
    Pickup_time
) VALUES   
(31, 'Holding', 2, 3, @pass_lat, @pass_long, NULL, NULL, GETDATE());


UPDATE Ride
SET R_status = 'In Progress'
WHERE R_ID = 31;


UPDATE Ride
SET 
    R_status = 'Completed',
    Cost = 55,
    DropoffLatitude = 30.055000,
    DropoffLongitude = 31.230000,
    Dropoff_time = GETDATE(),
    pay_status = 'Paid',
    pay_method = 'Cash'
WHERE R_ID = 31;

UPDATE Ride
SET 
    Rating = 5,
    pay_ID=20,
	pay_time =  GETDATE()
WHERE R_ID = 31;

SELECT *
FROM Ride 
where R_ID=31;



select * from Captain where Cap_Status = 'Active'


select R_ID , R_status , Rating
from Ride where R_status = 'Completed'


select P.ID , P.Email , count(R_ID) as no_of_rides
from Passenger P join Ride R on P.ID = R.Passenger_ID
group by P.ID , P.Email 


select C.ID , C.Email , count(R_ID) as no_of_rides
from Captain C join Ride R on C.ID = R.C_ID
group by  C.ID , C.Email


select Top(1) C.ID , C.Email , count(R_ID) as no_of_rides
from Captain C join Ride R on C.ID = R.C_ID
group by  C.ID , C.Email
order by count(R_ID) desc

select top(1) C.ID , Max(R.Rating) as max_rating
from Captain C join Ride R on C.ID =R.C_ID
group by C.ID
order by max(R.Rating) Desc



select  C.ID , avg(R.Rating) as avg_rating
from Captain C join Ride R on C.ID =R.C_ID
group by C.ID 



DECLARE @PassengerLat DECIMAL(9,6) = 30.0330;
DECLARE @PassengerLng DECIMAL(9,6) = 31.2357;


SELECT TOP 1 
    C.ID AS CaptainID,
    R.DropoffLatitude AS CaptainLat,
    R.DropoffLongitude AS CaptainLng,
    (6371 * ACOS(
        COS(RADIANS(@PassengerLat)) *
        COS(RADIANS(R.DropoffLatitude)) *
        COS(RADIANS(R.DropoffLongitude) - RADIANS(@PassengerLng)) +
        SIN(RADIANS(@PassengerLat)) *
        SIN(RADIANS(R.DropoffLatitude))
    )) AS DistanceKm
FROM Captain C
JOIN Ride R ON C.ID = R.C_ID
WHERE R.R_ID IN (
    SELECT MAX(R2.R_ID)
    FROM Ride R2
    WHERE R2.C_ID = C.ID
)
ORDER BY DistanceKm ASC;


select top(3) with ties C.F_name ,C.L_name , count( R.R_ID) AS totalrides
from Captain C join Ride R on C.ID = R.C_ID
group by C.F_name ,C.L_name 
order by totalrides asc


CREATE FUNCTION dbo.GetRideDurationMinutes
(
    @RideID INT
)
RETURNS INT
AS
BEGIN
    DECLARE @DurationMinutes INT;

    SELECT @DurationMinutes = DATEDIFF(MINUTE, Pickup_time, Dropoff_time)
    FROM Ride
    WHERE R_ID = @RideID;

    RETURN @DurationMinutes;
END;


SELECT R_ID,R_status,Pickup_time,Dropoff_time,dbo.GetRideDurationMinutes(R_ID) AS DurationMinutes
FROM Ride ;

SELECT R.C_ID,sum(dbo.GetRideDurationMinutes(R_ID)) AS DurationMinutes
FROM Ride R join Captain C on R.C_ID=C.ID
group by R.C_ID ;


CREATE PROCEDURE GenerateAllInvoices
AS
BEGIN
   select 
        R.R_ID,
        P.F_name + ' ' + P.L_name AS PassengerName,
        C.F_name + ' ' + C.L_name AS CaptainName,
        R.Cost,
        R.pay_method,
        R.pay_status,
        R.pay_time,
        R.Pickup_time,
        R.Dropoff_time,
        DATEDIFF(MINUTE, R.Pickup_time, R.Dropoff_time) AS DurationMinutes
   from Ride R
    join Passenger P ON R.Passenger_ID = P.ID
   join Captain C ON R.C_ID = C.ID
    order by R.R_ID;
END;

EXEC GenerateAllInvoices;




CREATE PROCEDURE TryCallPassenger
    @PassengerID INT,
    @AttemptedPhone VARCHAR(20),
    @AttemptStatus VARCHAR(20)  
AS
BEGIN
    
    IF @AttemptStatus = 'Success'
    BEGIN
        SELECT 'CallSuccess' AS Result, @AttemptedPhone AS PhoneUsed;
        RETURN;
    END;

    
    IF @AttemptStatus = 'Failed'
    BEGIN
        ;WITH Phones AS (
            SELECT phone_num,
                   ROW_NUMBER() OVER (ORDER BY phone_num) AS RowNum
            FROM passenger_phone
            WHERE ID = @PassengerID
        )
        SELECT TOP 1 phone_num AS AlternatePhone
        FROM Phones
        WHERE phone_num <> @AttemptedPhone
        ORDER BY RowNum;

        RETURN;
    END
END

EXEC TryCallPassenger 5, '01050060070', 'Failed';


CREATE PROCEDURE CheckInactiveCaptains
AS
BEGIN
    SELECT ID, F_name, L_name, Cap_Status,
           CASE 
               WHEN Cap_Status = 'Inactive' THEN 'Cannot receive rides'
               ELSE 'Active'
           END AS ActionNeeded
    FROM Captain;
END;

EXEC CheckInactiveCaptains;

SELECT C_ID, SUM(Cost) AS TotalEarned
FROM Ride
WHERE pay_status = 'Paid'
GROUP BY C_ID
ORDER BY TotalEarned DESC;























