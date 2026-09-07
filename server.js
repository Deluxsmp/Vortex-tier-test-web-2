require('dotenv').config();
const express = require('express');
const path = require('path');
const { apiHandler } = require('./api/index');

const app = express();
const PORT = Number(process.env.PORT || 3000);
app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended:true}));
app.use('/api', (req,res,next)=>apiHandler(req,res,next));
app.get('/admin', (req,res)=>res.sendFile(path.join(__dirname,'admin.html')));
app.use(express.static(__dirname,{extensions:['html']}));
app.use((req,res)=>res.status(404).send('Not found'));

if(require.main === module){
  app.listen(PORT,()=>console.log(`Vortex Tier V29 running on http://localhost:${PORT}`));
}
module.exports = app;
