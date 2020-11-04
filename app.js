const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ key: 'value' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });



// READ TOUR FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET ALL TOURS

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours: tours } });
});


// URL PRACTICE

app.get('/api/v1/tours/:id/:id2', (req, res) => {
  console.log(req.params);
  res.status(200).send('OK');
});


// POST A NEW TOUR

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
});


// LISTEN TO A PORT
const port = 3000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
