const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 3000;


// Serve static files (like the HTML)
app.use(express.static(path.join(__dirname)));


// API endpoint to get data
app.get('/data', (req, res) => {
   fs.readFile('cleaned_most_runs.json', 'utf8', (err, data) => {
       if (err) {
           res.status(500).send('Error reading data file');
           return;
       }
       res.json(JSON.parse(data));
   });
});


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});




