require('dotenv').config();
const express = require('express');
const path = require('path');
const { apiHandler } = require('./api/index');

const app = express();
const port = Number(process.env.PORT || 3000);
app.use(express.json({ limit: '1mb' }));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.use('/api', apiHandler);
app.use(express.static(__dirname, { extensions: ['html'] }));
app.use((req, res) => res.status(404).send('Not found'));

if (require.main === module) app.listen(port, () => console.log(`Vortex Tier running on http://localhost:${port}`));
module.exports = app;
