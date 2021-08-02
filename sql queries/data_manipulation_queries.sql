-- Query to get all projectID's from Projects
SELECT projectID, projectName FROM Projects;

-- Query to add a project based on user input with colon : character being used to 
-- denote the variables 
INSERT INTO  Projects  (projectName, budget, startDate, endDate)
VALUES (:projectName, :budget, :startDate, :endDate);