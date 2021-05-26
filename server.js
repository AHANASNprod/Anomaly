const express = require('express'),
       path = require('path');

const app = express();
app.use((req, res, next) => {
       res.header("Access-Control-Allow-Origin","*");
       res.header("Access-Control-Allow-Headers",
                 "Origin,X-Requested-With,Content-Type,Accept,Authorization");
       res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
       next();});
app.listen(process.env.PORT || 8080, () =>
{
});
app.use(express.static(__dirname + '/dist'));
app.get('/*',(req,res) => {
res.sendFile(path.join(__dirname + '/dist/index.html'))});