var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myStoreSchema = new Schema({
  item: String,
  cost: String,
  quantity:String
});

var Store = mongoose.model('myStore',myStoreSchema);

module.exports= Store;
