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