DROP TABLE IF EXISTS `Projects`;
CREATE TABLE `Projects`(
    `projectID` int(11) NOT NULL AUTO_INCREMENT, 
    `projectName` varchar(255) NOT NULL,
    `budget` decimal(20,2) NOT NULL,
    `startDate` date NOT NULL,
    `endDate` date NOT NULL,
    `duration` int(11) NOT NULL,
    PRIMARY KEY (`projectID`)
)ENGINE=InnoDB;

INSERT INTO `Projects` VALUES
    (1, 'Mercury', 500000000.00, '2021-07-31', '2025-12-31', 1614),
    (2, 'Gemini', 1000000000.00, '2026-01-01', '2027-12-31', 729),
    (3, 'Apollo', 2000000000.00, '2028-01-01', '2029-12-31', 730),
    (4, 'Skylab', 5000000000.00, '2029-01-01', '2030-12-31', 729);

DROP TABLE IF EXISTS `MercuryDailyLog`;
CREATE TABLE `MercuryDailyLog`(
    `logID` int(11) NOT NULL AUTO_INCREMENT, 
    `date` date NOT NULL,
    `plannedProgress` decimal(5,2) NOT NULL,
    `actualProgress` decimal(5,2) NOT NULL,
    `plannedSpend` decimal(20,2) NOT NULL,
    `actualSpend` decimal(20,2) NOT NULL,
    PRIMARY KEY (`logID`)
)ENGINE=InnoDB;

INSERT INTO `MercuryDailyLog` VALUES
    (1, '2021-07-01', 5.00, 3.00, 10000000.00, 7000000.00),
    (2, '2021-07-02', 3.00, 5.00, 7000000.00, 10000000.00),
    (3, '2021-07-03', 4.00, 4.00, 9000000.00, 10000000.00),
    (4, '2021-07-04', 6.50, 7.50, 20000000.00, 30000000.00);

DROP TABLE IF EXISTS `GeminiDailyLog`;
CREATE TABLE `GeminiDailyLog`(
    `logID` int(11) NOT NULL AUTO_INCREMENT, 
    `date` date NOT NULL,
    `plannedProgress` decimal(5,2) NOT NULL,
    `actualProgress` decimal(5,2) NOT NULL,
    `plannedSpend` decimal(20,2) NOT NULL,
    `actualSpend` decimal(20,2) NOT NULL,
    PRIMARY KEY (`logID`)
)ENGINE=InnoDB;

INSERT INTO `GeminiDailyLog` VALUES
    (1, '2021-07-01', 5.00, 3.00, 10000000.00, 7000000.00),
    (2, '2021-07-02', 3.00, 5.00, 7000000.00, 10000000.00),
    (3, '2021-07-03', 4.00, 4.00, 9000000.00, 10000000.00),
    (4, '2021-07-04', 6.50, 7.50, 20000000.00, 30000000.00);

DROP TABLE IF EXISTS `ApolloDailyLog`;
CREATE TABLE `ApolloDailyLog`(
    `logID` int(11) NOT NULL AUTO_INCREMENT, 
    `date` date NOT NULL,
    `plannedProgress` decimal(5,2) NOT NULL,
    `actualProgress` decimal(5,2) NOT NULL,
    `plannedSpend` decimal(20,2) NOT NULL,
    `actualSpend` decimal(20,2) NOT NULL,
    PRIMARY KEY (`logID`)
)ENGINE=InnoDB;

INSERT INTO `ApolloDailyLog` VALUES
    (1, '2021-07-01', 5.00, 3.00, 10000000.00, 7000000.00),
    (2, '2021-07-02', 3.00, 5.00, 7000000.00, 10000000.00),
    (3, '2021-07-03', 4.00, 4.00, 9000000.00, 10000000.00),
    (4, '2021-07-04', 6.50, 7.50, 20000000.00, 30000000.00);

DROP TABLE IF EXISTS `SkylabDailyLog`;
CREATE TABLE `SkylabDailyLog`(
    `logID` int(11) NOT NULL AUTO_INCREMENT, 
    `date` date NOT NULL,
    `plannedProgress` decimal(5,2) NOT NULL,
    `actualProgress` decimal(5,2) NOT NULL,
    `plannedSpend` decimal(20,2) NOT NULL,
    `actualSpend` decimal(20,2) NOT NULL,
    PRIMARY KEY (`logID`)
)ENGINE=InnoDB;

INSERT INTO `SkylabDailyLog` VALUES
    (1, '2021-07-01', 5.00, 3.00, 10000000.00, 7000000.00),
    (2, '2021-07-02', 3.00, 5.00, 7000000.00, 10000000.00),
    (3, '2021-07-03', 4.00, 4.00, 9000000.00, 10000000.00),
    (4, '2021-07-04', 6.50, 7.50, 20000000.00, 30000000.00);

DROP TABLE IF EXISTS `IssueLog`;
CREATE TABLE `IssueLog`(
    `issueID` int(11) NOT NULL AUTO_INCREMENT, 
    `dateLogged` date NOT NULL,
    `email` varchar(255) NOT NULL,
    `description` varchar(10000) NOT NULL,
    `status` varchar(255) NOT NULL,
    PRIMARY KEY (`issueID`)
)ENGINE=InnoDB;

INSERT INTO `IssueLog` VALUES 
(1, "2021-08-12", 'example@example.com', 'Help!', 'Closed');