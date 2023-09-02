const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

// Store query as string
const queryString = `SELECT students.id AS student_id, students.name AS student_name, cohorts.name AS cohort 
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;`;

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit]; // Store all potentially malicious values in an array.
pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));