
const Language = require('../');

const LangParser = Language._();

LangParser.setBaseDir(__dirname);

testTranslate = async (language, message) => {

   await LangParser.init(language)

   translated =  LangParser.text(message)

   let data = {
      language,
      message: translated,
   };

    console.log(data)
};


data = testTranslate('ar' , 'success')

setTimeout(function(){

   testTranslate('ar' , 'something_went_wrong')

   testTranslate('ar' , 'missing_required_validation')

   testTranslate('ar' , 'email_phone_validation')

}, 10)
