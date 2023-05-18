const express = require('express');
const fs = require('fs');
const app = express();
const jsonFilePath = './data.json';
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Read JSON file
const readDataFromFile = () => {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  return JSON.parse(jsonData);
};

// Write JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// GET endpoint to fetch data
app.get('/api/data', (req, res) => {
  const data = readDataFromFile();
  res.json(data);
});

// POST endpoint to add data
app.post('/api/data', (req, res) => {
  const data = readDataFromFile();
  data.push(req.body);
  writeDataToFile(data);
  if(data.length) {
    res.json({ message: 'Data added successfully.' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
})

// Delete endpoint to delete data
app.delete('/api/data/:id', (req, res) => {
  const data = readDataFromFile();
  const newData = data.filter((item) => {
    return +item.id !== +req.params.id
  });
  writeDataToFile(newData);
  if(data.length === newData.length) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.json({ message: 'Data deleted successfully.' });
  }
})

app.listen(3005, () => {
  console.log('Server started on port 3000');
});
