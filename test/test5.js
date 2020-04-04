
const Language = require('../');

const LangParser = Language();

LangParser.setBaseDir(__dirname);

testTranslate = async (language, message) => {

    translated =  await LangParser.translate(message, {}, language)

    console.log(data)
};


testTranslate = async (res, content, message) => {
    let responseData = {"message" : "", "param" : ""};

    if(typeof message == 'string'){
        responseData['message'] = message;
        message = {};
    }
    responseData = {...responseData, ...message};
    LangParser.setActiveLang(res.language);
    let translated = await LangParser.translate(responseData['message'], responseData['param']);

    lang_key = !res.lang_key ? false : true;

    response_key = {
        'data': lang_key ? LangParser.gettext('data') : 'data',
        'message': lang_key ? LangParser.gettext('message') : 'message',
        'success': lang_key ? LangParser.gettext('success') : 'success'
    }

    let data = {}
    data[response_key['success']] =  true;
    data[response_key['message']] =  translated;
    data[response_key['data']] =  content;

    console.log(data);
};

res = {
    'language' : 'ar',
    'lang_key' : true
}


data = testTranslate(res, {}, 'success')

setTimeout(function(){

    testTranslate(res, {}, 'something_went_wrong')

    testTranslate(res, {}, 'missing_required_validation')

    testTranslate(res, {}, 'email_phone_validation')

}, 1000)


