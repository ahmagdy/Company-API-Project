var mongoose = require('mongoose');
//ال model ينشى من خلال تعريف ال schema اولاً
var Schema = mongoose.Schema;

//انشاء الschema او الشكل الخاص ببيانات الشركة
var companySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  Phone: {
    type: Number,
    unique: true,
    required: true
  }
});
//تصدير البيانات لاستعمالها
module.exports = mongoose.model('Company',companySchema);
