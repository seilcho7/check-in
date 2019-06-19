const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, name: `Seil`},
        {id: 2, name: 'Hong'}
    ];
    res.json(customers);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});