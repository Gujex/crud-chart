const express = require('express');
const fs = require('fs');
const app = express();
const jsonFilePath = './data.json';
const bodyParser = require('body-parser');
//cors problem
const cors = require('cors');
app.use(cors());


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
  if(data.length) {
    res.json({data, success: true});
  } else {
    res.status(404).json({ message: 'Not found', success: false });
  }
});

// POST endpoint to add data
app.post('/api/data', (req, res) => {
  const data = readDataFromFile();
  data.push(req.body);
  writeDataToFile(data);
  if(data.length) {
    res.json({ message: 'Data added successfully.', success: true });
  } else {
    res.status(404).json({ message: 'Not found', success: false });
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

// PUT endpoint to update data
app.put('/api/data/:id', (req, res) => {
  const data = readDataFromFile();
  const index = data.findIndex((item) => +item.id === +req.params.id);
  console.log(req.body)
  data[index] = req.body;
  writeDataToFile(data);
  res.json({ message: 'Data updated successfully.', success: true })
})

app.listen(3005, () => {
  console.log('Server started on port 3000');
});
