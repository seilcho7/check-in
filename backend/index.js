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

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    })
})

app.post('/api', (req, res) => {
    console.log(req.body);
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    if (data.location !== {} && data.picture) {
        database.insert(data);
    }
    res.json({
        status: 'success',
        mood: data.mood,
        timestamp: timestamp,
        latitude: data.location.lat,
        longitude: data.location.lon,
        picture: data.picture
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});