
const Language = require('../');

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
   "deliver_code":"Hello ${name}, here is your otp code ${code}"
   }
)

LangParser.loadLanguage('ar', {
   "success": "نجاح",
   "email_phone_validation": "لا يمكن أن يكون البريد الإلكتروني والهاتف فارغين",
   "something_went_wrong": "هناك خطأ ما!",
   "missing_required_validation": "الحقول المطلوبة مفقودة",
   "missing_truck": "تم تعيين تجمع طلبات الشاحنات بالفعل على ${status}",
   "deliver_code":"مرحبًا ${name} ، إليك رمز otp ${code}"
   }
)

translated = LangParser.translate('deliver_code', {'name':"John", 'code': 343923}, 'ar' )

translated.then((text) =>{
   console.log(text);
});

translated = LangParser.translate('deliver_code', {'name':"John", 'code': 343923}, 'en' )

translated.then((text) =>{
   console.log(text);
});
