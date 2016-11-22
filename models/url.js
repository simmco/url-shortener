var mongoose = require('mongoose');

var URL = mongoose.model('URL', {
  url: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique:true
  },
  short_url: {
    type: String,
    minlength: 1,
    trim: true,
    unique: true
  }
});

module.exports = {URL};
