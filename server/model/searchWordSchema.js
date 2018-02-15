var mongoose=require("mongoose");
var Schema = mongoose.Schema;
var searchWordSchema = new Schema({
  word: String,
});


module.exports = mongoose.model('searchWord',searchWordSchema);
