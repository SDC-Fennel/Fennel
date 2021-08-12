const csv = require('csv-parser');
const fs = require('fs');

const results = [];

fs.createReadStream('../SDC-CSV-DATA/reviews.csv')
  .pipe(csv())
  .on('data', (data) => {
    data.date = new Date(Number(data.date));
    results.push(data);
  })
  .on('end', () => {
    console.log(results);
  });