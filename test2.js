
const {languagetranslator} = require('.');

const LangParser = languagetranslator();

LangParser.setBaseDir(__dirname);

testTranslate = async (language, message) => {

    translated =  await LangParser.translate(message, {}, language)

    let data = {
        message: translated,
        language
    };

    console.log(data)
};


data = testTranslate('ar', 'success')

setTimeout(function(){

    testTranslate('ar' , 'something_went_wrong')

    testTranslate('ar' , 'missing_required_validation')

    testTranslate('ar' , 'email_phone_validation')

}, 1000)


