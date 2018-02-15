var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myCartSchema = new Schema({
  item: String,
  cost: String
});

var Cart = mongoose.model('myCart',myStoreSchema);

module.exports= Cart;
