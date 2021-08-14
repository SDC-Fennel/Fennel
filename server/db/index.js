const { Pool } = require('pg');
const { dbCreds } = require('../../config');

const pool = new Pool(dbCreds);

module.exports = pool;

// const updateHelpful = (reviewId) => {
//   const query = {
//     text: 'UPDATE reviews SET helpful = helpful + 1 WHERE id = $1',
//     values: [reviewId],
//   };

//   // return pool.query(query);
// };

// const resetIDCounter = (table) => {
//   const idSeq = `${table}_id_seq`;
//   const query = {
//     text: 'SELECT setval($1 ,COALESCE((SELECT MAX(id)+1 FROM $2), 1), false)',
//     values: [idSeq, table],
//   };

//   // return pool.query(query);
// };

// module.exports = {
//   addReview,
//   updateHelpful,
//   resetIDCounter,
// };
