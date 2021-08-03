DROP TABLE IF EXISTS `Projects`;
CREATE TABLE `Projects`(
    `projectID` int(11) NOT NULL AUTO_INCREMENT, 
    `projectName` varchar(255) NOT NULL,
    `budget` decimal(20,2) NOT NULL,
    `startDate` date NOT NULL,
    `endDate` date NOT NULL,
    PRIMARY KEY (`projectID`)
)ENGINE=InnoDB;

INSERT INTO `Projects` VALUES
    (1, 'Mercury', 500000000.00, '2021-07-31', '2025-12-31'),
    (2, 'Gemini', 1000000000.00, '2026-01-01', '2027-12-31'),
    (3, 'Apollo', 2000000000.00, '2028-01-01', '2029-12-31'),
    (4, 'Skylab', 5000000000.00, '2029-01-01', '2030-12-31');

DROP TABLE IF EXISTS `DailyLog`;
CREATE TABLE `DailyLog`(
    `logID` int(11) NOT NULL AUTO_INCREMENT, 
    `date` date NOT NULL,
    `scope` varchar(255) NOT NULL,
    `production` decimal(10,2) NOT NULL,
    `units` varchar(255) NOT NULL,
    `spend` decimal(10,2) NOT NULL,
    PRIMARY KEY (`logID`)
)ENGINE=InnoDB;

INSERT INTO `DailyLog` VALUES
    (1, '2021-07-01', 'Route A', 100.00, 'line km', 55000.00),
    (2, '2021-07-02', 'Route A', 50.00, 'line km', 27500.00),
    (3, '2021-07-03', 'Route A', 200.00, 'line km', 110000.00),
    (4, '2021-07-04', 'Route A', 75.50, 'line km', 40500.50);