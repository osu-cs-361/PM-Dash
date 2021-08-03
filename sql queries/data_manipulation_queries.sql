-- Query to get all columns from Projects
SELECT projectID, projectName, budget, startDate, endDate FROM Projects;
-- Query to get all columns from a select Project
SELECT projectID, projectName, budget, startDate, endDate FROM Projects WHERE projectID = ?;

-- Query to add a project based on user input with colon : character being used to 
-- denote the variables 
INSERT INTO Projects (projectName, budget, startDate, endDate) VALUES (?,?,?,?);

-- Query to delete a commodity
DELETE FROM Projects WHERE projectID = ?;

-- Query to get all columns from DailyLog
SELECT logID, date, scope, production, units, spend FROM DailyLog;