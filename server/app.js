const express = require('express');
const fs = require('fs');
const app = express();
const jsonFilePath = './data.json';
const bodyParser = require('body-parser');
//cors problem
const cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Read JSON file
const readDataFromFile = () => {
  // const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  // return JSON.parse(jsonData);
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    })
  })
};

// Write JSON file
const writeDataToFile = (data) => {
  // fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
  return new Promise((resolve, reject) => {
    fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
};

// GET endpoint to fetch data
app.get('/api/data', async (req, res) => {
  const data = await readDataFromFile();
  if (data.length) {
    res.json({data, success: true});
  } else {
    res.status(404).json({message: 'Not found', success: false});
  }
});

// POST endpoint to add data
app.post('/api/data', async (req, res) => {
  const data = await readDataFromFile();
  data.push(req.body);
  await writeDataToFile(data)
  if (data.length) {
    res.json({message: 'Data added successfully.', success: true});
  } else {
    res.status(404).json({message: 'Not found', success: false});
  }
})

// Delete endpoint to delete data
app.delete('/api/data/:id', async (req, res) => {
  const data = await readDataFromFile();
  const newData = data.filter((item) => {
    return +item.id !== +req.params.id
  });
  await writeDataToFile(newData).then(() => {
    res.json({message: 'Data deleted successfully.', success: true})
  })
})

// PUT endpoint to update data
app.put('/api/data/:id', async (req, res) => {
  const data =await readDataFromFile();
  const index = data.findIndex((item) => +item.id === +req.params.id);
  data[index] = req.body;
  await writeDataToFile(data).then(() => {
    res.json({message: 'Data updated successfully.', success: true})
  })
})

app.listen(3005, () => {
  console.log('Server started on port 3005');
});
