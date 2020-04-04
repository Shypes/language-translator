
const Language = require('.');

const LangParser = Language();

LangParser.setBaseDir(__dirname);

LangParser.setActiveLang('ar');

LangParser.setLoadFromFile(false);

LangParser.loadLanguage('en', {
   "success": "Success!",
   "email_phone_validation": "Email and phone cannot be empty",
   "something_went_wrong": "Something went wrong!",
   "missing_required_validation": "Missing required fields",
   "missing_truck": "Truck Request Pool has already been set to ${status}", 
   "positioned": "positioned",
   "in-premise": "in-premise",
   "loaded": "loaded",
   "transporting": "transporting",
   "At-destination": "at-destination",
   "offloaded": "offloaded",
   "returningContainer": "returning container",
   "Delivered": "delivered"
   }
)

LangParser.loadLanguage('ar', {
   "success": "نجاح",
   "email_phone_validation": "لا يمكن أن يكون البريد الإلكتروني والهاتف فارغين",
   "something_went_wrong": "هناك خطأ ما",
   "missing_required_validation": "الحقول المطلوبة مفقودة",
   "missing_truck": "تم تعيين تجمع طلبات الشاحنات بالفعل على ${status}",
   "delivered": "تم تعي",
   "message": "تم تعي",
   "data": "تdddم تعي"
   }
)

translated = LangParser.translate('missing_truck', {'status':"delivered"}, 'ar' )

translated.then((text) =>{
   console.log(text);
});
