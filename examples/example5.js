
const Language = require('../');

Language._({
    default_lang : "en",
    __basedir : __dirname
})
 
 Language.load('ar', {
    "data": "البيانات",
    "message": "رسالة",
    }
 )

testTranslate = async (res, content, message) => {
    let responseData = {"message" : "", "param" : ""};

    if(typeof message == 'string'){
        responseData['message'] = message;
        message = {};
    }
    responseData = {...responseData, ...message};

    let translated = await Language.get(responseData['message'], res.language, responseData['param']);

    lang_key = !res.lang_key ? false : true;

    response_key = {
        'data': lang_key ? Language.text('data') : 'data',
        'message': lang_key ? Language.text('message') : 'message',
        'success': lang_key ? Language.text('success') : 'success'
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

testTranslate(res, {}, 'success')

testTranslate(res, {}, 'something_went_wrong')

testTranslate(res, {}, 'missing_required_validation')

testTranslate(res, {}, 'email_phone_validation')
