var Company = require('./company');

//لتصدير الدالة التي ستحتوي على محتويات ال API كي نستيطع استخدامها فيما بعد
module.exports = function(express){
  /*انشاء ال router الخاص بنا
    الذي سيحتوي على المسارات الخاصة بالapi */
  var api = express.Router();

//مسار
  api.route('/company')
      .get(function(req,res){ // في حالة get سيرجع البيانات فقط
        Company.find({},function(err,data){
          if(err){
            res.sendStatus(400);
            return;
          }
          res.json(data);
        });
      }).post(function(req,res){ //في حالة post سيحفظ بيانات مرسلة من قبل المستخدم
          var company = new Company({
            name: req.body.name,
            description : req.body.description,
            Phone: req.body.Phone
          });
          company.save(function(err){ //لحفظ البيانات
            if(err){
              res.sendStatus(406);
              return;
            }
            res.status(200).json({message: 'company has been created'});
          });
      });
//المسار الثاني للحذف والتحديث
      api.route('/company/:name')
            .delete(function(req,res){ // الحذف
              Company.findOneAndRemove({name: req.params.name},function(err){ // البحث والحذف في آنٍ واحد
                if(err){
                  res.status(404).json({message: "user not found"});
                  return;
                }
                res.status(200).json({message:"Comapny removed"});
              });
            }).put(function(req,res){ // التحديث
              Company.findOneAndUpdate({name: req.params.name}, //البحث والتحديث بالبيانات الجديدة المرسلة
                {$set:{name: req.body.name,description:req.body.description,Phone: req.body.Phone}},
                function(err){
                  if(err){
                    res.status(400).json({message:err});
                    return;
                  }
                  res.status(200).json({message: "Updated"});
                });
            });
      //ارجاع ال ROUTER لاستخدامه       
      return api;
};
