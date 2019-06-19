const express = require('express');
const app = express();
const port = 3001;

// cors error fix
const cors = require('cors');

// Setup nedb
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api', (req, res) => {
    console.log(req.body);
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    res.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});