//استدعاء كل الحزم التي سنحتاجها خلال العمل
var express = require('express');
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');

//استحداث التطبيق الخاص بنا من خلال express
var app = express();

//رقم البورت الخاص بالاتصال
var PORT = config.port;

//لكي ننتبع ال requests و response من  خلال ال command line
app.use(morgan('dev'));

//فتح الاتصال بقاعدة البيانات
mongoose.connect(config.database,function(err){
  if(err){
    console.log(err);
    return;
  }
  console.log('Connected to database');
});

//استخدام bodyParser لكي نستطيع اخد الداتا المرسلة لنا
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//نستخدم ال API
var api = require('./api')(express);
app.use('/api',api);

//تشغيل السيرفر على رقم البورت المختار
app.listen(PORT,function(err){
   if(err)console.log(err);
   console.log('connected on PORT '+PORT);
});
