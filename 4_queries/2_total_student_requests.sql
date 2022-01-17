SELECT COUNT(assistance_requests.*) AS total_assistances, students.name AS name
FROM students
JOIN assistance_requests ON students.id = student_id
WHERE name = 'Elliot Dickinson'
GROUP BY name;