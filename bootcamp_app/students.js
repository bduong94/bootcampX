const { Pool } = require("pg");
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const queryString = `SELECT students.id AS student_id, students.name AS student_name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2`;

const values = [`%${cohortName}%`, limit];

//Database settings
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

//Connect to database
pool.connect();

// Queries for database
// pool
//   .query(
//     `
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `
//   )
//   .then((res) => {
//     console.log(res["rows"]);
//   })
//   .catch((err) => console.error("query error", err.stack));

// pool
//   .query(
//     `SELECT students.id AS id, students.name AS name, cohorts.name AS cohort_name
//     FROM students
//     JOIN cohorts ON cohorts.id = cohort_id
//     LIMIT 5;`
//   )
//   .then((res) => {
//     res.rows.forEach((user) => {
//       console.log(
//         `${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`
//       );
//     });
//   });

pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`
      );
    });
  })
  .catch((err) => console.log("Query Error", err.stack));
