var express = require('express');
var app = express();

app.use( express.static(__dirname + "/../public"))
// app.use('/node_modules', express.static(__dirname + "/../node_modules"));

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});
