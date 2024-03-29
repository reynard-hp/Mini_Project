CREATE DATABASE WearHouse;

CREATE TABLE MsUser (
	UserID uniqueidentifier NOT NULL DEFAULT NEWID() PRIMARY KEY,
	UserName VARCHAR(255) NOT NULL,
	UserEmail VARCHAR(255) NOT NULL,
	UserPassword VARCHAR(255) NOT NULL
);

CREATE TABLE MsProduct (
	ProductID INT IDENTITY(1,1) PRIMARY KEY,
	ProductCategory VARCHAR(255) NOT NULL,
	UserID uniqueidentifier,
	FOREIGN KEY (UserID) REFERENCES MsUser(UserID)
);

INSERT INTO MsUser (UserID, UserName, UserEmail, UserPassword)
VALUES ('1F0855AB-7684-411D-9009-FAA5DDC475E8', 'Reynard', 'reynard@gmail.com', 'Rey-1234'),
('56E4B1E2-7F21-4657-9033-6DA3964785B2', 'Dump', 'dump@gmail.com', 'Dump-123');

INSERT INTO MsProduct
VALUES
('Hats', '56E4B1E2-7F21-4657-9033-6DA3964785B2'),
('Clothes', '56E4B1E2-7F21-4657-9033-6DA3964785B2'),
('Shirt', '56E4B1E2-7F21-4657-9033-6DA3964785B2'),
('Sandals', '56E4B1E2-7F21-4657-9033-6DA3964785B2'),
('Watch', '56E4B1E2-7F21-4657-9033-6DA3964785B2'),
('Shoes', '1F0855AB-7684-411D-9009-FAA5DDC475E8'),
('Bracelet', '1F0855AB-7684-411D-9009-FAA5DDC475E8')

SELECT * FROM MsUser

SELECT * FROM MsProduct;

/* DROP TABLE MsProduct
DROP TABLE MsUser */

