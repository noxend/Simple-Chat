
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageShema = new Schema(
    {
      data: {type: Object},
      nick: {type: String},
      date: {type: Date}
    },
    {
      versionKey:false,
      collection: 'MessageCollection'
    }
  );        
module.exports = mongoose.model('MessageModel', MessageShema);