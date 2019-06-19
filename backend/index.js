const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api', (req, res) => {
    console.log(req.body);
    const data = req.body;
    res.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});