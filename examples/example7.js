const Language = require('../');

LangParser = Language._();

LangParser.setBaseDir(__dirname);

translated =  LangParser.translate('success')

translated.then((text) => {
   console.log(text);
});

testTranslate = async (language, message) => {

   const LangParser = Language._();

   LangParser.setBaseDir(__dirname);

    translated =  await LangParser.translate(message, language)

    let data = {
        message: translated,
        language
    };

    console.log(data)
};


setTimeout(function(){

   testTranslate('ar', 'success')

   testTranslate('ar' , 'something_went_wrong')

   testTranslate('ar' , 'missing_required_validation')

   testTranslate('ar' , 'email_phone_validation')

}, 10)
