const express = require('express');
const bodyParser = require('body-parser');
const validUrl = require('valid-url');


var {mongoose} = require('./db/mongoose');
var {URL} = require('./models/url')

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/:num', (req, res) => {
  var url = req.headers.host + req.url;
  console.log(url);
  URL.findOne({short_url: url}).then((data) => {
      if(!data) {
        return res.status(400).send({error: "Bad Request"});
      }
      res.redirect(data.url);
  });
});

app.get('/new/*', (req, res) => {
  var url = req.url.slice(5);
  console.log(url);
  if(!validUrl.isUri(url)) {
    return res.send({error: "Wrong url format, make sure you have a valid protocol and real site."})
  }
  console.log(url);
  URL.findOne({url: url}, {_id: 0, __v:0}).then((data) => {
    console.log(data);
    var output;
    if(!data) {
      var ranNum = Math.round((Math.random()*10000))-1;
      var newUrl = new URL({
        url: url,
        short_url: req.headers.host + "/" + ranNum
      });
      console.log(newUrl);
      newUrl.save().then((doc) => {
        var output = {
          url: doc.url,
          short_url: doc.short_url
        }
        res.send(output);
      }, (e) => {
        res.status(400).send(e);
          });
        }
    else res.send(data);
    });
});




app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
