var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.use( express.static(__dirname + "/../public"))
app.use('/bower', express.static(__dirname + "/../bower_components"));

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
